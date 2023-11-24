// database.js
const mongoose = require('mongoose');
const password = encodeURIComponent('MongoDB@123');

const connectDatabase = () => {
  mongoose.connect(
    `mongodb+srv://Micael:${password}@cluster0.qf5kkox.mongodb.net/BC`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('MongoDB conectado');
  });

  db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
  db.once('open', function () {
    console.log('Conectado ao MongoDB Atlas');
  });
};

module.exports = connectDatabase;
