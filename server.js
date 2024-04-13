const express = require('express');
const nodemailer = require("nodemailer");
const path = require('path');

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'page2.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/mission', (req, res) => {
    res.sendFile(path.join(__dirname, 'mission.html'));
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587, // or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'goldyfly22@gmail.com',
        pass: 'imss zdyr flgj nmou',
    },
});

app.post('/sendEmail', async (req, res) => {
    const { recipientEmail } = req.body;

    const mailOptions = {
        from: 'goldyfly22@gmail.com',
        to: recipientEmail,
        subject: 'ACCOUNT MADE SUCCESSFULLY',
        text: 'ACCOUNT MADE SUCCESSFULLY',
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.redirect('/');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});