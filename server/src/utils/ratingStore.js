import fs from "fs";
import path from "path";
const __dirname = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/+([A-Za-z]:)/, "$1")
);
const ratingsFile = path.join(__dirname, "../data/ratings.json");

function ensureRatingsFile() {
  if (!fs.existsSync(ratingsFile)) {
    fs.mkdirSync(path.dirname(ratingsFile), { recursive: true });
    fs.writeFileSync(ratingsFile, JSON.stringify({ ratings: [] }, null, 2));
  }
}

function getRatings() {
  ensureRatingsFile();
  const data = fs.readFileSync(ratingsFile, "utf-8");
  try {
    return JSON.parse(data).ratings || [];
  } catch {
    return [];
  }
}

// Accepts: { rating, userId }
function addRating(rating, userId) {
  const ratings = getRatings();
  // Only allow one rating per user
  if (ratings.some((r) => r.userId === userId)) return false;
  ratings.push({ rating, userId });
  fs.writeFileSync(ratingsFile, JSON.stringify({ ratings }, null, 2));
  return true;
}

function getUserRating(userId) {
  const ratings = getRatings();
  return ratings.find((r) => r.userId === userId);
}

function getAverageRating() {
  const ratings = getRatings();
  if (!ratings.length) return 0;
  return ratings.reduce((a, b) => a + b.rating, 0) / ratings.length;
}

export { getRatings, addRating, getAverageRating, getUserRating };
