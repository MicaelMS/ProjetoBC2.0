const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  //fazer
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
