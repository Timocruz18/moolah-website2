// Navigation router for views
function showPage(pageId) {
    // Hide all view panels completely
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('signin-page').classList.add('hidden');
    document.getElementById('dashboard-page').classList.add('hidden');

    // Reveal the target page panel
    document.getElementById(pageId).classList.remove('hidden');
    
    // Bounce user windows directly up to the top view smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

console.log("Moolah application router initialized cleanly.");
