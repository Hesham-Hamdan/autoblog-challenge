const express = require("express");
const router = express.Router();
const db = require("../models/db");
const articleJob = require("../services/articleJob");

// GET: List all articles
router.get("/articles", async (req, res) => {
  try {
    const articles = await db.getAllArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Single article
router.get("/articles/:id", async (req, res) => {
  try {
    const article = await db.getArticleById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Manual trigger (Useful for testing/demo)
router.post("/articles/generate", async (req, res) => {
  try {
    await articleJob.generateAndSaveArticle();
    res.json({ message: "Article generation triggered manually" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
