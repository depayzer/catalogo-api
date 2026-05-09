// Importa o model de produto
const Product = require('../models/Product');

// CREATE — Cria um novo produto
exports.create = async (req, res) => {
  try {
    // Cria o produto com os dados do body + ID do usuário logado
    const product = await Product.create({ ...req.body, createdBy: req.userId });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ALL — Lista todos os produtos
exports.getAll = async (req, res) => {
  try {
    // Busca todos os produtos e popula os dados do usuário que criou
    const products = await Product.find().populate('createdBy', 'name email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE — Busca um produto pelo ID
exports.getOne = async (req, res) => {
  try {
    // Busca o produto pelo ID passado na URL
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE — Atualiza um produto pelo ID
exports.update = async (req, res) => {
  try {
    // Busca e atualiza o produto, retornando o documento atualizado
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retorna o documento após a atualização
      runValidators: true // Valida os dados antes de atualizar
    });
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE — Remove um produto pelo ID
exports.remove = async (req, res) => {
  try {
    // Busca e deleta o produto pelo ID
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};