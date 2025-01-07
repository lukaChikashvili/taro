const express = require('express');
const formidable = require('express-formidable');
const { createBook, allBooks } = require('../controllers/bookAction');
const { authenticate } = require('../middlewares/authHandler');
const router = express.Router();



router.route('/createpdf').post(authenticate,  formidable(), createBook);
router.route('/').get(allBooks);

module.exports = {bookRoutes: router}