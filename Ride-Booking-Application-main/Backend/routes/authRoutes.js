const express = require("express");
const passport = require("passport");
const authController = require("../controller/authController");

const router = express.Router();

// Initial request to Google (USER)
router.get("/google/user", passport.authenticate("google-user", { scope: ["profile", "email"] }));

// Callback for USER
router.get(
  "/google/callback/user",
  passport.authenticate("google-user", { failureRedirect: "/user-login", session: false }),
  authController.userGoogleCallback
);

// Initial request to Google (CAPTION)
router.get("/google/caption", passport.authenticate("google-caption", { scope: ["profile", "email"] }));

// Callback for CAPTION
router.get(
  "/google/callback/caption",
  passport.authenticate("google-caption", { failureRedirect: "/caption-login", session: false }),
  authController.captionGoogleCallback
);

module.exports = router;
