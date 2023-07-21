let accessToken = null;

export function setupSearch(accessTokenValue) {
  accessToken = accessTokenValue;

  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  let timer;
  searchInput.addEventListener('input', (e) => {
    if (e.target.value) {
      searchResults.style.border = '1px solid #ccc';  // Add border
  } else {
      searchResults.style.border = 'none';  // Remove border
  }
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchSpotify(e.target.value);
    }, 500);  // Half a second delay to reduce the number of requests
  });
}

async function refreshToken() {
  try {
    const response = await fetch(`https://podify-backend.onrender.com/refresh_token?refresh_token=${localStorage.getItem('refresh_token')}`);
    const data = await response.json();
    accessToken = data.access_token;
    localStorage.setItem('access_token', accessToken);
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
}

async function searchSpotify(query) {
  const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=show,episode,track&limit=5`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  try {
    let response = await fetch(searchEndpoint, { headers: headers });
    
    // If token expired (status 401), refresh and retry
    if (response.status === 401) {
      await refreshToken();
      response = await fetch(searchEndpoint, { headers: headers });
    }

    const data = await response.json();
    const results = [];
    
    if (data.shows && data.shows.items) {
      results.push(...data.shows.items.map(item => ({
        type: 'show',
        name: item.name,
      })));
    }
    
    if (data.tracks && data.tracks.items) {
      results.push(...data.tracks.items.map(item => ({
        type: 'track',
        name: item.name,
      })));
    }

    // Call the displayResults function with the search results
    displayResults(results);
    
    return results;
  } catch (error) {
    console.error('Error searching Spotify:', error);
    return [];
  }
}

function displayResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';  // Clear previous results

  results.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.className = 'resultItem';
      resultElement.innerHTML = `<strong>${result.type}:</strong> ${result.name}`;
      resultsContainer.appendChild(resultElement);
  });
}


