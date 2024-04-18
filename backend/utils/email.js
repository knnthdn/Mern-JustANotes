import nodemailer from "nodemailer";

const sendEmail = async (option) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: "JustANotes",
      address: process.env.EMAIL_USERNAME,
    },
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transport.sendMail(mailOptions);
};

export default sendEmail;
