// audioCapture.js

const captureAudioButton = document.getElementById('captureAudio');
let mediaRecorder;
let audioChunks = [];

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

                    mediaRecorder.ondataavailable = event => {
                        audioChunks.push(event.data);
                    };

                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        audio.play();
                        downloadAudio(audioUrl);
                    };

                    mediaRecorder.start();
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

function downloadAudio(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded-audio.webm';
    a.click();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAudioCapture();
});


