const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserController');

router.get('/consultar', UserController.getAllUsers);

router.get('/consulta/:id', UserController.getUserById);

router.post('/salvar', UserController.createUser);

router.put('/editar/:id', UserController.updateUser);

router.delete('/deletar/:id', UserController.deleteUser);

module.exports = router;
