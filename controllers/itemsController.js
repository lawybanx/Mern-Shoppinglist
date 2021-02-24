// Bring in Model
const Item = require('../models/Item');

//  @route  GET api/items
//  @desc   Get All Items
//  @access Public

exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

//  @route  POST api/items
//  @desc   Create An Item
//  @access Private

exports.addItem = async (req, res, next) => {
  try {
    const item = await Item.create(req.body);

    return res.status(201).json({
      success: true,
      data: item,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

//  @route  DELETE api/items/:id
//  @desc   Delete An Item
//  @access Private

exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'No Item Found',
      });
    }

    await item.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
