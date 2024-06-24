// routes/promotionRoutes.js
const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/PromotionController');

router.get('/promotions', promotionController.getPromotions);
router.post('/addpromotion', promotionController.createPromotion);
router.put('promotions/:id', promotionController.updatePromotion);
router.delete('promotions/:id', promotionController.deletePromotion);

module.exports = router;
