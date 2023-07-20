import { initializePlayer, playSong } from './spotifyPlayer.js';

// Constants
const clientId = "0cd96f761ce9434b9b4278b664d87591";
const redirectUri = encodeURIComponent("https://harivmasoor.github.io/Podify/"); 
const scopes = encodeURIComponent("user-read-private user-top-read streaming");

document.getElementById('authorizeButton').addEventListener('click', function() {
    redirectToSpotifyOAuth();
});

function redirectToSpotifyOAuth() {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
}

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {  
    exchangeCodeForToken(code);
}

function exchangeCodeForToken(code) {
    fetch("https://podify-backend.vercel.app/spotify/token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        initializeAppWithToken(data.access_token);
    })
    .catch(error => {
        console.error("Failed to exchange code for token:", error.message);
    });
}

function initializeAppWithToken(token) {
    initializePlayer(token);
    document.getElementById('authorizeButton').style.display = 'none';
    document.getElementById('playerControls').style.display = 'block';
}

document.getElementById('playButton').addEventListener('click', function() {
    playSong('spotify:track:6habFhsOp2NvshLv26DqMb');  // Replace with a valid Spotify URI for testing
});

document.getElementById('pauseButton').addEventListener('click', pauseSong);

function pauseSong() {
    if (player) {
        player.pause().then(() => {
            console.log('Paused playback!');
        }).catch(error => {
            console.error('Error trying to pause the playback:', error);
        });
    }
}

window.onSpotifyWebPlaybackSDKReady = () => {
    console.log("Spotify Web Playback SDK is ready!");
};




