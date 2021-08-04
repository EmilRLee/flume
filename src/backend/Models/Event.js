const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Event = new Schema({
    title: String,
    start: Date,
    end: Date,
    org: String,
    customer: String,
});

module.exports = mongoose.model('Event', Event);