const express = require('express');
const { createUser, loginUser, logout } = require('../controllers/action');
const router = express.Router();



router.route("/").post(createUser);
router.post("/auth", loginUser);
router.post('/logout', logout);


module.exports = {routes: router}