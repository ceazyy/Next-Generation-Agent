import express from 'express';
import Account from '../models/Account.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all accounts with search and filtering
router.get('/', auth, async (req, res) => {
  try {
    const { search, status, industry } = req.query;
    const query = {};

    // Search in name or location
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { industry: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by industry
    if (industry) {
      query.industry = industry;
    }

    const accounts = await Account.find(query)
      .populate('primaryContact', 'firstName lastName email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accounts', error: error.message });
  }
});

// Get a single account
router.get('/:id', auth, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id)
      .populate('primaryContact', 'firstName lastName email')
      .populate('assignedTo', 'name email');
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching account', error: error.message });
  }
});

// Create a new account
router.post('/', auth, async (req, res) => {
  try {
    const account = new Account({
      ...req.body,
      assignedTo: req.body.assignedTo || req.user._id
    });

    await account.save();
    await account.populate([
      { path: 'primaryContact', select: 'firstName lastName email' },
      { path: 'assignedTo', select: 'name email' }
    ]);
    
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error: error.message });
  }
});

// Update an account
router.put('/:id', auth, async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('primaryContact', 'firstName lastName email')
      .populate('assignedTo', 'name email');

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ message: 'Error updating account', error: error.message });
  }
});

// Delete an account
router.delete('/:id', auth, async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error: error.message });
  }
});

export default router; 