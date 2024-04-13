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

