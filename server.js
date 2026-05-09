// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa o Express para criar o servidor
const express = require('express');

// Importa a função de conexão com o banco de dados
const connectDB = require('./src/config/db');

// Importa o middleware de sanitização contra NoSQL Injection
const sanitize = require('./src/middlewares/sanitize');

const app = express();

// Conecta ao MongoDB
connectDB();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware de proteção contra NoSQL Injection
app.use(sanitize);

// Rotas de autenticação
app.use('/api/auth', require('./src/routes/authRoutes'));

// Rotas de produtos (protegidas por JWT)
app.use('/api/products', require('./src/routes/productRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));