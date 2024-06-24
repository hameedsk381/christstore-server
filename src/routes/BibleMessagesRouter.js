const express = require('express');
const { createMessage, getMessages, getMessageById, updateMessage, deleteMessage } = require('../controllers/BibleMessagesController');

const router = express.Router();

router.post('/messages', createMessage);
router.get('/messages', getMessages);
router.get('/messages/:id', getMessageById);
router.delete('/messages/:id', updateMessage);
router.put('/messages/:id', deleteMessage);
module.exports = router;
