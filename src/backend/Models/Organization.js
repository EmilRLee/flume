const mongoose = require('mongoose');

const orgs = mongoose.Schema({
    name: String,
    hq: String,
    isPremium: Boolean,
    users: [String],
    customers: [String]
});

module.exports = mongoose.model("orgs", orgs);