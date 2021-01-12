const io = require('socket.io')(8000, {cors: {origin: '*',}});
const express = require('express');
const path = require('path');
const app = express();
const port = 5500;
const localhost = '127.0.0.1';


app.get('/', (req, res) => {
    res.sendFile('index.html', {root:'C:/MY WORK/WebDovelopment/PROJECTS/Chat_App'});
});

const users = {};

io.on('connection', socket => {
    //if new user join the chat, let other users connected to know!
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    //if someone send a messages, Broadcast it to other users ! 
    socket.on('send', message => {
        socket.broadcast.emit('recive', {message: message, name: users[socket.id]});
    });
    //if someone left the chat, let others know ! 
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});


//  START THE SERVER   ------------->>>>>>>>>>>>
app.listen(port, () => {
    console.log(`Backend stated on http://${localhost}:${port}/Chat_App/index.html`);
});

