// import express from 'express';
// import cors from 'cors';
// import router from './routes.js';

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/ball-tracker", router);

// const PORT = 8080;
// app.listen(PORT, () => { console.log(`server is running at port: ${PORT}`); });

///////////////////////////////////////////////////////////////////////////////////////////////

import express from 'express';
import http from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { handleWebSocketMessages } from './controller.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
    console.log('Client connected to WebSocket');
    ws.on('message', function incoming(message) {
        console.log('Received message from client:', message);
        handleWebSocketMessages(ws, message);
    });
    ws.on('close', function () {
        console.log('Client disconnected from WebSocket');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});
