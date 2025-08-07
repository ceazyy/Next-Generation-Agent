import express from 'express';
import { supabase } from '../services/supabaseClient.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all leads
router.get('/', auth, async (req, res) => {
  const { data, error } = await supabase.from('leads').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get a single lead by id
router.get('/:id', auth, async (req, res) => {
  const { data, error } = await supabase.from('leads').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

// Create a new lead
router.post('/', auth, async (req, res) => {
  const { data, error } = await supabase.from('leads').insert([req.body]).single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// Update a lead
router.put('/:id', auth, async (req, res) => {
  const { data, error } = await supabase.from('leads').update(req.body).eq('id', req.params.id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Delete a lead
router.delete('/:id', auth, async (req, res) => {
  const { error } = await supabase.from('leads').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

export default router; 