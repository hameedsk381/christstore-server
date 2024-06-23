const BibleMessages = require("../models/BibleMessages");


exports.createMessage = async (req, res) => {
  try {
    const newMessage = new BibleMessages(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: 'Error creating message', error });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await BibleMessages.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching messages', error });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await BibleMessages.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching message', error });
  }
};
