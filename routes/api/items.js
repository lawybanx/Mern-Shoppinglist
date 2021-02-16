const express = require('express');
const router = express.Router();

// Bring in Model
const Item = require('../../models/Item');

//  @route  GET api/items
//  @desc   Get All Items
//  @access Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//  @route  POST api/items
//  @desc   Create An Item
//  @access Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

//  @route  DELETE api/items/:id
//  @desc   Delete An Item
//  @access Public
router.delete('/:id', (req, res) => {
  const query = { _id: req.params.id };

  Item.deleteOne(query, (err) => {
    if (!err) {
      res.json({ success: true });
    }
    res.status(404).json({ success: false });
  });
});

module.exports = router;
