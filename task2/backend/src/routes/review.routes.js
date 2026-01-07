import express from "express";
import Review from "../models/Review.js";
import { callLLM } from "../services/llm.service.js";

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { rating, review } = req.body;

  if (!review || review.trim() === "") {
    return res.status(400).json({ error: "Review cannot be empty" });
  }

  try {
    const aiResponse = await callLLM(
      `Write a polite response to this customer review:\n${review}`
    );

    const summary = await callLLM(
      `Summarize this review in one sentence:\n${review}`
    );

    const action = await callLLM(
      `Suggest one business action based on this review:\n${review}`
    );

    const saved = await Review.create({
      rating,
      review,
      aiResponse,
      summary,
      action
    });

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "LLM failed" });
  }
});

router.get("/reviews", async (req, res) => {
  const data = await Review.find().sort({ createdAt: -1 });
  res.json(data);
});

export default router;
