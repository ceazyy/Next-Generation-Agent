import express from 'express';
import Contact from '../models/Contact.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Test route to verify MongoDB connection
router.get('/test', async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.json({ message: 'MongoDB connection successful', count });
  } catch (error) {
    console.error('MongoDB test error:', error);
    res.status(500).json({ message: 'MongoDB connection error', error: error.message });
  }
});

// Get all contacts with search and filtering
router.get('/', auth, async (req, res) => {
  try {
    const { search, status, type, account } = req.query;
    const query = {};

    // Search in name or email
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by account
    if (account) {
      query.account = account;
    }

    const contacts = await Contact.find(query)
      .populate('account', 'name')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Get a single contact
router.get('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('account', 'name')
      .populate('assignedTo', 'name email');
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
});

// Create a new contact
router.post('/', auth, async (req, res) => {
  try {
    const contact = new Contact({
      ...req.body,
      assignedTo: req.body.assignedTo || req.user._id
    });

    await contact.save();
    await contact.populate([
      { path: 'account', select: 'name' },
      { path: 'assignedTo', select: 'name email' }
    ]);
    
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
});

// Update a contact
router.put('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('account', 'name')
      .populate('assignedTo', 'name email');

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
});

// Delete a contact
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

export default router; 