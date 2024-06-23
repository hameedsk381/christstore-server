const express = require('express');
const { createMessage, getMessages, getMessageById } = require('../controllers/BibleMessagesController');

const router = express.Router();

router.post('/messages', createMessage);
router.get('/messages', getMessages);
router.get('/messages/:id', getMessageById);

module.exports = router;
