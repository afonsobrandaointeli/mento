require('dotenv').config();
require('winston-mongodb');
const express = require('express');
const winston = require('winston');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const credentials = require('dotenv').config().parsed;
const User = require('./models/User');
const app = express();
const session = require('express-session');
const port = process.env.PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dev';

const path = require('path');
const viewRoutes = require('./routes/viewRoutes');

// Configuração do Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.MongoDB({
      db: mongoDbUri,
      collection: 'logs',
      options: {
        useUnifiedTopology: true
      }
    })
  ]
});

// Middlewares
app.use(express.json()); // Para analisar o corpo das requisições como JSON
app.use(express.urlencoded({extended: true})); // Para analisar o corpo das requisições como URL-encoded
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Cookies seguros apenas em produção
    httpOnly: true,
  }
}));
app.use(csrf());

app.use((req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

// Inicializar o Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// Conexão com o MongoDB
mongoose.connect(mongoDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => logger.info('Conectado ao MongoDB'))
.catch(error => logger.error('Erro ao conectar ao MongoDB:', error));

// Rotas
const userRoutes = require('./routes/userRoutes');
app.use('/api/usuarios', userRoutes);

// Configurar o EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', viewRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

//rota de signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    //Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar usuário no Firebase
    const userRecord = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
      disabled: false
    });

    // Criar usuário no MongoDB
    const newUser = new User({
      email,
      password: hashedPassword, 
      emailVerified: false
    });
    await newUser.save();

    res.status(201).json({ firebaseId: userRecord.uid, localId: newUser._id });
  } catch (error) {
    logger.error('Erro ao criar usuário:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar usuário no MongoDB
    const user = await User.findOne({ email }); // Buscar usuário por email
    if (!user) { 
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      return res.status(400).json({ error: 'Senha incorreta' });
    }
  } catch (error) {
    logger.error(error.stack);
    res.status(500).json({ error: error.message });
  }
});
  // Iniciar o servidor
app.listen(port, () => {
  logger.info('Servidor iniciando!')
  });