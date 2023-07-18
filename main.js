//Spotify API Pull

// Step 3: Authorization Code Exchange
let code = "your_authorization_code"; // Authorization code obtained from step 2

let clientId = "your_client_id";
let clientSecret = "your_client_secret";
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
