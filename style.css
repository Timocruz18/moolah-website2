// Global state
let currentUser = null;

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.app-container').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

// Show alert messages
function showAlert(elementId, message, isError = true) {
    const alertBox = document.getElementById(elementId);
    alertBox.innerText = message;
    alertBox.style.color = isError ? "red" : "green";
    alertBox.classList.remove('hidden');
    setTimeout(() => alertBox.classList.add('hidden'), 4000);
}

// 1. REGISTRATION LOGIC (Duplicate Check & $4 Conversion)
function handleRegister() {
    const phone = document.getElementById('reg-phone').value;
    const pass = document.getElementById('reg-pass').value;
    const invite = document.getElementById('reg-invite').value;
    const countrySelect = document.getElementById('countrySelect');

    if (!phone || !pass || !invite || !countrySelect.value) {
        return showAlert('reg-alert', 'Please fill all fields and select a country.');
    }

    // Retrieve existing users database from localStorage
    let usersDb = JSON.parse(localStorage.getItem('moolahUsers')) || {};

    // CHECK IF PHONE NUMBER ALREADY EXISTS
    if (usersDb[phone]) {
        return showAlert('reg-alert', 'These credentials are already registered. Please Log In.');
    }

    // $4 Sign-up Bonus Conversion
    const exchangeRate = parseFloat(countrySelect.options[countrySelect.selectedIndex].getAttribute('data-rate'));
    const currency = countrySelect.value;
    const startingBalance = 4 * exchangeRate; // $4 converted to local currency

    // Create new user profile
    const newUser = {
        phone: phone,
        password: pass,
        currency: currency,
        exchangeRate: exchangeRate,
        balance: startingBalance,
        hasPurchasedProduct: false, // Required for invite code
        inviteCode: generateRandomCode()
    };

    // Save to database
    usersDb[phone] = newUser;
    localStorage.setItem('moolahUsers', JSON.stringify(usersDb));

    showAlert('reg-alert', 'Registration successful!', false);
    setTimeout(() => showPage('login-page'), 1500);
}

// 2. LOGIN LOGIC
function handleLogin() {
    const phone = document.getElementById('login-phone').value;
    const pass = document.getElementById('login-pass').value;
    
    let usersDb = JSON.parse(localStorage.getItem('moolahUsers')) || {};

    if (usersDb[phone] && usersDb[phone].password === pass) {
        currentUser = usersDb[phone];
        updateDashboard();
        showPage('dashboard-page');
    } else {
        showAlert('login-alert', 'Invalid phone number or password.');
    }
}

// 3. INVITE CODE LOGIC (Must purchase first)
function checkInviteEligibility() {
    const inviteDisplay = document.getElementById('invite-code-display');
    
    if (currentUser.hasPurchasedProduct) {
        inviteDisplay.innerText = `Your Invite Code: ${currentUser.inviteCode}`;
        inviteDisplay.style.color = "green";
    } else {
        inviteDisplay.innerText = `LOCKED: You must buy a product to generate an invite code.`;
        inviteDisplay.style.color = "red";
    }
    inviteDisplay.classList.remove('hidden');
}

// 4. DYNAMIC TESLA PRODUCTS
function loadProducts() {
    if (!currentUser) return;
    
    const container = document.getElementById('product-container');
    const rate = currentUser.exchangeRate;
    const currency = currentUser.currency;

    // Product definitions in USD
    const products = [
        { name: "Tesla Model 3 Plan", costUSD: 3, dailyUSD: 1.07, totalUSD: 15, duration: "14 Days" }
    ];

    container.innerHTML = ''; // Clear existing

    products.forEach((prod, index) => {
        // Convert USD to local currency
        const localCost = (prod.costUSD * rate).toFixed(2);
        const localDaily = (prod.dailyUSD * rate).toFixed(2);
        const localTotal = (prod.totalUSD * rate).toFixed(2);

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${prod.name}</h3>
            <p><strong>Price:</strong> ${localCost} ${currency}</p>
            <p><strong>Daily Return:</strong> ${localDaily} ${currency}</p>
            <p><strong>Total Return:</strong> ${localTotal} ${currency}</p>
            <p><strong>Duration:</strong> ${prod.duration}</p>
            <button onclick="buyProduct(${prod.costUSD})" class="btn-submit" style="margin-top:10px;">Buy Now</button>
        `;
        container.appendChild(card);
    });
}

// 5. PURCHASE LOGIC
function buyProduct(costUSD) {
    const localCost = costUSD * currentUser.exchangeRate;

    if (currentUser.balance >= localCost) {
        currentUser.balance -= localCost;
        currentUser.hasPurchasedProduct = true; // Unlocks invite code
        
        // Update database
        let usersDb = JSON.parse(localStorage.getItem('moolahUsers'));
        usersDb[currentUser.phone] = currentUser;
        localStorage.setItem('moolahUsers', JSON.stringify(usersDb));

        updateDashboard();
        alert('Product purchased successfully! Your invite code is now unlocked.');
        showPage('dashboard-page');
    } else {
        alert('Insufficient balance. Please recharge.');
    }
}

function updateDashboard() {
    document.getElementById('dashboard-balance').innerText = `${currentUser.balance.toFixed(2)} ${currentUser.currency}`;
}

function generateRandomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}
