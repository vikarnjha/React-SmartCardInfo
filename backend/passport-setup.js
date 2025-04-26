import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/user.model.js";
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
          // Generate a JWT token here
          const token = jwt.sign(
            { name: user.name, email: user.email, googleId: user.googleId },
            process.env.JWT_SECRET, // Use your secret key
            { expiresIn: "24h" } // Token expiration (e.g., 1 hour)
          );
          return done(null, { user, token });
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
            process.env.JWT_SECRET, // Use your secret key
            { expiresIn: "24h" } // Token expiration
          );
          return done(null, { user, token });
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
