let accessToken = null;

export function setupSearch(accessTokenValue) {
  accessToken = accessTokenValue;

  const searchInput = document.getElementById('searchInput');
  let timer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchSpotify(e.target.value);
    }, 500);  // Half a second delay to reduce the number of requests
  });
}

function searchSpotify(query) {
  if (!query) return;  // If the query is empty, don't make a request

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  fetch(`https://api.spotify.com/v1/search?q=${query}&type=podcast,track&limit=5`, { headers: headers })
    .then(response => response.json())
    .then(data => {
      const resultsContainer = document.getElementById('searchResults');
      let resultsHtml = '';
      if (data.podcasts && data.podcasts.items.length) {
        resultsHtml += '<h3>Podcasts</h3>';
        data.podcasts.items.forEach(podcast => {
          resultsHtml += `<p>${podcast.name}</p>`;
        });
      }
      if (data.tracks && data.tracks.items.length) {
        resultsHtml += '<h3>Songs</h3>';
        data.tracks.items.forEach(track => {
          resultsHtml += `<p>${track.name} by ${track.artists.map(artist => artist.name).join(', ')}</p>`;
        });
      }
      resultsContainer.innerHTML = resultsHtml;
    })
    .catch(error => {
      console.error('Error fetching search results:', error);
    });
}
