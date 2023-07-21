# Podify: Elevate Your Listening Experience

## Background
Podify is a simple Single Page Application (SPA) designed to elevate your auditory experience. This platform seamlessly combines three primary elements:

- Search Bar
- Web Player
- Live Transcription

Upon logging into their Spotify account, users can select their desired content and watch the playback live on the webpage. The intuitive search bar offers auto-population features based on Spotify's vast library. The SPA ensures that the content is delivered via a sleek, minimal custom player.

Adjacent to the player, users can access a live transcription of the chosen content's audio. To harness the full capabilities of Podify, users must keep the webpage active throughout the playback. Once the content concludes, a summarised transcription will be delivered to the user's inbox.

## Functionality & MVPs
With Podify, users can:

- **Search**: Easily find any piece of content available to the logged-in user.
- **Playback**: Immerse in content through a custom media player directly within the webpage.
- **Live Transcription**: Witness real-time transcription of the audio playback.
- **Summary Delivery**: Receive a content summary post playback.

## Wireframes

<p align="left" style="padding-top: 50px; padding-bottom: 50px;"> 
    <img src="assets/wireframe.png" alt="show-page" width="500"/>
</p>


- The user-friendly search bar at the top connects to Spotify’s vast media library, offering real-time suggestions.
- The custom media player ensures a hassle-free content consumption experience.
- Users can opt to receive their summaries via email post playback.
- Live transcription is displayed on the right, allowing users to read as they watch.

## Technologies, Libraries, APIs
Podify leverages cutting-edge tools and platforms:

- **Modern Browser**: Particularly Chrome, suitable for capturing media (sound out of a tab).
- **Recorder.js**: Converts audio into files compatible with the speech-to-text API.
- **Whisper API**: Transforms speech into text.
- **Render**: Hosts our proxy server.
- **GPT-4**: Summarizes transcriptions efficiently.

## Implementation Timeline

**Note**:

- **Friday Afternoon & Weekend**: Setup - Configure webpack, familiarize with the Canvas API, initialize Board and Cell classes, and render the initial grid.
- **Monday**: Work on the logic of Conway's Game of Life, ensuring generation updates. If time permits, perfect canvas rendering.
- **Tuesday**: Prioritize cell rendering on the canvas and user controls, including start, stop, reset, and cell interaction.
- **Wednesday**: Finalize user controls, styling, color schemes, and navigation. If possible, focus on bonus features.
- **Thursday Morning**: Deploy to GitHub pages. If there's extra time, reformat this proposal into a production README.

## Bonus Features
Podify's evolutionary journey includes potential additions:

- **Email Integration**: Direct summaries to user inboxes.
- **SMS Integration**: Deliver summaries via SMS.
- **Podcast Integration**: Access to the top 50 podcasts and user summaries (would necessitate a backend).

