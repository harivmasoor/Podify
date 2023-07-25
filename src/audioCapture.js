export function initializeAudioCapture() {
    const captureAudioButton = document.getElementById('captureAudio');
    let mediaRecorder;
    let audioChunks = [];

    captureAudioButton.addEventListener('click', () => {
        if (typeof mediaRecorder === 'undefined' || mediaRecorder.state === 'inactive') {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaRecorder = new MediaRecorder(stream);
                    audioChunks = [];

                    mediaRecorder.ondataavailable = event => {
                        audioChunks.push(event.data);
                    };

                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
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
    a.download = 'recorded-audio.wav';
    a.click();
}
