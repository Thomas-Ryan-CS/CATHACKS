// Import nodemailer and dotenv
const nodemailer = require("nodemailer");
require("dotenv").config();

// Function to send email
async function sendEmail(recipientEmail) {
    try {
        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: 'goldyfly22@gmail.com', // Sender's Gmail address
                pass: 'imsszdyrflgjnmou' // App Password generated from Gmail
            },
        });

        // Set up email data
        let mailOptions = {
            from: {
                name: 'Thomas',
                address: 'goldyfly22@gmail.com' // Sender's email address
            },
            to: recipientEmail, // Receiver's email address (input by the user)
            subject: "ACCOUNT MADE SUCCESSFULLY", // Subject line
            text: "ACCOUNT MADE SUCCESSFULLLY", // plain text body
            html: "<b>ACCOUNT MADE SUCCESSFULLLY</b>", // html body
        };

        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail; // Export the function for use in other files
