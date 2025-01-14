const express = require('express');
const router = express.Router();
const { createUser, loginUser, logout, getCurrentProfile, createLanguage, langList, deleteLang, getLangsById } = require('../controllers/action');
const { authenticate } = require('../middlewares/authHandler');




router.route("/").post(createUser);
router.post("/auth", loginUser);
router.post('/logout', logout);
router.route('/profile').get(authenticate, getCurrentProfile);

// language routes
router.route('/language').post(authenticate, createLanguage).get(langList);
router.route('/language/:id').get(getLangsById).delete(deleteLang);




module.exports = {routes: router}