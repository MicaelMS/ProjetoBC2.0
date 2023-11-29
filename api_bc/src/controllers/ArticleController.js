const Article = require('../models/Article');

const ArticleController = {
  getAllArticles: async (req, res) => {
    try {
      const { filtro, tipo } = req.query;

      if (tipo === 'curtida') {
        const articles = await Article.find({ chave: { $regex: filtro || '', $options: 'i' }, status: 'Publicado', ativo: true }).sort({ curtidas: -1 }).limit(10);
        res.json(articles);
      } else if (tipo === 'destaque') {
        const articles = await Article.find({ chave: { $regex: filtro || '', $options: 'i' }, destaque: true, status: 'Publicado', ativo: true }).limit(10);
        res.json(articles);
      } else {
        const articles = await Article.find({ chave: { $regex: filtro || '', $options: 'i' }, status: 'Publicado', ativo: true });
        res.json(articles);
      }
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

  curtirArticle: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);

      article.curtidas += 1;

      const updatedArticle = await article.save();

      res.json(updatedArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteArticle: async (req, res) => {
    try {
      req.body.ativo = false;
      await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ message: 'Artigo excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ArticleController;
