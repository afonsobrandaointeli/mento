require('dotenv').config();
require('winston-mongodb');

const express = require('express');
const winston = require('winston');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const credentials = require('dotenv').config().parsed;

const app = express();
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

// Iniciar o servidor
app.listen(port, () => {
  logger.info(`Servidor rodando em http://localhost:${port}`);
});

//rota de signup
app.post('/signup', async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }
  const userResponse = await admin.auth().createUser({
    email: user.email,
    password: user.password,
    emailVerified: false,
    disabled: false
  })
  res.json(userResponse);
});