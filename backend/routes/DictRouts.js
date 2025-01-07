const express = require('express');
const router = express.Router();
const { createWord } = require('../controllers/DictAction')


router.route('/').post(createWord);






module.exports = {dictRoutes: router}