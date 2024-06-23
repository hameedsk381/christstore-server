// routes/songs.js
const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');


router.post('/uploadsong', songsController.uploadSong);
router.get('/songs', songsController.getSongs);


module.exports = router;
