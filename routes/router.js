const express = require("express");
const consumer = require('../consumer');

const router = express.Router();

// Schema
const QueueItems = require('../models/Queue');

// Queue
let queue = [];

async function createQueue() {
  const items = await QueueItems.find({ active: false });
  queue = [...items];

  const processingInterval = setInterval(async () => {

    // process all messages
    while (queue.length > 0) {
      let job = queue.shift();

      // Process message from queue
      let restoredItem = await consumer.process(QueueItems, job);

      // Return item to queue if restored
      restoredItem ? queue.push(restoredItem) : null;
    }

    if (queue.length <= 0) {
      console.log('DONE')
      clearInterval(processingInterval);
    }
  }, 10000);

}

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


  setTimeout(() => {
    createQueue();
  }, 0);

  // Producer is sent messageId as confirmation
  return res.json({'messageId': savedItem.messageId});
});

module.exports = router;