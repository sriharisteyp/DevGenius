import express from "express";
import {
  getRatings,
  addRating,
  getAverageRating,
} from "../utils/ratingStore.js";

const router = express.Router();

// POST /api/ratings
router.post("/", (req, res) => {
  const { rating } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid rating" });
  }
  addRating(rating);
  res.json({ success: true });
});

// GET /api/ratings/average
router.get("/average", (req, res) => {
  const avg = getAverageRating();
  res.json({ average: avg });
});

// GET /api/ratings
router.get("/", (req, res) => {
  res.json({ ratings: getRatings() });
});

export default router;
