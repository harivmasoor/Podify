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
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Unable to play ${itemType}: ${response.statusText}`);
        }

        console.log(`Successfully started playing ${itemType} with ID: ${itemId}`);
    } catch (error) {
        console.error('Error in web player:', error);
    }
}