const express = require('express');
const router = express.Router();
const ArticleController = require('../../controllers/ArticleController');

router.get('/consultar', ArticleController.getAllArticles);

router.get('/consulta/:id', ArticleController.getArticleById);

router.post('/salvar', ArticleController.createArticle);

router.put('/editar/:id', ArticleController.updateArticle);

router.delete('/deletar/:id', ArticleController.deleteArticle);

module.exports = router;
