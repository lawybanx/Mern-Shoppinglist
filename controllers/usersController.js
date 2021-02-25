const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Bring in Model
const User = require('../models/User');

//  @route  GET api/users
//  @desc   Fetch All Users
//  @access Public

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

//  @route  POST api/auth/login
//  @desc   Login user
//  @access Public

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User does not exists' });

    // Validating password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  @route  POST api/auth/register
//  @desc   Register new user
//  @access Public

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password)  {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create Salt & Hash password
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  @route  GET api/auth/user
//  @desc   Get user data
//  @access Private

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');

    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
