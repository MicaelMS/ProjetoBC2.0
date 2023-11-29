const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  publicacao: {
    type: Date,
    required: true,
    default: Date.now,
  },
  conteudo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
  },
  chave: {
    type: String,
    required: true,
  },
  curtidas: {
    type: Number,
    default: 0,
  },
  destaque: {
    type: Boolean,
    default: false,
  },
  ativo: {
    type: Boolean,
    default: true,
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
