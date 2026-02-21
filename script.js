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
    'btn-Two': 'audio/Dungeon.mp3',
    'btn-Three': 'audio/Fight.mp3',
    'btn-Four': 'audio/rain.mp3',
    'btn-Five': 'audio/Stormy.mp3',
    'btn-Six': 'audio/WEC.mp3',
    'btn-Seven': 'audio/cave.mp3',
    'btn-Eight': 'audio/Town.mp3',
    'btn-Nine': 'audio/Tavern.mp3',
    'btn-Ten': 'audio/Music.mp3',
    'btn-Eleven': 'audio/al.mp3',
    'btn-Twelve': 'audio/drwho.mp3',
};

const audioPlayers = {};

// 1. Initialize the Audio Players and add event listeners
function initializeSoundboard() {
    for (const [buttonId, filename] of Object.entries(soundsMap)) {
        // A. Create the Audio object
        const audio = new Audio(filename);
        audio.loop = true;
        // Set initial volume based on the slider default (70%)
        audio.volume = 0.7;
        audioPlayers[buttonId] = audio;

        // B. Get the button element and add the click handler (play/pause)
        const button = document.getElementById(buttonId);
        button.addEventListener('click', () => togglePlay(buttonId, button));
       } 
        // **NEW:** Add listener for the master volume slider
    const masterSlider = document.getElementById('master-volume-slider');
    masterSlider.addEventListener('input', handleMasterVolumeChange);
    
}

// 2. **NEW FUNCTION:** Handle the master volume slider input
function handleMasterVolumeChange(event) {
    const newVolume = event.target.value / 100; // Convert 0-100 to 0.0-1.0
    
    // Loop through ALL audio players and update their volume
    for (const buttonId in audioPlayers) {
        audioPlayers[buttonId].volume = newVolume;
    }
}

// 3. The core function to start or stop a sound (UNMODIFIED)
function togglePlay(buttonId, buttonElement) {
    const audio = audioPlayers[buttonId];

    if (audio.paused) {
        audio.currentTime = 0; 
        audio.play().catch(error => {
            console.error("Autoplay failed:", error);
            alert(`Tap to play ${buttonElement.textContent}`);
        });
        
        buttonElement.classList.add('playing');
    } else {
        audio.pause();
        buttonElement.classList.remove('playing');
    }
}

// Start the whole process when the page loads
document.addEventListener('DOMContentLoaded', initializeSoundboard);
