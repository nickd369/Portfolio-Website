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

var lightbox = document.getElementById('lightbox');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var lightboxImg = document.getElementById("lightbox-img");
var thumbnails = document.querySelectorAll('.thumbnail');
var currentIndex = 0;

thumbnails.forEach((thumbnail, index) => {
    thumbnail.onclick = function() {
        lightbox.style.display = "block";
        lightboxImg.src = this.src;
        currentIndex = index;
    }
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    lightbox.style.display = "none";
}

function changeSlide(n) {
    currentIndex += n;
    if (currentIndex < 0) {
        currentIndex = thumbnails.length - 1;
    } else if (currentIndex >= thumbnails.length) {
        currentIndex = 0;
    }
    lightboxImg.src = thumbnails[currentIndex].src;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == lightbox) {
        lightbox.style.display = "none";
    }
}
