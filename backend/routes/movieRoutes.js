import express from "express";
const router = express.Router();
import { getMovies, getOneMovie, createMovie } from "../controllers/movieController.js";

// Route for getting all movies
router.route("/").get(getMovies);

// Route for creating a new movie (without image upload, base64 image data is passed)
router.post("/", createMovie);  // Using / instead of /upload as it's handled by createMovie now

// Route for getting a single movie by ID
router.get("/:id", getOneMovie);

export default router;
