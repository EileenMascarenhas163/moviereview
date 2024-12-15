import express from "express";
const router = express.Router();
import {createReview, getReviewsForMovie, getReviewById} from "../controllers/reviewController.js";

router.post("/review/:id", createReview);
router.get("/reviews/:id", getReviewsForMovie);
router.get("/review/:id", getReviewById);
export default router;