const Message = require('../models/Message.js');
const messageController = {
  // Create a message 
  //[POST]/
  createMessage: async (req, res) => {
    const {
      chatID,
      senderID,
      text
    } = req.body;
    const newMess = new Message({
      chatID: chatID,
      senderID: senderID,
      text: text
    });
    try {
      const messsave = await newMess.save();
      res.status(200).json(messsave);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Get messages
  //[GET]/:chatID
  getMessage: async (req, res) => {
    const chatID = req.params.chatID;
    try {
      const message = await Message.find({
        chatID: chatID
      });
      res.status(200).json(message);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
module.exports = messageController;