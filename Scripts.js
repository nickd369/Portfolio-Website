function toggleMode() {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const currentMode = body.classList.contains('dark-mode') ? 'dark' : 'light';

    if (currentMode === 'dark') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        navbar.classList.remove('dark-mode');
        navbar.classList.add('light-mode');
        // Restore light mode gradient
        document.documentElement.style.setProperty('--gradient', 'linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff, #00ffff)');
        localStorage.setItem('mode', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        navbar.classList.remove('light-mode');
        body.classList.add('dark-mode');
        navbar.classList.add('dark-mode');
        // Set dark mode gradient
        document.documentElement.style.setProperty('--gradient', 'linear-gradient(45deg, #333333, #666666, #333333, #666666)');
        localStorage.setItem('mode', 'dark-mode');
    }
}

function applyMode(mode) {
    const body = document.body;
    const navbar = document.querySelector('.navbar');

    if (mode === 'light-mode') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        navbar.classList.remove('dark-mode');
        navbar.classList.add('light-mode');
        document.documentElement.style.setProperty('--gradient', 'linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff, #00ffff)');
    } else {
        body.classList.remove('light-mode');
        navbar.classList.remove('light-mode');
        body.classList.add('dark-mode');
        navbar.classList.add('dark-mode');
        document.documentElement.style.setProperty('--gradient', 'linear-gradient(45deg, #333333, #666666, #333333, #666666)');
    }
}

// Check if there is no preference saved in local storage
if (!localStorage.getItem('mode')) {
    toggleMode(); // Activate default mode if no preference is stored
} else {
    // Apply the mode stored in local storage
    const storedMode = localStorage.getItem('mode');
    applyMode(storedMode);
}

