import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/mongo.js";
import { authRouter } from "./routes/auth.route.js";
import { cardRouter } from "./routes/card.route.js";
import { resetRouter } from "./routes/reset.route.js";
import passport from "passport";
import session from "express-session";
import "./passport-setup.js"; // import the passport setup

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://react-smart-card-info.vercel.app",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api", cardRouter);
app.use("/api/auth", resetRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);


// Google login here
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful login → Redirect to frontend
    res.redirect(`${process.env.FRONTEND_URL}/home`);
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
