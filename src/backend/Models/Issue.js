const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const IssueSchema = new Schema({
    title: String,
    description: String,
    status: String,
    customer: String,
    assignee: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Issue', IssueSchema);