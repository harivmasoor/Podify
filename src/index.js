// Define your Spotify API Client ID
const clientId = '0cd96f761ce9434b9b4278b664d87591';

// Handle the login button click event
document.getElementById('loginButton').addEventListener('click', () => {
  // Redirect to the backend /login endpoint to handle Spotify authorization
  window.location.href = 'https://podify-backend.onrender.com//login';  // replace with your backend URL if it's not running locally
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

    // Fetch and display the user's Spotify profile
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

  // Make a GET request to the Spotify API to get user profile details
  fetch('https://api.spotify.com/v1/me', {
    headers: headers,
  })
    .then(response => response.json())
    .then(data => {
      // Extract the username from the response data
      const username = data.display_name;

      // Display the username on the webpage
      renderUsername(username);
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
}

// Function to display the username on the webpage
function renderUsername(username) {
  const usernameElement = document.getElementById('username');
  usernameElement.textContent = username;
}

