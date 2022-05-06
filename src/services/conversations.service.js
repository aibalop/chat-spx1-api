const Conversation = require("../models/conversation.model");
const messagesService = require("../services/messages.service");
const { Types } = require("mongoose");

exports.getAll = async (query) => {
  const condition = {};

  if (query.userId) {
    condition["$or"] = [
      { userOneId: Types.ObjectId(query.userId) },
      { userTwoId: Types.ObjectId(query.userId) },
    ];
  }

  return Conversation.aggregate([
    {
      $match: condition,
    },
    {
      $lookup: {
        from: "users",
        localField: "userOneId",
        foreignField: "_id",
        as: "userOneId",
      },
    },
    {
      $unwind: "$userOneId",
    },
    {
      $lookup: {
        from: "users",
        localField: "userTwoId",
        foreignField: "_id",
        as: "userTwoId",
      },
    },
    {
      $unwind: "$userTwoId",
    },
    {
      $lookup: {
        from: "messages",
        let: { conversationId: "$_id" },
        pipeline: [
          { $match: { $expr: { conversationId: "$$conversationId" } } },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
          {
            $project: {
              _id: 1,
              message: 1,
              createdAt: 1,
            },
          },
        ],
        as: "lastMessage",
      },
    },
    {
      $unwind: "$lastMessage",
    },
    {
      $sort: { updatedAt: -1 },
    },
  ]);
};

exports.getById = async (_id) => {
  return Conversation.findById(_id).populate("userOneId").populate("userTwoId");
};

exports.getByUserOneAndUserTwo = async (userOneId, userTwoId) => {
  return Conversation.findOne({
    $or: [
      { userOneId, userTwoId },
      { userOneId: userTwoId, userTwoId: userOneId },
    ],
  })
    .populate('userOneId', '_id name lastName username')
    .populate('userTwoId', '_id name lastName username');
};

exports.create = async (senderUserId, recipientUserId, message) => {
  const existingConversation = await Conversation.findOne({
    $or: [
      { userOneId: senderUserId, userTwoId: recipientUserId },
      { userOneId: recipientUserId, userTwoId: senderUserId },
    ],
  });

  if (existingConversation) {
    throw new Error("Ya existe una conversación entre los dos usuarios");
  }

  let conversation = null;

  try {
    conversation = new Conversation({
      userOneId: senderUserId,
      userTwoId: recipientUserId,
    });
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

