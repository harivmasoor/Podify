// Step 3: Authorization Code Exchange
let code = "your_authorization_code"; // Authorization code obtained from step 2

let clientId = process.env.CLIENT_ID;
let clientSecret = process.env.CLIENT_SECRET;
let encodedData = window.btoa(clientId + ":" + clientSecret);

fetch("https://accounts.spotify.com/api/token", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + encodedData
    },
    body: new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': "your_redirect_uri"
    })
})
.then(response => response.json())
.then(data => {
    let token = data.access_token; // This is the token used in future API calls

    // Now make API calls
    fetch('https://api.spotify.com/v1/me/top/artists', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => console.log(data));
});
document.getElementById('authorizeButton').addEventListener('click', function() {
    const clientId = process.env.CLIENT_ID; // Place your Client ID here for now, but remember to use environment variables or server-side code for security in a real application.
    const redirectUri = encodeURIComponent("https://harivmasoor.github.io/Podify/"); // This should be the URL to which Spotify will redirect after the user grants/denies permission.
    const scopes = encodeURIComponent("user-top-read"); // This is just an example scope. Adjust as necessary.

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
});

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {  // Only run this block if there's an authorization code
    const clientId = "YOUR_CLIENT_ID";
    const clientSecret = "YOUR_CLIENT_SECRET";
    const redirectUri = "YOUR_REDIRECT_URI";
    
    let encodedData = window.btoa(clientId + ":" + clientSecret);

    fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + encodedData
        },
        body: new URLSearchParams({
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirectUri
        })
    })
    .then(response => response.json())
    .then(data => {
        let token = data.access_token; // This is the token used in future API calls
        // Now make API calls...
    });
}
