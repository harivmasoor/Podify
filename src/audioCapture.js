const captureAudioButton = document.getElementById('captureAudio');
let mediaRecorder;
let audioChunks = [];

const chunkDuration = 30000;
const overlapDuration = 250;

export function initializeAudioCapture() {
    captureAudioButton.addEventListener('click', async () => {
        if (typeof mediaRecorder !== 'undefined' && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            captureAudioButton.textContent = "Capture Sound";
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                audio: true,
                video: true
            });

            // Diagnostic logs for the stream
            console.log("Acquired stream:", stream);
            console.log("Stream tracks:", stream.getTracks());

            mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });

            mediaRecorder.ondataavailable = onDataAvailable;
            mediaRecorder.onstop = onRecordingStop;
            mediaRecorder.onerror = (e) => {
                console.error("MediaRecorder Error:", e);
            };

            // Try starting without a timeslice first
            mediaRecorder.start();
            //mediaRecorder.start(chunkDuration - overlapDuration);

            console.log("MediaRecorder started:", mediaRecorder);

            captureAudioButton.textContent = "Stop Recording";
        } catch (err) {
            console.error('Error accessing the tab audio', err);
        }
    });
}

function onDataAvailable(event) {
    console.log("Data available event triggered", event);
    if (event.data.size > 0) {
        audioChunks.push(event.data);
    }
}

function onRecordingStop() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
    downloadBlob(audioBlob, 'captured_audio.webm');
    audioChunks = []; // Clear the array
}

function downloadBlob(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Rest of your code remains unchanged...


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




