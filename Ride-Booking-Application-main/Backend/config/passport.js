const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user-model");
const Caption = require("../models/caption-model");

// USER STRATEGY
passport.use("google-user", new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback/user"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName: {
          firstName: profile.name.givenName || "Google",
          lastName: profile.name.familyName || "User",
        },
        email,
        password: "GOOGLE_AUTH",
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// CAPTION STRATEGY
passport.use("google-caption", new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback/caption"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let caption = await Caption.findOne({ email });
    if (!caption) {
      caption = await Caption.create({
        fullName: {
          firstName: profile.name.givenName || "Google",
          lastName: profile.name.familyName || "Caption",
        },
        email,
        password: "GOOGLE_AUTH",
        vehicle: {
          vehicleNumber: "XXXXXXXXXX",
          vehicleType: "car"
        }
      });
    }
    return done(null, caption);
  } catch (err) {
    return done(err, null);
  }
}));
