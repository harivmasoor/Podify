document.getElementById("loginButton").addEventListener("click",(()=>{window.location.href="https://podify-backend.onrender.com/login"})),window.addEventListener("load",(()=>{const e=window.location.hash.substr(1),t=new URLSearchParams(e);if(t.has("access_token")){const e=t.get("access_token"),n=t.get("token_type"),o=t.get("expires_in");console.log({access_token:e,token_type:n,expires_in:o}),function(e){fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{var t;t=e.display_name,document.getElementById("username").textContent=t})).catch((e=>{console.error("Error fetching user profile:",e)}))}(e)}}));
//# sourceMappingURL=main.js.map
// Search Functionality
document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 2) {  // Only search if the query has more than 2 characters
        searchSpotify(query);
    } else {
        document.getElementById('searchResults').innerHTML = '';  // Clear results if query is too short
    }
});

function searchSpotify(query) {
    const headers = {
        Authorization: `Bearer ${window.accessToken}`,  // Using the accessToken set earlier in the file
        'Content-Type': 'application/json',
    };
    
    // Make a GET request to the Spotify Search API for tracks and podcasts
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=track,podcast&limit=5`, {
        headers: headers,
    })
    .then(response => response.json())
    .then(data => {
        displaySearchResults(data);
    })
    .catch(error => {
        console.error('Error fetching search results:', error);
    });
}

function displaySearchResults(data) {
    let resultsHTML = '<strong>Results:</strong><br>';
    
    if (data.tracks && data.tracks.items.length > 0) {
        resultsHTML += '<br><strong>Tracks:</strong><br>';
        data.tracks.items.forEach(track => {
            resultsHTML += track.name + ' by ' + track.artists.map(artist => artist.name).join(', ') + '<br>';
        });
    }
    
    if (data.podcasts && data.podcasts.items.length > 0) {
        resultsHTML += '<br><strong>Podcasts:</strong><br>';
        data.podcasts.items.forEach(podcast => {
            resultsHTML += podcast.name + '<br>';
        });
    }
    
    document.getElementById('searchResults').innerHTML = resultsHTML;
}
