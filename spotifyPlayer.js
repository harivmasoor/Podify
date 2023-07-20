// spotifyPlayer.js

let player = null;

function initializePlayer(token) {
    player = new Spotify.Player({
        name: 'Podify Web Player',
        getOAuthToken: callback => {
            callback(token);
        }
    });
    
    setupPlayerListeners();
    player.connect();
}

function setupPlayerListeners() {
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    player.addListener('player_state_changed', state => { console.log(state); });
    
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });
    
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });
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

function pauseSong() {
    if (!player) {
        console.error("Player hasn't been initialized yet.");
        return;
    }
    player.pause().then(() => {
        console.log('Paused playback!');
    }).catch(error => {
        console.error('Error trying to pause the playback:', error);
    });
}

export { initializePlayer, playSong, pauseSong };

