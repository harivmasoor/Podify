const captureAudioButton = document.getElementById('captureAudio');
let mediaRecorder;
let audioChunks = [];
const chunkDuration = 5000;
const overlapDuration = 250;

export function initializeAudioCapture() {
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
        sendToAPI(audioChunks[0]);
        audioChunks = audioChunks.slice(-1);
    }
}

function onRecordingStop() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
    audioChunks = [];
}

async function sendToAPI(data) {
    const formData = new FormData();
    formData.append('audio', new Blob([data], { type: 'audio/webm;codecs=opus' }), 'audio.webm');

    try {
        const response = await fetch('https://podify-backend.onrender.com/transcribe', {
            method: 'POST',
            body: formData
        });

        const responseData = await response.text();
        
        let parsedData;
        try {
            parsedData = JSON.parse(responseData);
        } catch (e) {
            throw new Error(`Server responded with ${response.status}: ${responseData}`);
        }

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${parsedData.reason || responseData}`);
        }

        displayTranscription(parsedData);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}


function displayTranscription(result) {
    const transcriptionBox = document.getElementById('transcriptionBox');
    if (result && result.transcript) {
        transcriptionBox.value = result.transcript;
    } else {
        transcriptionBox.value = "Failed to get transcription.";
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAudioCapture();
});


