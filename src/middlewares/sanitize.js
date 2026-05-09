// Importa o mongo-sanitize para limpar os dados recebidos
const sanitize = require('mongo-sanitize');

// Middleware que remove caracteres maliciosos das requisições
// Protege contra ataques de NoSQL Injection
module.exports = (req, res, next) => {
  // Sanitiza o corpo da requisição
  if (req.body) req.body = sanitize(req.body);

  // Sanitiza os parâmetros da URL
  if (req.params) req.params = sanitize(req.params);

  // Passa para o próximo middleware ou controller
  next();
};