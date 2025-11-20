// A map to link button IDs to their corresponding sound files
const soundsMap = {
    'btn-forest': 'forest.mp3',
    'btn-tavern': 'tavern.mp3',
    'btn-rain': 'rain.mp3',
    'btn-fire': 'fire.mp3',
    'btn-dungeon': 'dungeon.mp3',
    'btn-battle': 'battle.mp3',
    'btn-wind': 'wind.mp3',
    'btn-ocean': 'ocean.mp3',
    'btn-market': 'market.mp3',
    'btn-crypt': 'crypt.mp3',
    'btn-alarm': 'alarm.mp3',
    'btn-chase': 'chase.mp3',
};

// An object to hold the Audio objects once they are created
const audioPlayers = {};

// 1. Initialize the Audio Players and add event listeners
function initializeSoundboard() {
    // Loop through the map to set up each button and its sound
    for (const [buttonId, filename] of Object.entries(soundsMap)) {
        // A. Create the Audio object
        const audio = new Audio(filename);
        // Ensure the sound loops when it reaches the end
        audio.loop = true;
        // Store the Audio object so we can access it later
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

    // Check if the audio is currently paused (meaning it's stopped or hasn't played yet)
    if (audio.paused) {
        // Start playing the sound from the beginning
        audio.currentTime = 0; // Reset to start
        audio.play().catch(error => {
            // Error handling for auto-play restrictions on some phones
            console.error("Autoplay failed:", error);
            alert(`Tap to play ${buttonElement.textContent}`);
        });
        
        // Add the 'playing' class to update the button's style
        buttonElement.classList.add('playing');
    } else {
        // Pause the audio
        audio.pause();
        
        // Remove the 'playing' class
        buttonElement.classList.remove('playing');
    }
}

// Start the whole process when the page loads
document.addEventListener('DOMContentLoaded', initializeSoundboard);