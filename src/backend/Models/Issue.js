const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const IssueSchema = new Schema({
    description: String,
    status: String,
    createdAt: Date,
    assignee: String,
    customer: String
});

module.exports = mongoose.model('Issue', IssueSchema);