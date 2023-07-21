import { setupSearch } from './searchBar.js';

// Define your Spotify API Client ID
const clientId = '0cd96f761ce9434b9b4278b664d87591';

const loginButton = document.getElementById('loginButton');  // Reference to the login button
loginButton.addEventListener('click', () => {
  window.location.href = 'https://podify-backend.onrender.com/login';
});

window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1);
  const hashParams = new URLSearchParams(hash);

  if (hashParams.has('access_token')) {
    loginButton.style.display = 'none';  // Hide the login button

    const accessToken = hashParams.get('access_token');
    const tokenType = hashParams.get('token_type');
    const expiresIn = hashParams.get('expires_in');
    const searchContainer = document.getElementById('search-container');
    searchContainer.style.display = 'block';

    console.log({
      access_token: accessToken,
      token_type: tokenType,
      expires_in: expiresIn,
    });

    getUserProfile(accessToken);
    setupSearch(accessToken);
    document.getElementById('searchInput').style.display = 'block'; // Show the search input
    document.getElementById('searchResults').style.display = 'block';
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

document.getElementById('searchInput').addEventListener('focus', (event) => {
  event.preventDefault();
});

