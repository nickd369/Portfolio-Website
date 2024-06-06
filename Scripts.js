// Function to toggle between light and dark mode
function toggleMode() {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const currentMode = body.classList.contains('dark-mode') ? 'dark' : 'light';

    if (currentMode === 'dark') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        navbar.classList.remove('dark-mode');
        navbar.classList.add('light-mode');
        document.documentElement.style.setProperty('--gradient', 'linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff, #00ffff)');
        localStorage.setItem('mode', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        navbar.classList.remove('light-mode');
        body.classList.add('dark-mode');
        navbar.classList.add('dark-mode');
        document.documentElement.style.setProperty('--gradient', 'linear-gradient(45deg, #333333, #666666, #333333, #666666)');
        localStorage.setItem('mode', 'dark-mode');
    }
}

// Function to apply mode from local storage
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

// Lightbox functionality
var lightbox = document.getElementById('lightbox');
var lightboxContent = document.querySelector('.lightbox-content');
var thumbnails = document.querySelectorAll('.thumbnail');
var currentIndex = 0;

// Function to create video element dynamically
function createVideoElement(videoSrc) {
    // Create video element
    var video = document.createElement('video');
    video.controls = true;
    video.style.width = '100%';
    video.style.height = 'auto';
    video.style.display = 'block';
    video.style.margin = '20px auto';

    // Create source element
    var source = document.createElement('source');
    source.src = videoSrc;
    source.type = 'video/mp4';

    // Append source to video
    video.appendChild(source);

    // Return video element
    return video;
}

// Event listener for thumbnails
thumbnails.forEach((thumbnail, index) => {
    thumbnail.onclick = function() {
        lightbox.style.display = 'block';
        currentIndex = index;
        var media;
        if (this.tagName === 'IMG') {
            // If clicked thumbnail is an image
            media = document.createElement('img');
            media.src = this.src;
            media.style.maxWidth = '90%'; // Adjust the maximum width as needed
            media.style.maxHeight = '90vh'; // Set maximum height to 90% of the viewport height
        } else if (this.tagName === 'VIDEO') {
            // If clicked thumbnail is a video
            media = createVideoElement(this.src);
        }
        lightboxContent.innerHTML = ''; // Clear previous content
        lightboxContent.appendChild(media);
    }
});

// Close lightbox when clicking on close button
var span = document.getElementsByClassName('close')[0];
span.onclick = function() {
    lightbox.style.display = 'none';
};

// Close lightbox when clicking outside of it
window.onclick = function(event) {
    if (event.target == lightbox) {
        lightbox.style.display = 'none';
    }
};

// Function to change slides in the lightbox
function changeSlide(n) {
    currentIndex += n;
    if (currentIndex < 0) {
        currentIndex = thumbnails.length - 1;
    } else if (currentIndex >= thumbnails.length) {
        currentIndex = 0;
    }
    var media;
    if (thumbnails[currentIndex].tagName === 'IMG') {
        // If current slide is an image
        media = document.createElement('img');
        media.src = thumbnails[currentIndex].src;
        media.style.maxWidth = '90%'; // Adjust the maximum width as needed
        media.style.maxHeight = '90vh'; // Set maximum height to 90% of the viewport height
    } else if (thumbnails[currentIndex].tagName === 'VIDEO') {
        // If current slide is a video
        media = createVideoElement(thumbnails[currentIndex].src);
    }
    lightboxContent.innerHTML = ''; // Clear previous content
    lightboxContent.appendChild(media);
}
