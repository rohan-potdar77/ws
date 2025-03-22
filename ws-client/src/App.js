import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
	const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState('');

	useEffect(() => {
		// Connect to the WebSocket server
		const ws = new WebSocket('wss://localhost:4000');

		// Set the WebSocket instance to state
		setSocket(ws);

		// Log connection status
		ws.onopen = () => {
			console.log('Connected to WebSocket server');
		};

		// Handle incoming messages
		ws.onmessage = event => {
			console.log('Message from server:', event.data);
			setMessages(prevMessages => [...prevMessages, `Server: ${event.data}`]);
		};

		// Log errors
		ws.onerror = error => {
			console.error('WebSocket Error:', error);
		};

		// Handle connection close
		ws.onclose = () => {
			console.log('Disconnected from WebSocket server');
		};

		// Cleanup WebSocket connection on component unmount
		return () => {
			ws.close();
		};
	}, []);

	const sendMessage = () => {
		if (socket && inputMessage.trim() !== '') {
			socket.send(inputMessage); // Send the input message to the server
			setMessages(prevMessages => [...prevMessages, `You: ${inputMessage}`]); // Add to message history
			setInputMessage(''); // Clear the input field
		}
	};

	const getUpdate = async () => {
		try {
			const response = await fetch('https://localhost:4000', {
				method: 'POST',
				body: JSON.stringify({ message: 'Fuck You!' }),
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors'
			});
			console.log(response);
			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div style={{ textAlign: 'center', marginTop: '50px' }}>
			<h1>WebSocket React Client</h1>
			<div style={{ marginBottom: '20px' }}>
				<input
					type="text"
					placeholder="Type a message"
					value={inputMessage}
					onChange={e => setInputMessage(e.target.value)}
					style={{
						padding: '10px',
						width: '300px',
						marginRight: '10px'
					}}
				/>
				<button onClick={sendMessage} style={{ padding: '10px 20px' }}>
					Send
				</button>
				<button onClick={getUpdate} style={{ padding: '10px 20px' }}>
					Get Update
				</button>
			</div>
			<div
				style={{
					border: '1px solid #ccc',
					padding: '10px',
					width: '400px',
					margin: '0 auto',
					height: '200px',
					overflowY: 'scroll',
					textAlign: 'left'
				}}
			>
				<h3>Messages:</h3>
				{messages.map((msg, index) => (
					<p key={index} style={{ margin: '5px 0' }}>
						{msg}
					</p>
				))}
			</div>
		</div>
	);
};

export default App;
