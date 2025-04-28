const nodemailer = require("nodemailer");

const sendTicketEmail = async ({ name, email, movie, theater, time }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Movie Tickets" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎫 Your Movie Ticket Confirmation",
    text: `Hi ${name},\n\nYour ticket for "${movie}" at ${theater} for ${time} is confirmed.\n\nEnjoy your movie! 🍿`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendTicketEmail;
