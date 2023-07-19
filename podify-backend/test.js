const fetch = require('node-fetch');

const token = 'AQBE3Rz4nmkDIeZlaDQHu-lJt5J6M5qNfaa7XkdARWLRB27wS7ZdXLbBYK2XqJqCZ458q1UpR7UXPKZLlvSnSaEXqCeD5GongTLSnsoYeOw2Krj0KaX7rKgs89gCEqBWFQMTxvDLdBOOCFZeSv1GoQFA7xtJEiAZ5XopCSbbQPJ2_GVNAy_LM6g7h_QoXE-cOz3E6YDX6-I';  // get this from the earlier token exchange
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
