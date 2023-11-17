const Article = require('../models/Article');

const ArticleController = {
  getAllArticles: async (req, res) => {
    try {
      const articles = await Article.find();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getArticleById: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (article) {
        res.json(article);
      } else {
        res.status(404).json({ message: 'Artigo não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createArticle: async (req, res) => {
    const newArticle = new Article(req.body);

    try {
      const savedArticle = await newArticle.save();
      res.status(201).json(savedArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateArticle: async (req, res) => {
    try {
      const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteArticle: async (req, res) => {
    try {
      await Article.findByIdAndDelete(req.params.id);
      res.json({ message: 'Artigo excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ArticleController;
