import { setupSearch } from './searchBar.js';
import { setupWebPlayer, checkWebPlaybackSDKCompatibility } from './webPlayer.js';

const loginButton = document.getElementById('loginButton');  // Reference to the login button
loginButton.addEventListener('click', () => {
    window.location.href = 'https://podify-backend.onrender.com/login';
});

let accessToken; // Move the declaration of accessToken to a higher scope

window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);

    if (hashParams.has('access_token')) {
        loginButton.style.display = 'none';  // Hide the login button

        accessToken = hashParams.get('access_token'); // Use the higher scoped accessToken
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
        const searchInput = document.getElementById('searchInput');
        searchInput.style.display = 'block'; // Show the search input
        
        const searchResults = document.getElementById('searchResults');
        searchInput.addEventListener('input', () => {
            if (searchInput.value.length > 0) {
                searchResults.style.display = 'block';  // Show the searchResults if there's content
            } else {
                searchResults.style.display = 'none';   // Hide the searchResults if there's no content
            }
        });
        setupWebPlayer(accessToken);    
    }
});

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

var player;  // Declare the player variable at a scope accessible by all your functions

window.onSpotifyWebPlaybackSDKReady = () => {
    player = new Spotify.Player({
        name: 'Your Web Player Name',
        getOAuthToken: callback => {
            callback(accessToken);  // Use the higher scoped accessToken
        }
    });

    player.addListener('player_state_changed', state => {
        console.log(state);
        isPlaying = !state.paused;
        if (isPlaying) {
            document.getElementById('playPause').textContent = '⏸️';
        } else {
            document.getElementById('playPause').textContent = '▶️';
        }
    });

    player.connect();
};

function renderUsername(username) {
    const usernameElement = document.getElementById('username');
    usernameElement.textContent = username;
}

document.getElementById('searchInput').addEventListener('focus', (event) => {
    event.preventDefault();
});

document.getElementById('playPause').addEventListener('click', togglePlay);
document.getElementById('rewind').addEventListener('click', rewindTrack);
document.getElementById('fastForward').addEventListener('click', fastForwardTrack);

let isPlaying = false;  // To track playback state

function togglePlay() {
    if (isPlaying) {
        player.pause().then(() => {
            console.log('Paused Playback');
            isPlaying = false;
            document.getElementById('playPause').textContent = '▶️';
        });
    } else {
        player.resume().then(() => {
            console.log('Resumed Playback');
            isPlaying = true;
            document.getElementById('playPause').textContent = '⏸️';
        });
    }
}

function rewindTrack() {
    player.seek(player.getCurrentState().position - 15000);  // rewinds 15 seconds
}

function fastForwardTrack() {
    player.seek(player.getCurrentState().position + 15000);  // fast forwards 15 seconds
}

document.getElementById('webPlayer').style.display = 'block';



