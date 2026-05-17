const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

// GET /api/filmes — listar todos (com filtro opcional por título ou categoria)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { busca, categoria_id } = req.query;

    let query = supabase
      .from('filmes')
      .select('*, categorias(nome)')
      .order('created_at', { ascending: false });

    if (busca) {
      query = query.ilike('titulo', `%${busca}%`);
    }
    if (categoria_id) {
      query = query.eq('categoria_id', categoria_id);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/filmes/:id — buscar um filme
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('filmes')
      .select('*, categorias(nome)')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Filme não encontrado.' });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/filmes — cadastrar filme
router.post('/', authMiddleware, async (req, res) => {
  const { titulo, diretor, ano, sinopse, nota, categoria_id, poster_url } = req.body;

  if (!titulo || !diretor || !ano) {
    return res.status(400).json({ error: 'Título, diretor e ano são obrigatórios.' });
  }

  try {
    const { data, error } = await supabase
      .from('filmes')
      .insert([{ titulo, diretor, ano, sinopse, nota, categoria_id, poster_url }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/filmes/:id — editar filme
router.put('/:id', authMiddleware, async (req, res) => {
  const { titulo, diretor, ano, sinopse, nota, categoria_id, poster_url } = req.body;

  try {
    const { data, error } = await supabase
      .from('filmes')
      .update({ titulo, diretor, ano, sinopse, nota, categoria_id, poster_url })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/filmes/:id — excluir filme
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { error } = await supabase
      .from('filmes')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Filme excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
