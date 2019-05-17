const consumer = require('./consumer');

const QueueItems = require('./models/Queue');

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
  }, 8000);
}

module.exports = createQueue;