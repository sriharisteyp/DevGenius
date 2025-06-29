import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getRatings,
  addRating,
  getAverageRating,
  getUserRating,
} from "../utils/ratingStore.js";

const router = express.Router();

// POST /api/ratings
router.post("/", authenticateToken, (req, res) => {
  const { rating } = req.body;
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ error: "Not authenticated" });
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid rating" });
  }
  if (getUserRating(userId)) {
    return res.status(409).json({ error: "User has already rated" });
  }
  addRating(rating, userId);
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

// GET /api/ratings/user (get current user's rating)
router.get("/user", authenticateToken, (req, res) => {
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ error: "Not authenticated" });
  const rating = getUserRating(userId);
  res.json({ rating });
});

export default router;
