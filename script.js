// ===============================
// Elements
// ===============================

const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
const input = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");

// ===============================
// Send Button
// ===============================

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// ===============================
// Speech Recognition
// ===============================

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    alert("Speech Recognition is not supported in this browser.\nUse Google Chrome or Microsoft Edge.");

} else {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";          // Indian English
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    // Click Mic
    micBtn.addEventListener("click", () => {

        recognition.start();

    });

    // Recognition Started
    recognition.onstart = () => {

        console.log("Listening...");

        input.placeholder = "🎤 Listening...";

        micBtn.classList.remove("bg-slate-800");
        micBtn.classList.add("bg-red-600");

    };

    // Live Speech
    recognition.onresult = (event) => {

        let transcript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {

            transcript += event.results[i][0].transcript;

        }

        input.value = transcript;

        console.log("Transcript:", transcript);

    };

    // Recognition Finished
    recognition.onend = () => {

        console.log("Recognition Ended");

        input.placeholder = "Type your message...";

        micBtn.classList.remove("bg-red-600");
        micBtn.classList.add("bg-slate-800");

    };

    // Errors
    recognition.onerror = (event) => {

        console.log("Speech Error:", event.error);

        input.placeholder = "Type your message...";

        micBtn.classList.remove("bg-red-600");
        micBtn.classList.add("bg-slate-800");

        switch (event.error) {

            case "no-speech":
                alert("No speech detected. Please speak louder.");
                break;

            case "audio-capture":
                alert("No microphone found.");
                break;

            case "not-allowed":
                alert("Please allow microphone permission.");
                break;

            default:
                alert("Speech Recognition Error : " + event.error);

        }

    };

}

// ===============================
// Send Message
// ===============================

function sendMessage() {

    const message = input.value.trim();

    if (message === "") return;

    const messageDiv = document.createElement("div");

    messageDiv.className = "flex justify-end";

    messageDiv.innerHTML = `
        <div class="bg-indigo-600 rounded-2xl p-5 max-w-lg shadow-xl">
            <p class="text-white">${message}</p>
        </div>
    `;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";

}