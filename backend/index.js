import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import articleRouter from "./routes/articles.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB error: ", err);
  });

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from Express + Mongoose + CORS!");
});

// api routes
app.use("/api/articles", articleRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
