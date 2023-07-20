// spotifyPlayer.js

let player = null;

function initializePlayer(token) {
    player = new Spotify.Player({
        name: 'Podify Web Player',
        getOAuthToken: callback => {
            callback(token);
        }
    });
    
    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
    
    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });
    
    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });
    
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });
    
    // Connect to the player
    player.connect();
}

function playSong(uri) {
    if (!player) {
        console.error("Player hasn't been initialized yet.");
        return;
    }
    player.play({
        uris: [uri]
    }).then(() => {
        console.log('Playing the song!');
    }).catch(error => {
        console.error('Error while trying to play the song:', error);
    });
}

export { initializePlayer, playSong };

