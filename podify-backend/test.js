const fetch = require('node-fetch');

const token = 'AQA6fBjezAo9Iz0qbvI8lPi9K5K_rcIlFfP4yVhbxIU_m0czW5kLlqqkZSDjfibqaP5-BqrLtkqUo_132q29u6HGbvXMEC2oVnlXnPJdgTXZ_MZ_LgaoaK5K3YJK3b8LIVPYqTM9E2wk57zBTBD9QMOIJR8ez3uo-hXx2g4t5dTs5pNoUt9wJpGA8P4QUHoSyS7WERhXCLg';  // get this from the earlier token exchange
const trackId = '6habFhsOp2NvshLv26DqMb';  // replace with the ID of Despacito or any song

fetch("https://api.spotify.com/v1/me/player/play", {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        uris: [`spotify:track:${trackId}`]
    })
})
.then(response => {
    if (response.ok) {
        console.log('Playing track');
    } else {
        return response.json().then(data => {
            throw new Error(data.error.message);
        });
    }
})
.catch(error => {
    console.error('There was an error:', error);
});
