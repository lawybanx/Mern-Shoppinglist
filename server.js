const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect MongoDB at default port 27017.
mongoose.connect(
  config.database,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded.');
    } else {
      console.log('Error in DB connection: ' + err);
    }
  }
);

// Express Init
const app = express();

// Static Folder
// app.use(express.static(path.join(__dirname, 'public')));

// Body-parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use('/api/items', require('./routes/api/items'));

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
