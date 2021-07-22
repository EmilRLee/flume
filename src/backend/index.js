const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Controllers/routes');
const cors = require('cors');

mongoose.connect("mongodb://localhost:27017/flume", { useNewUrlParser: true})
    .then(() => {
        const app = express();
        app.use(cors());
        app.use("/api", routes)

        app.listen(3001, () => console.log("express api server started! and db connection success"));
    })



