const User = require('../models/User');
const UserDto = require('../dtos/userDto');

// Criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const userDto = new UserDto(req.body.nome, req.body.email, req.body.idade);
    console.log(userDto);

    // Validação básica dos dados (você pode usar uma biblioteca como Joi ou Yup para validações mais complexas)
    if (!userDto.nome || !userDto.email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }

    const user = await User.create(userDto);
    res.status(201).json(user);
  } catch (error) {
    // Verifica se o erro é de validação do Mongoose (código 11000 para chave duplicada)
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Listar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um usuário pelo ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um usuário pelo ID
exports.updateUserById = async (req, res) => {
  try {
    const userDto = new UserDto(req.body.nome, req.body.email, req.body.idade);

    // Validação básica dos dados (você pode usar uma biblioteca como Joi ou Yup para validações mais complexas)
    if (!userDto.nome || !userDto.email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, userDto, { new: true });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar um usuário pelo ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
