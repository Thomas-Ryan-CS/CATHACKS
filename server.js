// general express requirements
const express = require('express');
const app = express();
const path = require('path');

// this is to connect to public folder which will handle all the files for this
app.use(express.static(path.join(__dirname, 'public')));

// root to main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});