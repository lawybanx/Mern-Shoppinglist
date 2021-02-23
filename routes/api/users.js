const express = require('express');
const router = express.Router();
const { registerUser, getUsers } = require('../../controllers/usersController');

router.route('/').get(getUsers).post(registerUser);

module.exports = router;
