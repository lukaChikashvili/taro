const express = require('express');
const { createUser, loginUser, logout, getCurrentProfile, createLanguage } = require('../controllers/action');
const { authenticate } = require('../middlewares/authHandler');
const router = express.Router();



router.route("/").post(createUser);
router.post("/auth", loginUser);
router.post('/logout', logout);
router.route('/profile').get(authenticate, getCurrentProfile);

// language routes
router.route('/language').post(authenticate, createLanguage);



module.exports = {routes: router}