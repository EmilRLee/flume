const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Controllers/routes');
const bodyParser = require('body-parser');
const cors = require('cors');


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
            console.log('WOWO'); // ojIckSD2jqNzOqIrAGzL
            socket.emit('message', "hello")
        })
        app.set('socketio', io);
        
        server.listen(3001, () => {
            console.log("express api server started! and db connection success")
           console.log("socket.io is listening on aswell")
        });

    });

