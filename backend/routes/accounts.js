import express from 'express';
import { supabase } from '../services/supabaseClient.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all accounts
router.get('/', auth, async (req, res) => {
  const { data, error } = await supabase.from('accounts').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get a single account by id
router.get('/:id', auth, async (req, res) => {
  const { data, error } = await supabase.from('accounts').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

// Create a new account
router.post('/', auth, async (req, res) => {
  const { data, error } = await supabase.from('accounts').insert([req.body]).single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// Update an account
router.put('/:id', auth, async (req, res) => {
  const { data, error } = await supabase.from('accounts').update(req.body).eq('id', req.params.id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Delete an account
router.delete('/:id', auth, async (req, res) => {
  const { error } = await supabase.from('accounts').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

export default router; 