const conversationsService = require('../services/conversations.service');
const messagesService = require('../services/messages.service');

exports.getById = async (req, res) => {
    try {
        const conversation = await conversationsService.getById(req.params.conversationId);
        if (!conversation) {
            return res.status(404).json({ message: 'No se encontro la conversación' });
        }
        res.status(200).json(conversation);
    } catch (error) {
        res.status(400).json({ message: error.toString() });
    }
};

exports.createMessage = async (req, res) => {
    try {
        const conversation = await conversationsService.getById(req.params.conversationId);
        if (!conversation) {
            return res.status(404).json({ message: 'No se encontro la conversación' });
        }
        const { message } = req.body;
        const { _id: userId } = req.payload;
        if (!userId) {
            throw new Error('No se indentifica el usuario que hace la petición');
        }
        if (!message || !message.trim()) {
            throw new Error('No se encontro un mensaje que enviar');
        }
        const messageCreated = await messagesService.create(conversation._id, userId, message);
        res.status(201).json(messageCreated);
    } catch (error) {
        res.status(400).json({ message: error.toString() });
    }
};

