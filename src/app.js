const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://guilhermejosegon:12345@projetobc.qjawosc.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', function () {
  console.log('Conectado ao MongoDB Atlas');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});



