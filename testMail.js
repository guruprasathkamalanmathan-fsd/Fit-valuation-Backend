const nodemailer = require("nodemailer");
require('dotenv').config();

(async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.smtphost,
    port: parseInt(process.env.smtpport || "587"),
    secure: false,
    auth: {
      user: process.env.smtpuser,
      pass: process.env.smtppass,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.smtpuser,
      to: "guruprasath.kamalanmathan@tvs.in",
      subject: "Test Email",
      html: "<p>Hello World</p>",
    });
    console.log("Test email sent successfully!");
  } catch (err) {
    console.error("SMTP Error:", err.message);
  }
})();
