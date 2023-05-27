import nodemailer from "nodemailer";

const ContactByEmail = async (req, res) => {
  const SECRET_KEY = process.env.RECAPTCHA_SECRETKEY;
  const RECAPTCHA_THRESHOLD = 0.5;
  const { name, surname, email, phoneNumber, message, token } = req.body;

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`;

  try {
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });

    const recaptchaJson = await recaptchaRes.json();

    if (
      recaptchaRes.status === 200 &&
      recaptchaJson.success &&
      recaptchaJson.score > RECAPTCHA_THRESHOLD
    ) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: email,
        to: "platyna74@wp.pl",
        subject: `Wiadomość wysłana ze strony DERATEX od: ${name} ${surname}`,
        html: `<p style="color:red; font-size:20px">Pamiętaj aby odpisać na ponizszy e-mail używając emaila, który znajduje się poniżej, a nie używając przycisku "odpowiedz", który znajduje się powyżej!!!</p><br>
        <p style="color:black; font-weight:bolder; font-size:20px"><strong>E-mail: </strong> ${email}<strong>, numer telefonu: </strong> ${phoneNumber}</p><br>
        <p style="font-size:20px"><strong>Wiadomość od ${name} ${surname}: </strong> ${message}</p><br>
      `,
      });
      return res.status(200).json({ error: "" });
    } else {
      return res.status(422).json({ error: "Too many attempts to send message" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

export default ContactByEmail;