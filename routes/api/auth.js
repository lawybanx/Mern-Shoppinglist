const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require('../../controllers/usersController');
const auth = require('../../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/user').get(auth, getUser);

module.exports = router;
