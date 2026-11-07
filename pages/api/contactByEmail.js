import nodemailer from "nodemailer";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const RECAPTCHA_THRESHOLD = 0.5;
const RECAPTCHA_ACTION = "submit";

const EMAIL_PATTERN = /^[^\s@<>,;:"()[\]\\]+@[^\s@<>,;:"()[\]\\]+\.[^\s@<>,;:"()[\]\\]+$/;
const LINE_BREAK_PATTERN = /[\r\n]/;

const SINGLE_LINE_FIELD_LIMITS = {
  name: 100,
  surname: 100,
  email: 254,
  phoneNumber: 30,
};
const MESSAGE_LIMIT = 5000;

const HTML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);

const isValidContactRequest = (body) => {
  const fieldsAreValid = Object.entries(SINGLE_LINE_FIELD_LIMITS).every(
    ([field, limit]) => {
      const value = body?.[field];
      return (
        typeof value === "string" &&
        value.trim().length > 0 &&
        value.length <= limit &&
        !LINE_BREAK_PATTERN.test(value)
      );
    }
  );

  return (
    fieldsAreValid &&
    EMAIL_PATTERN.test(body.email) &&
    typeof body.message === "string" &&
    body.message.trim().length > 0 &&
    body.message.length <= MESSAGE_LIMIT &&
    typeof body.token === "string" &&
    body.token.length > 0
  );
};

const ContactByEmail = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isValidContactRequest(req.body)) {
    return res.status(400).json({ error: "Invalid form data" });
  }

  const { name, surname, email, phoneNumber, message, token } = req.body;

  try {
    const recaptchaRes = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRETKEY,
        response: token,
      }),
    });

    const recaptchaJson = await recaptchaRes.json();

    if (
      recaptchaRes.status === 200 &&
      recaptchaJson.success &&
      recaptchaJson.action === RECAPTCHA_ACTION &&
      recaptchaJson.score > RECAPTCHA_THRESHOLD
    ) {
      const safeName = escapeHtml(name);
      const safeSurname = escapeHtml(surname);
      const safeEmail = escapeHtml(email);
      const safePhoneNumber = escapeHtml(phoneNumber);
      const safeMessage = escapeHtml(message);

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
        from: process.env.SMTP_USER,
        replyTo: email,
        to: "platyna74@wp.pl",
        subject: `Wiadomość wysłana ze strony DERATEX od: ${name} ${surname}`,
        html: `<p style="color:red; font-size:20px">Pamiętaj aby odpisać na ponizszy e-mail używając emaila, który znajduje się poniżej, a nie używając przycisku "odpowiedz", który znajduje się powyżej!!!</p><br>
        <p style="color:black; font-weight:bolder; font-size:20px"><strong>E-mail: </strong> ${safeEmail}<strong>, numer telefonu: </strong> ${safePhoneNumber}</p><br>
        <p style="font-size:20px"><strong>Wiadomość od ${safeName} ${safeSurname}: </strong> ${safeMessage}</p><br>
      `,
      });
      return res.status(200).json({ error: "" });
    } else {
      return res.status(422).json({ error: "Too many attempts to send message" });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Message could not be sent" });
  }
};

export default ContactByEmail;
