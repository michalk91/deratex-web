import nodemailer from "nodemailer";

export default async (req, res) => {
  const { name,surname , email,phoneNumber, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "platyna74@wp.pl",
      subject: `Wiadomość wysłana ze strony DERATEX od: ${name} ${surname}`,
      html: `<p style="color:red; font-size:20px">Pamiętaj aby odpisać na ponizszy e-mail używając emaila, który znajduje się poniżej, a nie używając przycisku "odpowiedz", który znajduje się powyżej!!!</p><br>
        <p style="color:black; font-weight:bolder; font-size:20px"><strong>E-mail: </strong> ${email}<strong>, numer telefonu: </strong> ${phoneNumber}</p><br>
        <p style="font-size:20px"><strong>Wiadomość od ${name} ${surname}: </strong> ${message}</p><br>
      `,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
  return res.status(200).json({ error: "" });
};
