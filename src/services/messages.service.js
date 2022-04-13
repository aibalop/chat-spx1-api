const Message = require('../models/message.model');

exports.getMessages = async (conversationId) => {
    return Message.find({ conversationId }).sort({ createdAt: 1 });
};

exports.create = async (conversationId, userId, message) => {
    const newMessage = new Message({ conversationId, userId, message });
    return newMessage.save();
};