const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin-controller");
const {body} = require("express-validator");

router.post("/login",
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6 }).withMessage("Password Must be at least 6 characters long"),
    adminController.handleAdminLogin
)


module.exports = router;