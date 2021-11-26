const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);


const path = require("path");

const PORT = process.env.PORT ?? 3000

app.use(express.static(path.resolve(__dirname, 'client')))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', (socket) => {
    socket.on('score', (p1, p2, tot1, tot2, move, isMove) => {
        io.emit('score', {p1, p2, tot1, tot2, move, isMove});
    });
    socket.on('disconnect', () => {
    });
});


server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} ...`)
    console.log('http://localhost:3000/')
});


