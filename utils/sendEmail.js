const nodemailer = require("nodemailer");
const keys = require("../config/keys");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: keys.SMTP_HOST,
    port: keys.SMTP_PORT,
    auth: {
      user: keys.SMTP_EMAIL,
      pass: keys.SMTP_PASSWORD
    }
  });

  const message = {
    from: `${keys.FROM_NAME} <${keys.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
