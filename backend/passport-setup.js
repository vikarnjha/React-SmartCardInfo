import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/user.model.js"
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value.toLowerCase(); // Google provides email here
        let user = await User.findOne({ email });

        if (user) {
          // ✅ User already exists
          if (!user.googleId) {
            // If the user is registered via email/password and doesn't have a googleId, link it
            user.googleId = profile.id;
            await user.save(); // Save the googleId to the existing user
          }
          return done(null, user);
        } else {
          // ❌ No user found, create new
          user = new User({
            name: profile.displayName,
            email: email,
            googleId: profile.id,
          });
          await user.save({ validateBeforeSave: false }); // Since no password
          return done(null, user);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
