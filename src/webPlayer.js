let currentAccessToken = null;

export function setupWebPlayer(accessToken) {
    currentAccessToken = accessToken;

    const searchResults = document.getElementById('searchResults');
    searchResults.addEventListener('click', (e) => {
        if (e.target.classList.contains('resultItem')) {
            playItem(e.target.dataset.id, e.target.dataset.type);
        }
    });
}

async function playItem(itemId, itemType) {
    const endpoint = `https://api.spotify.com/v1/me/player/play`;
    const headers = {
        'Authorization': `Bearer ${currentAccessToken}`,
        'Content-Type': 'application/json',
    };
    const body = {
        context_uri: `spotify:${itemType}:${itemId}`,
    };

    try {
        console.log("Attempting to play", endpoint, body);
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error("Play response:", errorBody);
            throw new Error(`Unable to play ${itemType}: ${response.statusText}`);
        }

        console.log(`Successfully started playing ${itemType} with ID: ${itemId}`);
    } catch (error) {
        console.error('Error in web player:', error);
        handlePlaybackError(error);
    }
}
let spotifySDKReady = new Promise((resolve) => {
    window.onSpotifyWebPlaybackSDKReady = () => {
        resolve();
    };
});

export async function checkWebPlaybackSDKCompatibility() {
    await spotifySDKReady;  // wait for the SDK to be ready
    return window.Spotify?.Player?.isSupported() ?? false;
}

function handlePlaybackError(error) {
    console.error('Web Playback SDK error:', error);
    // You can have custom messages or actions based on specific errors.
    if(error.message.includes("Playback cannot be started from this context")) {
        alert('Cannot play this item. Please choose another.');
    } else {
        alert('Playback error. Please try again later.');
    }
}
