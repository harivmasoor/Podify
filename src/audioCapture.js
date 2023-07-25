const captureAudioButton = document.getElementById('captureAudio');
let mediaRecorder;
let audioChunk;
const chunkDuration = 30000;
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
    if (audioChunk) {
        sendToAPI(audioChunk);
    }
    audioChunk = event.data;
}

function onRecordingStop() {
    const audioBlob = new Blob([audioChunk], { type: 'audio/webm;codecs=opus' });
    audioChunk = null;
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


