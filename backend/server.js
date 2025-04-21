import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/mongo.js";
import {authRouter} from "./routes/auth.route.js"
import {cardRouter} from "./routes/card.route.js"


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
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
