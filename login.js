document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("loginButton");

    loginButton.addEventListener("click", function() {
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        const email = emailInput.value;
        const password = passwordInput.value;

        // Call a function to log in using an AJAX request
        login(email, password);
    });
});

// Function to log in using AJAX
async function login(email, password) {
    console.log('Email:', email);
    console.log('Password:', password);
    
    if (!email || !password) {
        console.error('Email or password is not defined.');
        return;
    }

    try {
        // Make an AJAX request to the server to perform login
        const response = await axios.post('/login', { email, password });

        if (response.status === 200) {
            console.log('Logged in successfully');
            // Redirect to another page or update UI as needed
        } else {
            console.error('Failed to log in');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}