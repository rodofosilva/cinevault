require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const filmesRoutes = require('./routes/filmes');
const categoriasRoutes = require('./routes/categorias');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'front')));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/filmes', filmesRoutes);
app.use('/api/categorias', categoriasRoutes);

// Rota raiz → login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
