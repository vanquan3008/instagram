const Conversation = require('../models/Conversation.js');
const ConversationController = {
  //Get conversation
  //[POST]/
  createConversation: async (req, res) => {
    const {
      senderid,
      reciverid
    } = req.body;
    const Conv = await Conversation.findOne({
      members: {
        $all: [senderid, reciverid]
      }
    });
    try {
      if (Conv === null) {
        const newCov = new Conversation({
          members: [senderid, reciverid]
        });
        const response = await newCov.save();
        return res.status(200).json(response);
      } else {
        return res.status(200).json(Conv);
      }
    } catch (err) {
      res.status(500).json({
        message: "Error creating conversation"
      });
    }
  },
  //Find user chat 
  //[GET]/:userID
  findUserChat: async (req, res) => {
    const userChat = req.params.userID;
    try {
      const chats = await Conversation.find({
        members: {
          $in: [userChat]
        }
      });
      res.status(200).json(chats);
    } catch (err) {
      res.status(500).json({
        message: "Error"
      });
    }
  },
  // Get chat rooms included 2 User 
  //[GET]/find/:findUserID/:secondUserID
  findConversations: async (req, res) => {
    const {
      firstUserID,
      secondUserID
    } = req.params;
    try {
      const Conv = await Conversation.findOne({
        members: {
          $all: [firstUserID, secondUserID]
        }
      });
      res.status(200).json(Conv);
    } catch (err) {
      res.status(500).json({
        message: "Not Found conversation"
      });
    }
  }
};
module.exports = ConversationController;