// Importa o Mongoose para conectar ao MongoDB
const mongoose = require('mongoose');

/**
 * Realiza a conexão da aplicação com o banco de dados MongoDB.
 *
 * Utiliza a variável de ambiente MONGO_URI para estabelecer a conexão.
 * Caso a conexão falhe, exibe o erro no terminal e encerra o processo.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} Retorna uma Promise resolvida quando a conexão é estabelecida.
 * @throws {Error} Pode lançar erro caso a conexão com o MongoDB falhe.
 */
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