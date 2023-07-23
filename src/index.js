// Description: The main JavaScript file for the Podify web app.

import { setupSearch } from './searchBar.js';
import { setupWebPlayer, checkWebPlaybackSDKCompatibility } from './webPlayer.js';

let updateSeekBarInterval;  // Declare the variable at a scope accessible by all your functions
let accessToken; // Move the declaration of accessToken to a higher scope
let player;  // Declare the player variable at a scope accessible by all your functions
let isPlaying = false;  // To track playback state

// Function to get user's Spotify profile
function getUserProfile(token) {
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    fetch('https://api.spotify.com/v1/me', { headers: headers })
        .then(response => response.json())
        .then(data => {
            const username = data.display_name;
            renderUsername(username);
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
}

// Function to render the user's name
function renderUsername(username) {
    const usernameElement = document.getElementById('username');
    usernameElement.textContent = username;
}

// Playback control functions
function togglePlay() {
    if (isPlaying) {
        player.pause().then(() => {
            console.log('Paused Playback');
            isPlaying = false;
            document.getElementById('playPause').textContent = '▶️';
            clearInterval(updateSeekBarInterval);  // Stop updating the seek bar
        });
    } else {
        player.resume().then(() => {
            console.log('Resumed Playback');
            isPlaying = true;
            document.getElementById('playPause').textContent = '⏸️';
            updateSeekBarInterval = setInterval(updateSeekBar, 1000);  // Resume updating the seek bar
        });
    }
}


function rewindTrack() {
    player.getCurrentState().then(state => {
        if (state) {
            const newPosition = Math.max(state.position - 15000, 0); // ensure position is not negative
            player.seek(newPosition).then(() => {
                console.log('Rewound 15 seconds!');
            });
        }
    });
}

function fastForwardTrack() {
    player.getCurrentState().then(state => {
        if (state) {
            const newPosition = state.position + 15000;
            player.seek(newPosition).then(() => {
                console.log('Fast-forwarded 15 seconds!');
            });
        }
    });
}


// Initialize all event listeners
function initializeEventListeners() {
    // Login button event
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', () => {
        window.location.href = 'https://podify-backend.onrender.com/login';
    });

    // Search input events
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 0) {
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    });

    searchInput.addEventListener('focus', (event) => {
        event.preventDefault();
    });

    // Player control events
    document.getElementById('playPause').addEventListener('click', togglePlay);
    document.getElementById('rewind').addEventListener('click', rewindTrack);
    document.getElementById('fastForward').addEventListener('click', fastForwardTrack);
}

// The main code that runs when the window loads
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);

    if (hashParams.has('access_token')) {
        document.getElementById('loginButton').style.display = 'none';  // Hide the login button

        accessToken = hashParams.get('access_token'); 
        const tokenType = hashParams.get('token_type');
        const expiresIn = hashParams.get('expires_in');
        const searchContainer = document.getElementById('search-container');
        searchContainer.style.display = 'block';

        console.log({
            access_token: accessToken,
            token_type: tokenType,
            expires_in: expiresIn,
        });

        getUserProfile(accessToken);
        setupSearch(accessToken);
        if (checkWebPlaybackSDKCompatibility()) {
            setupWebPlayer(accessToken);
        } else {
            alert("Device not suitable for playback");
        }
    }
});

window.onSpotifyWebPlaybackSDKReady = () => {
    player = new Spotify.Player({
        name: 'Your Web Player Name',
        getOAuthToken: callback => {
            callback(accessToken);
        }
    });

    player.addListener('player_state_changed', state => {
        console.log(state);
        if (state) {
            const trackDuration = state.track_window.current_track.duration_ms;
            const currentPosition = state.position;
    
            document.getElementById('seekBar').max = trackDuration;
            document.getElementById('seekBar').value = currentPosition;
    
            // Update the time display
            document.getElementById('currentTime').textContent = formatTime(currentPosition);
            document.getElementById('totalTime').textContent = formatTime(trackDuration);
        }
        isPlaying = !state.paused;
        if (isPlaying) {
            document.getElementById('playPause').textContent = '⏸️';
        } else {
            document.getElementById('playPause').textContent = '▶️';
        }
    });

    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);

        updateSeekBarInterval = setInterval(updateSeekBar, 1000);  // Update the seek bar every second

        // Set the device_id as the active playback device immediately.
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        fetch('https://api.spotify.com/v1/me/player', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                device_ids: [device_id],
                play: true
            }),
        }).then(response => {
            if (!response.ok) {
                console.error('Error setting active device:', response.statusText);
            }
        });
    });
  
    player.connect();
};

document.getElementById('webPlayer').style.display = 'block';

document.getElementById('seekBar').addEventListener('input', (e) => {
    const newPosition = e.target.value; // This will be in milliseconds
    player.seek(newPosition).then(() => {
        console.log(`Moved to ${newPosition} ms`);
    });
});

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateSeekBar() {
    player.getCurrentState().then(state => {
        if (state) {
            const currentPosition = state.position;
            document.getElementById('seekBar').value = currentPosition;
            document.getElementById('currentTime').textContent = formatTime(currentPosition);
        }
    });
}


// Initialize the event listeners
initializeEventListeners();



