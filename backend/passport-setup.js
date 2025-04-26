import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/user.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://react-smartcardinfo.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value.toLowerCase(); // Google provides email here
        let user = await User.findOne({ email });

        if (user) {
          if (!user.googleId) {
            // If the user is registered via email/password and doesn't have a googleId, link it
            user.googleId = profile.id;
            await user.save(); // Save the googleId to the existing user
          }

          // Generate a JWT token here
          const token = jwt.sign(
            { name: user.name, email: user.email, googleId: user.googleId },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          // Return user and token in a separate response
          return done(null, user); // Pass the user to Passport
        } else {
          // Create new user if they don't exist
          user = new User({
            name: profile.displayName,
            email: email,
            googleId: profile.id,
          });
          await user.save({ validateBeforeSave: false });

          // Generate a JWT token for the new user
          const token = jwt.sign(
            { name: user.name, email: user.email, googleId: user.googleId },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          // Return user and token in a separate response
          return done(null, user); // Pass the user to Passport
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user for session management (you may not need this if you're not using sessions)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user by id
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
