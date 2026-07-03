const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");

if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
}

if (input) {
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}

function sendMessage() {
    if (!input) return;

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