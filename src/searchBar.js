let accessToken = null;

export function setupSearch(accessTokenValue) {
  accessToken = accessTokenValue;

  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  let timer;
  searchInput.addEventListener('input', (e) => {
    if (e.target.value) {
      searchResults.style.border = '1px solid #ccc';  
    } else {
      searchResults.style.border = 'none';  
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchSpotify(e.target.value);
    }, 500);
  });
}

async function refreshToken() {
  // ... (unchanged)
}

async function searchSpotify(query) {
  const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album,artist,track,show,episode&limit=5`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  try {
    let response = await fetch(searchEndpoint, { headers: headers });
    
    if (response.status === 401) {
      await refreshToken();
      response = await fetch(searchEndpoint, { headers: headers });
    }

    const data = await response.json();
    const results = [];
    
    // Extract and structure data for tracks
    if (data.tracks && data.tracks.items) {
      results.push(...data.tracks.items.map(item => ({
          type: 'track',
          id: item.id,
          name: item.artists[0].name ? `${item.artists[0].name} - ${item.name}` : item.name,
          image: item.album.images[0].url,
      })));
    }
    
    // Extract and structure data for episodes
    if (data.episodes && data.episodes.items) {
      results.push(...data.episodes.items.map(item => ({
          type: 'episode',
          id: item.id,
          name: item.show ? `${item.show.name} - ${item.name}` : item.name,
          image: item.images[0].url,
      })));
    }

    // Extract and structure data for artists
    if (data.artists && data.artists.items) {
      results.push(...data.artists.items.map(item => ({
          type: 'artist',
          id: item.id,
          name: item.name,
          image: item.images[0] ? item.images[0].url : null, // Ensure there is an image before accessing
      })));
    }

    // Extract and structure data for albums
    if (data.albums && data.albums.items) {
      results.push(...data.albums.items.map(item => ({
          type: 'album',
          id: item.id,
          name: item.name,
          image: item.images[0].url,
      })));
    }
    
    // Extract and structure data for shows
    if (data.shows && data.shows.items) {
      results.push(...data.shows.items.map(item => ({
          type: 'show',
          id: item.id,
          name: item.name,
          image: item.images[0].url,
      })));
    }

    displayResults(results);
    
    return results;
  } catch (error) {
    console.error('Error searching Spotify:', error);
    return [];
  }
}

function displayResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';

  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.className = 'resultItem';
    resultElement.dataset.id = result.id; 
    resultElement.dataset.type = result.type;
    resultElement.dataset.name = result.name;
    resultElement.dataset.image = result.image;
    resultElement.innerHTML = `<img src="${result.image}" alt="${result.name}"/> ${result.name}`; // Display image and name
    resultsContainer.appendChild(resultElement);
  });
}




