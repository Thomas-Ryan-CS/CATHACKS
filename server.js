const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Root route to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve page2.html
app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname,  'page2.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
