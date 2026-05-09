// Importa o Router do Express para criar as rotas
const router = require('express').Router();

// Importa os controllers de autenticação
const { register, login } = require('../controllers/authController');

// Rota para cadastro de novo usuário
router.post('/register', register);

// Rota para login do usuário
router.post('/login', login);

module.exports = router;