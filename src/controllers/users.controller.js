const usersService = require('../services/users.service');
const conversationsService = require('../services/conversations.service');

exports.create = async (req, res) => {
  try {
    const newUser = await usersService.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.toString() });
  }
};

exports.getAll = async (req, res) => {
  try {
    const query = req.query ?? {};
    query['ignoreId'] = req.payload?._id;
    const users = await usersService.getAll(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.toString() });
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const query = req.query ?? {};
    query['userId'] = req.params.userId;
    const conversations = await conversationsService.getAll(query);
    res.status(200).json(conversations);
  } catch (error) {
    res.status(400).json({ message: error.toString() });
  }
};

exports.createConversation = async (req, res) => {
  try {
    const { userId: senderUserId } = req.params;
    const { recipientUserId, message } = req.body;
    if (!recipientUserId || !message) {
      throw new Error('Campos faltantes (destinatario o mensaje)');
    }
    const conversation = await conversationsService.create(
      senderUserId,
      recipientUserId,
      message
    );
    res.status(201).json(conversation);
  } catch (error) {
    res.status(400).json({ message: error.toString() });
  }
};
