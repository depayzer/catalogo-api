// Importa o model de usuário
const User = require('../models/User');

// Importa o bcryptjs para criptografar senhas
const bcrypt = require('bcryptjs');

// Importa o jsonwebtoken para gerar tokens de autenticação
const jwt = require('jsonwebtoken');

// Controller de registro — cria um novo usuário
exports.register = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { name, email, password } = req.body;

    // Verifica se já existe um usuário com esse email
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografa a senha antes de salvar (nunca salva senha em texto puro)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco de dados
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Usuário criado com sucesso', id: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller de login — autentica o usuário e retorna um token JWT
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      // Mensagem genérica para não revelar se o email existe ou não
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Compara a senha digitada com a senha criptografada no banco
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gera o token JWT com o ID do usuário, expira em 1 dia
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};