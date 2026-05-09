require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const sanitize = require('./src/middlewares/sanitize');

const app = express();

connectDB();

app.use(express.json());
app.use(sanitize);

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/products', require('./src/routes/productRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));