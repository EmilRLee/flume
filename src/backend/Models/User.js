const mongoose = require('mongoose');

const alert = mongoose.Schema({message: String});
const schema = mongoose.Schema({
    username: String,
    email: String,
    fname: String,
    lname: String,
    isAdmin: Boolean,
    alerts: [alert]
});

module.exports = mongoose.model("User", schema)