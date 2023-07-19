const fetch = require('node-fetch');

const token = 'AQD73u5gztfHBdXXF4G2XK8TcuIwIpLJfP-CZ8QxL59vwYM0p7x7dt8b7QmtF_co-zV_ok4hahzDJQ0y0sZWOYxqtkKN1uML3yfQNHKoAeFL2xAqNzC3f5U4NVNnXORAsgClahZ0vy1ygKf1LPBn5pyvkh5YskZSYdTEp4CRvnMV43fJjHet4vYSbzUtMbZ77COb0qA7eGc';  // get this from the earlier token exchange
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
