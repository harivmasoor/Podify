

// function displayTranscription(result) {
//     const transcriptionBox = document.getElementById('transcriptionBox');
//     if (result && result.transcript) {
//         transcriptionBox.value = result.transcript;
//     } else {
//         transcriptionBox.value = "Failed to get transcription.";
//     }
// }

// // Initialize on page load
// document.addEventListener('DOMContentLoaded', () => {
//     initializeAudioCapture();
// });

// const socket = new WebSocket('ws://YOUR_BACKEND_URL/transcription');

// socket.onopen = function (event) {
//     console.log("WebSocket is open now.");
//     socket.send("Start Listening for transcription");  // You can send a message to start listening
// };

// socket.onmessage = function (event) {
//     console.log("Received data from server:", event.data);
//     // Here, you can handle the received transcription, e.g., display it in a textarea.
// };

// socket.onclose = function (event) {
//     if (event.wasClean) {
//         console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
//     } else {
//         console.log('Connection died');
//     }
// };

// socket.onerror = function (error) {
//     console.log(`Error: ${error.message}`);
// };






