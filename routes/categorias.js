const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

// GET /api/categorias
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('nome');

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/categorias
router.post('/', authMiddleware, async (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório.' });

  try {
    const { data, error } = await supabase
      .from('categorias')
      .insert([{ nome }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/categorias/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { error } = await supabase
      .from('categorias')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Categoria excluída.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
