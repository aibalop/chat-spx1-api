const Conversation = require('../models/conversation.model');
const messagesService = require('../services/messages.service');

exports.create = async (senderUserId, recipientUserId, message) => {

    const existingConversation = await Conversation.findOne({
        $or: [
            { userOneId: senderUserId, userTwoId: recipientUserId },
            { userOneId: recipientUserId, userTwoId: senderUserId },
        ]
    });

    if (existingConversation) {
        throw new Error('Ya existe una conversación entre los dos usuarios');
    }

    let conversation = null;

    try {
        conversation = new Conversation({ userOneId: senderUserId, userTwoId: recipientUserId });
        await conversation.save();
    } catch (error) {
        throw error;
    }

    try {
        await messagesService.create(conversation._id, senderUserId, message);
    } catch (error) {
        await Conversation.deleteOne({ _id: conversation._id });
        throw error;
    }

    return conversation;

};