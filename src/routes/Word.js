// routes/wordRoutes.js
const express = require('express');
const router = express.Router();
const { getAllWords, getWordById, createWord, updateWord, deleteWord } = require('../controllers/WordController');

router.get('/words', getAllWords);
router.get('/words/:id', getWordById);
router.post('/words', createWord);
router.put('/words/:id', updateWord);
router.delete('/words/:id', deleteWord);

module.exports = router;
