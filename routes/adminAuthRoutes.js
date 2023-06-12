const express = require("express");
const { adminLogin, adminSignup } = require("../controller/adminController");

const router = express.Router();

router.route('/signup').post( adminSignup)
router.route('/login').post( adminLogin);

module.exports = router
