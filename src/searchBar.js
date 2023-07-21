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

function searchSpotify(query, accessToken) {
    const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=show,track&limit=5`;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    return fetch(searchEndpoint, { headers: headers })
        .then(response => response.json())
        .then(data => {
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
            return results;
        })
        .catch(error => {
            console.error('Error searching Spotify:', error);
            return [];
        });
}

