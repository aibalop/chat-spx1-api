const Message = require('../models/message.model');

exports.create = async (conversationId, userId, message) => {
    const newMessage = new Message({ conversationId, userId, message });
    return newMessage.save();
};