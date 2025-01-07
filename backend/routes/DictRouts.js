const express = require('express');
const router = express.Router();
const { createWord, getAllWords, deleteWord } = require('../controllers/DictAction')


router.route('/').post(createWord).get(getAllWords);
router.route('/:id').delete(deleteWord);






module.exports = {dictRoutes: router}