import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(
  cors({
    origin: "*", // Use specific origins in production for better security
  })
);

// Increase payload size limits for large base64 images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes); // Changed route to avoid conflicts with "/api/movies"
app.use("/api/users", userRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("Currently in dev mode");
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
