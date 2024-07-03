// models/Promotion.js
const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  mobileImageUrl: { type: String, required: true },
  desktopImageUrl: { type: String, required: true },
  navigateUrl: { type: String, required: true },
}, { timestamps: true });

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
