import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    articleTitle: { type: String, required: true },
    articlePublishingDate: { type: Date, default: Date.now },
    articleContent: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
