const express = require("express");
const router = express.Router();
const {body} = require("express-validator");

const userController = require("../controller/user-controller")
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/register",
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullName.firstName').isLength({min: 3}).withMessage('First Name must be atleast 3 characters long'),
    body('password').isLength({min : 6}).withMessage("Password Must be at least 6 characters long") 
,userController.handleUserRegister)

router.post("/login",
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min : 6}).withMessage("Password Must be at least 6 characters long")
,userController.handleUserLogin)

router.get("/profile", authMiddleware.authUser, userController.handleGetUserProfile);

router.get("/logout", authMiddleware.authUser, userController.handleUserLogout);

module.exports = router;