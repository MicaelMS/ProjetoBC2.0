const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connectDatabase = () =>{
  mongoose.connect('mongodb+srv://misael:123@cluster0.oikiwov.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });//alterar para de acordo
  // mongoose.connect('mongodb+srv://guilhermejosegon:12345@projetobc.qjawosc.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB conectado');
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
  db.once('open', function () {
    console.log('Conectado ao MongoDB Atlas');
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}



