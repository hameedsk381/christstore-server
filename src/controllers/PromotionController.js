// controllers/promotionController.js
const Promotion = require('../models/Promotion');

const getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch promotion data', error });
  }
};

const createPromotion = async (req, res) => {
  const { mobileImageUrl, desktopImageUrl, navigateUrl } = req.body;
  try {
    const promotion = new Promotion({ mobileImageUrl, desktopImageUrl, navigateUrl });
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create promotion', error });
  }
};

const updatePromotion = async (req, res) => {
  const { id } = req.params;
  const { mobileImageUrl, desktopImageUrl, navigateUrl } = req.body;
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      id,
      { mobileImageUrl, desktopImageUrl, navigateUrl },
      { new: true }
    );
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update promotion', error });
  }
};

const deletePromotion = async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByIdAndDelete(id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.status(200).json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete promotion', error });
  }
};

module.exports = {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
};
