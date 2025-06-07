const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../controllers/authController");


router.post("/signup",  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Valid email required").isEmail(),
    check("password", "Password must be 6+ chars").isLength({ min: 6 }),
  ], auth.signup);
  //logins
router.post("/login", auth.login);

//to use the router object in other files like app.js
module.exports = router;