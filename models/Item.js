const mongoose = require('mongoose');
// Declare the Schema of the Mongo model
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = mongoose.model('Item', itemSchema);
