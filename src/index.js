import { setupSearch } from './searchBar.js';

// Define your Spotify API Client ID
const clientId = '0cd96f761ce9434b9b4278b664d87591';

document.getElementById('loginButton').addEventListener('click', () => {
  window.location.href = 'https://podify-backend.onrender.com/login';
});

window.addEventListener('load', () => {
  const hash = window.location.hash.substr(1);
  const hashParams = new URLSearchParams(hash);

  if (hashParams.has('access_token')) {
    const accessToken = hashParams.get('access_token');
    const tokenType = hashParams.get('token_type');
    const expiresIn = hashParams.get('expires_in');

    console.log({
      access_token: accessToken,
      token_type: tokenType,
      expires_in: expiresIn,
    });

    getUserProfile(accessToken);
    setupSearch(accessToken);
  }
});

function getUserProfile(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  fetch('https://api.spotify.com/v1/me', { headers: headers })
    .then(response => response.json())
    .then(data => {
      const username = data.display_name;
      renderUsername(username);
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
}

function renderUsername(username) {
  const usernameElement = document.getElementById('username');
  usernameElement.textContent = username;
}

