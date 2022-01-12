// Node server which will handle socket io connection
const io = require('socket.io') (8000, {
    cors: {
        origin: "*",
    }
});
const users = {};
const cors = require('cors');

io.on('connection', socket => {
    //If any new user joins , let other users know
    socket.on('new-user-joined', userName =>{
        console.log("New user", userName);
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
    });

    socket.on('send', message =>{
        //If someone sends a message
        socket.broadcast.emit('receive' , {message: message , name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        //If someone leaves the chat
        socket.broadcast.emit('left' , users[socket.id]);
        delete users[socket.id];
    });
})