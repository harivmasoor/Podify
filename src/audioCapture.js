const captureAudioButton = document.getElementById('captureAudio');
let mediaRecorder;
let audioChunks = [];
const chunkDuration = 5000; // 5 seconds for this example. Adjust as needed.
const overlapDuration = 250; // 0.25 seconds overlap.

function initializeAudioCapture() {
    captureAudioButton.addEventListener('click', () => {
        if (typeof mediaRecorder === 'undefined' || mediaRecorder.state === 'inactive') {
            const constraints = {
                audio: {
                    echoCancellation: false,
                    autoGainControl: false,
                    noiseSuppression: false,
                    latency: 0
                }
            };

            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
                    audioChunks = [];

                    mediaRecorder.ondataavailable = onDataAvailable;
                    mediaRecorder.onstop = onRecordingStop;

                    mediaRecorder.start(chunkDuration - overlapDuration);
                    captureAudioButton.textContent = "Stop Recording";
                })
                .catch(err => {
                    console.error('Error accessing the microphone', err);
                });
        } else if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            captureAudioButton.textContent = "Capture Sound";
        }
    });
}

function onDataAvailable(event) {
    audioChunks.push(event.data);

    if (audioChunks.length > 1) {
        sendToAPI(audioChunks[0]); // Send the oldest chunk.
        audioChunks = audioChunks.slice(-1); // Keep only the latest chunk.
    }
}

function onRecordingStop() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });

    // TODO: Send the audioBlob to Whisper API for transcription

    // Clear the audioChunks array for the next session
    audioChunks = [];
}

// Placeholder function to simulate sending data to the API
async function sendToAPI(data) {
    const formData = new FormData();
    formData.append('audio', new Blob([data], { type: 'audio/webm;codecs=opus' }));

    try {
        const response = await fetch('https://podify-backend.onrender.com/transcribe', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        displayTranscription(result); // Display the transcribed result on the webpage
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}

function displayTranscription(result) {
    const transcriptionBox = document.getElementById('transcriptionBox');
    if (result && result.data) {
        transcriptionBox.value = result.data.transcript;
    } else {
        transcriptionBox.value = "Failed to get transcription.";
    }
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAudioCapture();
});


// // audioCapture.js

// const captureAudioButton = document.getElementById('captureAudio');
// let mediaRecorder;
// let audioChunks = [];

// function initializeAudioCapture() {
//     captureAudioButton.addEventListener('click', () => {
//         if (typeof mediaRecorder === 'undefined' || mediaRecorder.state === 'inactive') {
//             const constraints = {
//                 audio: {
//                     echoCancellation: false,
//                     autoGainControl: false,
//                     noiseSuppression: false,
//                     latency: 0
//                 }
//             };

//             navigator.mediaDevices.getUserMedia(constraints)
//                 .then(stream => {
//                     mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
//                     audioChunks = [];

//                     mediaRecorder.ondataavailable = event => {
//                         audioChunks.push(event.data);
//                     };

//                     mediaRecorder.onstop = () => {
//                         const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
//                         const audioUrl = URL.createObjectURL(audioBlob);
//                         const audio = new Audio(audioUrl);
//                         audio.play();
//                         downloadAudio(audioUrl);
//                     };

//                     mediaRecorder.start();
//                     captureAudioButton.textContent = "Stop Recording";
//                 })
//                 .catch(err => {
//                     console.error('Error accessing the microphone', err);
//                 });
//         } else if (mediaRecorder.state === 'recording') {
//             mediaRecorder.stop();
//             captureAudioButton.textContent = "Capture Sound";
//         }
//     });
// }

// function downloadAudio(url) {
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'recorded-audio.webm';
//     a.click();
// }

// // Initialize on page load
// document.addEventListener('DOMContentLoaded', () => {
//     initializeAudioCapture();
// });


