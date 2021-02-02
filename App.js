#!/usr/bin/env node

var http = require('http').createServer(),
io = require('socket.io')(http),
port = process.argv[2] || process.env.PORT || 3000;
io.on('connection', socket => {
socket.username = '';
socket.channel = '/';  
socket.on('join', ({ username, channel }) => {
socket.username = username;
socket.channel = channel;
socket.join(channel);
socket.emit('message', { user: 'Info', msg: 'Welcome to dev talk', channel: socket.channel });
console.log( username + 'at '+ channel +' connected');
socket.broadcast.to(channel).emit('message', { user: 'Info', msg: `${username} has joined` }); });
socket.on('message', ({ user, msg }) => socket.to(socket.channel).emit('message', { user: user, msg: msg }));
socket.on('disconnect', () => console.log('user disconnected'));
});
http.listen(port, () => console.log(`server listening on port: ${port}`))
