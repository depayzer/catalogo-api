// Importa o Mongoose para criar o modelo
const mongoose = require('mongoose');

/**
 * Schema responsável por definir a estrutura dos usuários no banco de dados.
 *
 * Define os campos obrigatórios do usuário, incluindo nome, email único
 * e senha com tamanho mínimo.
 *
 * @type {import('mongoose').Schema}
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'], // Campo obrigatório
    trim: true // Remove espaços extras
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true, // Não permite emails duplicados
    lowercase: true // Salva sempre em minúsculo
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: 6 // Mínimo de 6 caracteres
  }
}, { timestamps: true }); // Adiciona createdAt e updatedAt automaticamente

/**
 * Modelo Mongoose de Usuário.
 *
 * Fornece os recursos necessários para criar, buscar e validar usuários
 * na coleção de usuários do MongoDB.
 *
 * @type {import('mongoose').Model}
 */
module.exports = mongoose.model('User', userSchema);