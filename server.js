const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Servir les fichiers statiques du dossier public
app.use(express.static('public'));

// Route principale pour le site web
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour l'overlay OBS
app.get('/overlay', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'overlay.html'));
});

io.on('connection', (socket) => {
    console.log('🔌 Nouveau client connecté');

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`🏠 Client a rejoint la room : ${roomId}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Serveur ApexFlow en ligne sur le port ${PORT}`);
});
