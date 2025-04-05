import express from 'express';
import auth from '../middleware/auth.js';
import aiService from '../services/aiService.js';

const router = express.Router();

// AI Chat endpoint
router.post('/chat', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const response = await aiService.processQuery(message);
    res.json(response);
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ 
      message: 'Error processing AI request', 
      error: error.message 
    });
  }
});

// Get 360 customer view
router.get('/customer-360/:customerId', auth, async (req, res) => {
  try {
    const { customerId } = req.params;
    const response = await aiService.get360CustomerView(customerId);
    res.json(response);
  } catch (error) {
    console.error('Error getting 360 view:', error);
    res.status(500).json({ 
      error: 'Failed to get customer view',
      details: error.message 
    });
  }
});

// Get escalated cases
router.get('/escalated-cases', auth, async (req, res) => {
  try {
    const { timeframe } = req.query;
    const response = await aiService.getEscalatedCases(timeframe);
    res.json(response);
  } catch (error) {
    console.error('Error getting escalated cases:', error);
    res.status(500).json({ 
      error: 'Failed to get escalated cases',
      details: error.message 
    });
  }
});

export default router; 