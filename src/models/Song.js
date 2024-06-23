// models/Song.js
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  ragaam: { type: String, required: true },
  taalam: { type: String, required: true },
  chaaya: { type: String, required: true },
  rachayitha: { type: String, required: true },
  anuvaadam: { type: String, required: true },
  paata: { type: String, required: true },
  fileUrl: { type: String , default : null},
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Song', songSchema);
