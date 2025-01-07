const express = require('express');
const router = express.Router();
const { createWord, getAllWords } = require('../controllers/DictAction')


router.route('/').post(createWord).get(getAllWords);






module.exports = {dictRoutes: router}