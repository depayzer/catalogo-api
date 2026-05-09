// Importa o Mongoose para criar o modelo
const mongoose = require('mongoose');

// Define o schema (estrutura) do usuário no banco de dados
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

// Exporta o modelo para ser usado nos controllers
module.exports = mongoose.model('User', userSchema);