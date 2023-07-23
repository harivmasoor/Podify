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
  const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist,show,episode,track&limit=5`;
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
    
    if (data.tracks && data.tracks.items) {
      results.push(...data.tracks.items.map(item => ({
          type: 'track',
          id: item.id,
          name: item.name, // Adjusted this line to include artist name
          image: item.album.images[0].url, // Add image URL
      })));
  }
  
  if (data.episodes && data.episodes.items) {
    results.push(...data.episodes.items.map(item => ({
        type: 'episode',
        id: item.id,
        name: item.name,  // Include show name
        image: item.images[0].url,  // Add image URL
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
  resultsContainer.innerHTML = '';

  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.className = 'resultItem';
    resultElement.dataset.id = result.id;
    resultElement.dataset.type = result.type;
    resultElement.dataset.name = result.name;
    resultElement.dataset.image = result.image;
    resultElement.innerHTML = `<img src="${result.image}" alt="${result.name}"/> ${result.name}`;
    resultElement.addEventListener('click', handleResultClick);
    resultsContainer.appendChild(resultElement);
  });
}

async function handleResultClick(e) {
  const type = e.currentTarget.dataset.type;
  const id = e.currentTarget.dataset.id;

  if (type === 'artist') {
    await getArtistTopTracks(id);
  } else if (type === 'show') {
    await getShowEpisodes(id);
  }
}

async function getArtistTopTracks(artistId) {
  const topTracksEndpoint = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  try {
    let response = await fetch(topTracksEndpoint, { headers: headers });

    if (response.status === 401) {
      await refreshToken();
      response = await fetch(topTracksEndpoint, { headers: headers });
    }

    const data = await response.json();
    const topTracks = data.tracks.map(track => ({
      type: 'track',
      id: track.id,
      name: track.name,
      image: track.album.images[0].url,
    }));

    displayResults(topTracks);

  } catch (error) {
    console.error('Error getting artist top tracks:', error);
  }
}

async function getShowEpisodes(showId) {
  const episodesEndpoint = `https://api.spotify.com/v1/shows/${showId}/episodes?market=US&limit=5`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  try {
    let response = await fetch(episodesEndpoint, { headers: headers });

    if (response.status === 401) {
      await refreshToken();
      response = await fetch(episodesEndpoint, { headers: headers });
    }

    const data = await response.json();
    const episodes = data.items.map(episode => ({
      type: 'episode',
      id: episode.id,
      name: episode.name,
      image: episode.images[0].url,
    }));

    displayResults(episodes);

  } catch (error) {
    console.error('Error getting show episodes:', error);
  }
}


