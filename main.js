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
    fetch("https://podify-two.vercel.app/spotify/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code })
    })
    .then(response => response.json())
    .then(data => {
        let token = data.access_token; 
        // Use the token for subsequent Spotify API calls, or store it for later use.
        // ... Your logic here ...
    });
}

