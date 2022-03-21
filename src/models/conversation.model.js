const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    userOneId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    userTwoId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema, 'conversations');