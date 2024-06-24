// models/Word.js
const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String },
}, { timestamps: true });

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
