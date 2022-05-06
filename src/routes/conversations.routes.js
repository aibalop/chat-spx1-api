const router = require("express").Router();
const conversationsController = require("../controllers/conversations.controller");
const jwtRequired = require("../middlewares/jwt-required.middleware");

const prefix = "conversations";

router
  .route(`/${prefix}/:conversationId`)
  .get(jwtRequired, conversationsController.getById);

router
  .route(`/${prefix}/:conversationId/messages`)
  .get(jwtRequired, conversationsController.getMessages)
  .post(jwtRequired, conversationsController.createMessage);

router
  .route(`/${prefix}/user-two/:userId`)
  .get(jwtRequired, conversationsController.getConversationWithUser);

module.exports = router;

