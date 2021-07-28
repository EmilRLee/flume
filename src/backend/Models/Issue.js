const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const IssueSchema = new Schema({
    title: String,
    description: String,
    status: String,
    createdAt: Date,
    assignee: String,
    customer: String
});

module.exports = mongoose.model('Issue', IssueSchema);