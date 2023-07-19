const express = require('express');
const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

app.use(express.json());

const corsOptions = {
    origin: ['https://harivmasoor.github.io', 'https://podify-two.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header('Permissions-Policy', 'interest-cohort=()');
    next();
});

// Log for debugging (remember to comment out or remove in production)
app.use((req, res, next) => {
    console.log('Origin:', req.headers.origin);
    next();
});

// OPTIONS requests handler
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://harivmasoor.github.io');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);  // Send HTTP 204 No Content
});
  
const PORT = process.env.PORT || 3000;

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
