const express = require('express');
const { createUser, loginUser, logout, getCurrentProfile } = require('../controllers/action');
const { authenticate } = require('../middlewares/authHandler');
const router = express.Router();



router.route("/").post(createUser);
router.post("/auth", loginUser);
router.post('/logout', logout);
router.route('/profile').get(authenticate, getCurrentProfile);


module.exports = {routes: router}