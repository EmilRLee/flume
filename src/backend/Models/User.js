const mongoose = require('mongoose');

const alert = mongoose.Schema({message: String});
const schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    fname: String,
    lname: String,
    isAdmin: Boolean,
    alerts: [alert] 
});

module.exports = mongoose.model("User", schema)