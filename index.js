const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const serveStatic = require('serve-static');
const PORT = 4000;

// Set static folder
app.use(serveStatic('public'));

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

const users = {}

io.on('connection', (socket) => {
    console.log('valerian chat started.....')
    // Manage all socket.io events next...
    socket.on('new-connection', (data) => {
        console.log(`new-connection: ${data.username}`)

    socket.on('disconnect', () => {
        console.log(`user ${data.username} disconnected`);
    });

        // adds user to list
        users[socket.id] = data.username
        socket.emit('welcome', { user: data.username, message: `welcome to valerian chat:  ${data.username}` });
    })
    socket.on('new-message', (data) => {
        console.log(`new-message: ${data.message}`);
        // broadcast message to all sockets except the one that triggered the event
        socket.broadcast.emit('broadcast-message', {user: users[data.user], message: data.message})
    });
});
