const express = require('express');
const { createUser } = require('../controllers/action');
const router = express.Router();



router.route("/").post(createUser);


module.exports = {routes: router}