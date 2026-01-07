import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  rating: Number,
  review: String,
  aiResponse: String,
  summary: String,
  action: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Review", ReviewSchema);
