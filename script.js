// =======================================================
// NEW: Digital Clock Logic
// =======================================================

function updateClock() {
    const now = new Date(); 
    
    // Get time components
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Pad single digits with a leading zero (e.g., 9 becomes 09)
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;

    const clockElement = document.getElementById('digital-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Start the clock:
updateClock(); 
setInterval(updateClock, 1000); 


// =======================================================
// ORIGINAL: Soundboard Logic
// =======================================================

const soundsMap = {
    'btn-One': 'audio/Shattered.mp3',
    'btn-Two': 'audio/Campsite.mp3',
    'btn-Three': 'audio/Night.mp3',
    'btn-Four': 'audio/rain.mp3',
    'btn-Five': 'audio/Stormy.mp3',
    'btn-Six': 'audio/battle.mp3',
    'btn-Seven': 'audio/wind.mp3',
    'btn-Eight': 'audio/ocean.mp3',
    'btn-Nine': 'audio/market.mp3',
    'btn-Ten': 'audio/crypt.mp3',
    'btn-Eleven': 'audio/alarm.mp3',
    'btn-Twelve': 'audio/chase.mp3',
};

const audioPlayers = {};

// 1. Initialize the Audio Players and add event listeners
function initializeSoundboard() {
    for (const [buttonId, filename] of Object.entries(soundsMap)) {
        // A. Create the Audio object
        const audio = new Audio(filename);
        audio.loop = true;
        audioPlayers[buttonId] = audio;

        // B. Get the button element
        const button = document.getElementById(buttonId);
        
        // C. Add the click handler
        button.addEventListener('click', () => togglePlay(buttonId, button));
    }
}

// 2. The core function to start or stop a sound
function togglePlay(buttonId, buttonElement) {
    const audio = audioPlayers[buttonId];

    if (audio.paused) {
        // Start playing the sound
        audio.currentTime = 0; 
        audio.play().catch(error => {
            console.error("Autoplay failed:", error);
            alert(`Tap to play ${buttonElement.textContent}`);
        });
        
        buttonElement.classList.add('playing');
    } else {
        // Pause the audio
        audio.pause();
        
        buttonElement.classList.remove('playing');
    }
}

// Start the whole process when the page loads
document.addEventListener('DOMContentLoaded', initializeSoundboard);
