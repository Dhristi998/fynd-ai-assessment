import express from "express";
import Review from "../models/Review.js";
import { callLLM } from "../services/llm.service.js";

const router = express.Router();

// POST /api/reviews
router.post("/", async (req, res) => {
  const { rating, review } = req.body;

  if (!review || review.trim() === "") {
    return res.status(400).json({ error: "Review cannot be empty" });
  }

  let aiResponse = "Thank you for your feedback!";
  let summary = "Customer feedback received.";
  let action = "Review customer feedback.";

  try {
    aiResponse = await callLLM(
      `Write a polite response to this customer review:\n${review}`
    );

    summary = await callLLM(
      `Summarize this review in one sentence:\n${review}`
    );

    action = await callLLM(
      `Suggest one business action based on this review:\n${review}`
    );
  } catch (e) {
    console.error("LLM failed, using fallback");
  }

  try {
    const saved = await Review.create({
      rating,
      review,
      aiResponse,
      summary,
      action
    });

    res.json(saved);
  } catch (dbErr) {
    console.error("DB save failed:", dbErr);
    res.status(500).json({ error: "Database save failed" });
  }
});

// GET /api/reviews
router.get("/", async (req, res) => {
  try {
    const data = await Review.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

export default router;
