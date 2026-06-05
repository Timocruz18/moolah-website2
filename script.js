// Function to switch screens instantly
function showPage(pageId) {
    // Hide all containers
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('signin-page').classList.add('hidden');

    // Show the selected page container
    document.getElementById(pageId).classList.remove('hidden');
    
    // Scroll smoothly back to the top of the mobile window
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Log confirmation checking connection
console.log("Moolah navigation controller loaded successfully.");
