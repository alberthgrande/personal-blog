import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

// Get an article
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create an article
router.post("/", async (req, res) => {
  try {
    const newArticle = new Article({
      articleTitle: req.body.articleTitle,
      articlePublishingDate: req.body.articlePublishingDate,
      articleContent: req.body.articleContent,
    });

    if (!newArticle) {
      return res.status(404).json({ error: "Failed to add article" });
    }

    await newArticle.save();
    res.status(201).json({ message: "Article added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT an article by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        articleTitle: req.body.articleTitle,
        articlePublishingDate: req.body.articlePublishingDate,
        articleContent: req.body.articleContent,
      },
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Article updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH an article by ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE an article by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View an article by ID
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
