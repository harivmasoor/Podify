// Define your Spotify API Client ID
const clientId = '0cd96f761ce9434b9b4278b664d87591';
const redirectUri = 'https://harivmasoor.github.io/Podify';

// Handle the login button click event
document.getElementById('loginButton').addEventListener('click', () => {
  // Create the authorization URL
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}`;

  // Redirect the user to the authorization URL
  window.location.href = authUrl;
});

// Process the redirected URL after the user logs in
window.addEventListener('load', () => {
  const hash = window.location.hash.substr(1);
  const hashParams = new URLSearchParams(hash);

  if (hashParams.has('access_token')) {
    // Access token is present in the URL
    const accessToken = hashParams.get('access_token');
    const tokenType = hashParams.get('token_type');
    const expiresIn = hashParams.get('expires_in');

    // Output the access token and other details
    console.log({
      access_token: accessToken,
      token_type: tokenType,
      expires_in: expiresIn,
    });

    // Call additional functions or perform additional tasks here
    getUserProfile(accessToken);
  } else {
    // Call additional functions or perform additional tasks here
    // when the user is not logged in or access token is not present
  }
});

// Function to fetch the user's profile information
function getUserProfile(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  // Make a GET request to the Spotify API
  fetch('https://api.spotify.com/v1/me', {
    headers: headers,
  })
    .then(response => response.json())
    .then(data => {
      // Extract the username from the response data
      const username = data.display_name;

      // Render the username on the webpage
      renderUsername(username);
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
}

// Function to render the username on the webpage
function renderUsername(username) {
  const usernameElement = document.getElementById('username');
  usernameElement.textContent = username;
}
