// server.js

const WebSocket = require('ws');

// Create a new WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Listen for connection events
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Listen for messages from the client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Echo the message back to the client
        ws.send(`You Said: ${message}`);
    });

    // Listen for when the client disconnects
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
