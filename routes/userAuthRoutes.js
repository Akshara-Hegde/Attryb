const express = require("express");
const { userLogin, userSignup } = require("../controller/usercontroller");

const router = express.Router();

router.route('/signup').post( userSignup)
router.route('/login').post( userLogin);

module.exports = router
