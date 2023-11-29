const express = require('express');
const router = express.Router();
const {UserController, authenticateUserMiddleware} = require('../../controllers/UserController');

router.get('/consultar', UserController.getAllUsers);

router.get('/consultar/:id', UserController.getUserById);

router.post('/salvar', UserController.createUser);

router.post('/login', authenticateUserMiddleware, UserController.login);

router.put('/editar/:id', UserController.updateUser);

router.delete('/deletar/:id', UserController.deleteUser);

module.exports = router;
