const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const allowedOrigins = ['https://harivmasoor.github.io', 'https://podify-two.vercel.app'];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      return res.status(200).json({});
    }
    next();
});

app.post('/spotify/token', async (req, res) => {  // <-- Marked this function as async
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

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
