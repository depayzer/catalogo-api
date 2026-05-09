// Importa o Mongoose para conectar ao MongoDB
const mongoose = require('mongoose');

// Função assíncrona que realiza a conexão com o banco de dados
const connectDB = async () => {
  try {
    // Tenta conectar usando a URI definida nas variáveis de ambiente
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado!');
  } catch (error) {
    // Se falhar, exibe o erro e encerra o processo
    console.error('Erro ao conectar:', error.message);
    process.exit(1);
  }
};

// Exporta a função para ser usada no server.js
module.exports = connectDB;