const express = require('express');
const nodemailer = require("nodemailer");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// DB stuff first

const dbPath = path.join(__dirname, 'accounts.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (email TEXT UNIQUE, password TEXT)");
});
app.use(bodyParser.json()); // middleware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/storeData', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Insert data into the database
    db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], function(err) {
        if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
                // Ignore duplicate entries
                console.log("Email already exists in the database");
                return res.sendStatus(409); // Conflict status code
            } else {
                console.error("Error inserting data:", err);
                return res.status(500).send("Failed to store data in the database");
            }
        }
        console.log("Data stored in the database");
        res.sendStatus(200);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

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

app.get('/Contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
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

    try {
        // Perform database check
        const emailExists = await checkEmailExists(recipientEmail);
        
        if (!emailExists) {
            // Insert email into the database
            await storeEmailInDatabase(recipientEmail);

            // Send email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: recipientEmail,
                subject: 'ACCOUNT MADE SUCCESSFULLY',
                text: 'ACCOUNT MADE SUCCESSFULLY',
            };
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');

            res.redirect('/');
        } else {
            console.log('Email already exists in the database. Skipping insertion.');
            res.redirect('/');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

// Function to check if email exists in the database
function checkEmailExists(email) {
    return new Promise((resolve, reject) => {
        db.get("SELECT email FROM users WHERE email = ?", [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row !== undefined);
            }
        });
    });
}

// Function to store email in the database
function storeEmailInDatabase(email) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO users (email) VALUES (?)", [email], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});