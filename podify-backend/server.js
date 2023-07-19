const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(cors());  // Enable CORS for all routes.

app.post('/spotify/token', async (req, res) => {
    const authCode = req.body.code;

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = "https://harivmasoor.github.io/Podify/";

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
