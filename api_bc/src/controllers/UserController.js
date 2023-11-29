const User = require('../models/User');
const bcrypt = require('bcrypt');

// Middleware de autenticação
const authenticateUserMiddleware = async (req, res, next) => {
  const { author_user, author_pwd } = req.body;
  try {
    const user = await User.findOne({ author_user, author_status: true, author_level: { $in: ['user', 'admin'] } });

    if (user && bcrypt.compareSync(author_pwd, user.author_pwd)) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: 'Usuário não autenticado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro durante a autenticação' });
  }
};

const UserController = {

  getAllUsers: async (req, res) => {
    try {
      const { filtro } = req.query;
      const users = filtro ? await User.find({ author_name: { $regex: filtro, $options: 'i' }, author_status: true }).select('-author_pwd').limit(10) :
        await User.find({ author_status: true }).select('-author_pwd').limit(10);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    const user = req.user;
    res.json({ authenticated: true, user });
  },

  createUser: async (req, res) => {
    const newUser = new User(req.body);
    try {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(req.body.author_pwd, saltRounds);
      newUser.author_pwd = hashedPassword;
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(req.body.author_pwd, saltRounds);
      req.body.author_pwd = hashedPassword;
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      req.body.author_status = false;
      await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};

module.exports = { UserController, authenticateUserMiddleware };
