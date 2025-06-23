import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

// Get an article
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
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

    await newArticle.save();
    res.status(201).json(newArticle);
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

    res.json(updatedArticle);
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

export default router;
