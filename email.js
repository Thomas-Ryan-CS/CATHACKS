const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'goldyfly22@gmail.com',   // sender
      pass: 'imsszdyrflgjnmou', // app password
    },
  });

  const mailOptions = {
        from: {
            name: 'Thomas',
            address: process.env.USER
        }, // sender address
        to: "tryan3126@gmail.com", // list of receivers
        subject: "ACCOUNT MADE SUCCESSFULLY", // Subject line
        text: "ACCOUNT MADE SUCCESSFULLLY", // plain text bodynode 
        html: "<b>ACCOUNT MADE SUCCESSFULLLY</b>", // html body
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email Sent Successfully");
    } catch (error) {
        console.error(error);
    }
  }

  sendMail(transporter, mailOptions);