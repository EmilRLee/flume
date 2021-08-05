const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Controllers/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const Message = require('./Models/Message')


mongoose.connect("mongodb://localhost:27017/flume", { useNewUrlParser: true})
    .then(() => {
        const app = express();
        const server = require('http').createServer(app);
        const io = require('socket.io')(server, {
            cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
          }});
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json())
        app.use(cors());
        app.use(routes)

        io.on('connection', (socket) => {
            socket.on('join', (room) => {
                if(room){
                    socket.join(room)
                    console.log(room)
                }
            })
            socket.on('newMessage', async ({name, room, message}) => {
                console.log("got newMessage")
                const newMessage = new Message({name, room, message});
                await newMessage.save();
                io.in(room).emit("message", {name, room, message})
            })
        })
        app.set('socketio', io);
        
        server.listen(3001, () => {
            console.log("express api server started! and db connection success")
           console.log("socket.io is listening on aswell")
        });

    });

