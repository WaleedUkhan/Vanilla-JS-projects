let ws;
let userName;

document.getElementById("joinBtn").addEventListener("click", joinChat);

function joinChat() {
  userName = document.getElementById("usernameInput").value.trim();

  if (userName) {
    // Hide authentication and show chat components
    document.getElementById("authContainer").style.display = "none";
    document.getElementById("chatHeader").style.display = "block";
    document.getElementById("chatWindow").style.display = "block";
    document.getElementById("inputArea").style.display = "flex";

    // Establish WebSocket connection
    ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      ws.send(userName); // Send the username as the first message
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.onmessage = (event) => {
      console.log("Received from server:", event.data);
      displayMessage(event.data); // Display the received message
    };

    document.getElementById("sendBtn").addEventListener("click", sendMessage);
    document
      .getElementById("messageInput")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      });
  } else {
    alert("Please enter a username.");
  }
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();

  if (message) {
    ws.send(message);
    displayMessage(`${userName}: ${message}`, true); // Display the sent message
    input.value = ""; // Clear the input field
  }
}

function displayMessage(message, isUser = false) {
  const messagesDiv = document.getElementById("messages");
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add("message");

  if (isUser) {
    messageElement.classList.add("user-message"); // Apply different style for user messages
  } else {
    messageElement.classList.add("received-message"); // Apply different style for received messages
  }

  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom of the chat window
}
