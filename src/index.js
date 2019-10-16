const path = require('path');
const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

const points = [];

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', '/public', 'index.html')));

io.on('connection', socket => {
    io.emit('getPoints', points);
    socket.on('addPoint', ({x, y, fill, size}) => {
        if (points[y]) {
            points[y][x] = {fill, size};
        } else {
            points[y] = [];
            points[y][x] = {fill, size};
        }
        io.emit('getPoint', {x, y, fill, size});
    });
    socket.on('disconnect', () => console.log('user disconnected'));
});


http.listen(port, () => console.log(`Server on ${port} port`));
