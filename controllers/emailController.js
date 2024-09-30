// controllers/emailController.js
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

exports.sendEmail = async (req, res) => {
  const { email, subject, message, name } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Read the HTML template
  const templatePath = path.join(
    __dirname,
    "../templates/websiteContactEmailTemplate.html"
  );
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");

  // Replace placeholders with actual data
  htmlTemplate = htmlTemplate.replace("{{name}}", name);
  htmlTemplate = htmlTemplate.replace("{{email}}", email);
  htmlTemplate = htmlTemplate.replace("{{message}}", message);

  // Setup email data
  let mailOptions = {
    from: process.env.SMTP_FROM, // sender address
    to: process.env.SMTP_TO, // list of receivers
    subject: subject, // Subject line
    html: htmlTemplate, // HTML body
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
};
