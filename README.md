# WebSocket Connection in React and Node.js

This project demonstrates how to set up and use WebSocket connections in a React frontend and a Node.js backend. It provides a simple yet effective example of real-time communication using WebSockets.

## Features
- Establish WebSocket connection between React and Node.js
- Send and receive real-time messages
- Simple and lightweight implementation
- Easily extendable for other real-time use cases

## Technologies Used
- **Frontend:** React.js (with WebSockets API)
- **Backend:** Node.js with WebSocket library (ws)

## Getting Started
Follow these steps to set up and run the project locally.

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
#### 1. Clone the Repository
```sh
git clone https://github.com/rohan-potdar77/ws.git
cd ws
```
#### 2. Install Backend Dependencies
```sh
cd ws-server
npm install
```
#### 3. Install Frontend Dependencies
```sh
cd ../ws-client
npm install
```

## Running the Application
#### Start the Backend Server
```sh
cd ws-server
node index.js
```
#### Start the Frontend Application
```sh
cd ../ws-client
npm start
```

## Project Structure
```
ws/
│── ws-server/            # Backend (Node.js + WebSocket)
│   ├── index.js          # WebSocket server setup
│   ├── package.json      # Dependencies and scripts
│
│── ws-client/            # Frontend (React.js)
│   ├── src/
│   │   ├── App.js        # WebSocket implementation in React
│   │   ├── index.js      # React entry point
│   ├── package.json      # Dependencies and scripts
│
└── README.md             # Project documentation
```

## How It Works
1. The Node.js server sets up a WebSocket server and listens for incoming connections.
2. The React frontend connects to the WebSocket server.
3. Messages are exchanged in real time between the client and server.

## Extending the Project
- Add authentication for secure connections
- Implement chat history using a database
- Extend support for multiple clients

## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, feel free to reach out!

Happy Coding! 🚀

