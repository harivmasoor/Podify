const express = require('express');
const dotenv = require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.post('/spotify/token', async (req, res) => {  // <-- Marked this function as async
    const authCode = req.body.code;

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = "https://podify-two.vercel.app/spotify/token";

    let encodedData = Buffer.from(clientId + ":" + clientSecret).toString('base64');

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + encodedData
            },
            body: new URLSearchParams({
                'grant_type': 'authorization_code',
                'code': authCode,
                'redirect_uri': redirectUri
            })
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to exchange Spotify authorization code" });
    }
});

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
