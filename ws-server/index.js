import express from 'express';
import fs from 'fs';
import https from 'https';
import { WebSocketServer } from 'ws';
import cors from 'cors';

const app = express();

// Load SSL certificates
const sslOptions = {
	key: fs.readFileSync('./ssl/server.key'),
	cert: fs.readFileSync('./ssl/server.crt')
};

// Create an HTTPS server
const server = https.createServer(sslOptions, app);

// Initialize WebSocket server
const wss = new WebSocketServer({ server });

// When a WebSocket client connects
wss.on('connection', ws => {
	setInterval(() => {
		ws.send('Message is sending after every 5000ms!');
	}, 5000);

	ws.on('close', () => {
		console.log('A client disconnected!');
	});
});

app.use(cors());
app.use(express.json());

app.post('/', async (req, res, next) => {
	try {
		const { message } = req.body;
		wss.clients.forEach(client => {
			if (client.readyState === 1) {
				client.send(message, error => console.error(error));
			}
		});
		res.status(200).json({ message: 'Api hit!' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/', async (req, res, next) => {
	try {
		res.status(200).send('Hello World!');
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Start the server on port 4000
server.listen(4000, () => {
	console.log('WebSocket server is running on https://localhost:4000');
});
