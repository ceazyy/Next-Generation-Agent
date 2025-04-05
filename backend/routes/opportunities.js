import express from 'express';
import Opportunity from '../models/Opportunity.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all opportunities with search and filtering
router.get('/', auth, async (req, res) => {
  try {
    const { search, stage, minValue, maxValue } = req.query;
    const query = {};

    // Search in name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Filter by stage
    if (stage) {
      query.stage = stage;
    }

    // Filter by value range
    if (minValue || maxValue) {
      query.value = {};
      if (minValue) query.value.$gte = minValue;
      if (maxValue) query.value.$lte = maxValue;
    }

    const opportunities = await Opportunity.find(query)
      .populate('account', 'name')
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching opportunities', error: error.message });
  }
});

// Get a single opportunity
router.get('/:id', auth, async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('account', 'name')
      .populate('owner', 'name email');
    
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    
    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching opportunity', error: error.message });
  }
});

// Create a new opportunity
router.post('/', auth, async (req, res) => {
  try {
    const opportunity = new Opportunity({
      ...req.body,
      owner: req.body.owner || req.user._id
    });

    await opportunity.save();
    await opportunity.populate([
      { path: 'account', select: 'name' },
      { path: 'owner', select: 'name email' }
    ]);
    
    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: 'Error creating opportunity', error: error.message });
  }
});

// Update an opportunity
router.put('/:id', auth, async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('account', 'name')
      .populate('owner', 'name email');

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: 'Error updating opportunity', error: error.message });
  }
});

// Delete an opportunity
router.delete('/:id', auth, async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    res.json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting opportunity', error: error.message });
  }
});

export default router; 