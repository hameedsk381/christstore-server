const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  heading1: { type: String, required: true },
  heading2: { type: String, required: true },
  writer: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  aboutAuthor: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const BibleMessages = mongoose.model('BibleMessages', messageSchema);

module.exports = BibleMessages;
