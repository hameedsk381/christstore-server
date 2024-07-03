// routes/songs.js
const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');

router.post('/uploadsong', songsController.uploadSong);
router.get('/songs', songsController.getSongs);
router.get('/songs/:id', songsController.getSongById);
router.put('/songs/:id', songsController.updateSong);
router.delete('/songs/:id', songsController.deleteSong);

module.exports = router;
