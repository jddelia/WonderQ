const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QueueSchema = new Schema({
  messageId: {
    type: Number
  },
  active: {
    type: Boolean
  },
  message: {
      type: String
  },
});

const QueueItems = mongoose.model('QueueItems', QueueSchema);

module.exports = QueueItems;