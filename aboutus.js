document.addEventListener("DOMContentLoaded", function() {
    var aboutUsLink = document.getElementById("aboutUsLink");
    var aboutUsDropdown = document.querySelector(".dropdown-content");

    aboutUsLink.addEventListener("click", function(event) {
        // Check if the clicked link is the "About Us" link
        if (event.target === aboutUsLink) {
            event.preventDefault(); // Prevent the default link behavior only for the "About Us" link
            toggleDropdown(); // Toggle the dropdown
        }
    });

    // Function to toggle the dropdown content visibility
    function toggleDropdown() {
        aboutUsDropdown.style.display = aboutUsDropdown.style.display === "none" ? "block" : "none";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.getElementById("sendButton");

    sendButton.addEventListener("click", function() {
        const recipientEmailInput = document.getElementById("recipientEmail");
        const passwordInput = document.getElementById("password");

        const recipientEmail = recipientEmailInput.value;
        const password = passwordInput.value;

        // Call a function to send email using an AJAX request
        sendEmail(recipientEmail, password);
    });
});

// Function to send email using AJAX
async function sendEmail(recipientEmail, password) {
    if (!recipientEmail) {
        console.error('Recipient email is not defined.');
        return;
    }

    // Make an AJAX request to the server to check email uniqueness and send the email
    axios.post('/checkEmail', { recipientEmail })
        .then(response => {
            if (response.data.unique) {
                // Email is unique, proceed to send email
                axios.post('/sendEmail', { recipientEmail, password }) // Send both recipientEmail and password
                    .then(response => {
                        if (response.status === 200) {
                            console.log('Email sent successfully');
                            // Clear input field after successful sending
                            document.getElementById('recipientEmail').value = '';
                            document.getElementById('password').value = ''; // Clear password field
                        } else {
                            console.error('Failed to send email');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                // Email already exists in the database, do not send email
                console.log('Email already exists. Account creation skipped.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Store email and password in the database regardless of email uniqueness
    storeInDatabase(recipientEmail, password);
}

function storeInDatabase(email, password) {
    // Make an AJAX request to the server to store the data
    axios.post('/storeData', { email, password })
        .then(response => {
            if (response.status === 200) {
                console.log('Data stored successfully');
            } else {
                console.error('Failed to store data', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}