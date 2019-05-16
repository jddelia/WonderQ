const express = require("express");
const createQueue = require('../queue');

const router = express.Router();

// Schema
const QueueItems = require('../models/Queue');

// Routes
// Get all items in queue
router.get('/items/all', (req, res) => {
  QueueItems.find({})
    .then((items) => {
      res.send(items);
    });
});

// Get all processing items
router.get('/items/active', (req, res) => {
  QueueItems.find({ active: true })
    .then((items) => {
      res.send(items);
    });
});

// Add item to queue
router.post('/new/message', async (req, res) => {
  // Create random id for messageId
  let id = Math.floor(Math.random() * 10000);

  let item = new QueueItems({
    messageId: id,
    active: false,
    message: req.body.message
  });

  console.log(`messageId: ${id}\nmessage: ${req.body.message}`);

  // Save item to, send as confirmation
  const savedItem = await item.save();

  // Put function in callback queue
  setTimeout(() => {
    createQueue();
  }, 0);

  // Producer is sent messageId as confirmation
  return res.json({'messageId': savedItem.messageId});
});

module.exports = router;