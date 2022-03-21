const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: { type: mongoose.Schema.ObjectId, ref: 'Conversation', required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema, 'messages');