// Importa o jsonwebtoken para verificar o token JWT
const jwt = require('jsonwebtoken');

// Middleware que protege as rotas — verifica se o usuário está autenticado
module.exports = (req, res, next) => {
  // Pega o header Authorization da requisição
  const authHeader = req.headers.authorization;

  // Verifica se o header existe e começa com "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Extrai o token removendo o prefixo "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // Verifica se o token é válido usando a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Salva o ID do usuário na requisição para usar nos controllers
    req.userId = decoded.id;

    // Passa para o próximo middleware ou controller
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
};