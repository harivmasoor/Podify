const fetch = require('node-fetch');

const accessToken = 'YOUR_ACCESS_TOKEN';  // Replace with your token

fetch('https://api.spotify.com/v1/me', {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})
.then(response => response.json())
.then(data => {
    console.log('Scopes:', data.scope);
})
.catch(error => {
    console.error('There was an error:', error);
});
