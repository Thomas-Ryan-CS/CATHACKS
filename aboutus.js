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
    const recipientEmailInput = document.getElementById("recipientEmail");
    const pass = document.getElementById('password').value;

    sendButton.addEventListener("click", function() {
        const recipientEmail = recipientEmailInput.value;
        // Call a function to send email using an AJAX request
        sendEmail(recipientEmail);
    });
});

// Function to send email using AJAX
function sendEmail(recipientEmail) {
    // Make an AJAX request to the server to send the email
    axios.post('/sendEmail', { recipientEmail })
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
}





