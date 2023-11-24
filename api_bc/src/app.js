const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const articleRouter = require('../src/api/routes/articleRoutes');
const userRouter = require('../src/api/routes/userRoutes');
const connectDatabase = require('./database');
const app = express();
const port = 4000;


app.use(cors());
app.use(express.json());
app.use('/article', articleRouter);
app.use('/user', userRouter);

connectDatabase();

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

