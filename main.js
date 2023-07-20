import { initializePlayer, playSong } from './spotifyPlayer.js';

// Rest of your code...



document.getElementById('authorizeButton').addEventListener('click', function() {
    // Only redirect to Spotify's OAuth page.
    const clientId = "0cd96f761ce9434b9b4278b664d87591";
    const redirectUri = encodeURIComponent("https://harivmasoor.github.io/Podify/"); 
    const scopes = encodeURIComponent("user-top-read app-remote-control user-modify-playback-state");

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
});

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {  
    // If there's an authorization code, send it to your backend for token exchange.
    fetch("https://podify-backend.vercel.app/spotify/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
        let token = data.access_token;
        initializePlayer(token);
                document.getElementById('authorizeButton').style.display = 'none';

        // Show the player controls
        document.getElementById('playerControls').style.display = 'block';
        // ... Your logic here ...
    })
    .catch(error => {
        console.log("There was a problem with the fetch operation:", error.message);
    });
}

document.getElementById('playButton').addEventListener('click', function() {
    // Replace with a valid Spotify URI for testing
    let sampleTrackURI = 'spotify:track:6habFhsOp2NvshLv26DqMb';
    playSong(sampleTrackURI);
});

document.getElementById('pauseButton').addEventListener('click', function() {
    if (player) {
        player.pause().then(() => {
            console.log('Paused playback!');
        }).catch(error => {
            console.error('Error trying to pause the playback:', error);
        });
    }
});

window.onSpotifyWebPlaybackSDKReady = () => {
    // This function will be called once the Spotify Web Playback SDK is ready.
    // Since the Spotify player initialization requires the access token, which 
    // you obtain after the OAuth flow, you do not need to immediately initialize 
    // the player here. Instead, you're already doing that after receiving the token.

    // For now, you can log a message indicating that the SDK is ready.
    console.log("Spotify Web Playback SDK is ready!");
};



