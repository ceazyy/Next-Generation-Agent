import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
  stage: {
    type: String,
    enum: ['Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
    default: 'Qualification'
  },
  probability: {
    type: String,
    required: true,
    trim: true
  },
  expectedCloseDate: {
    type: Date,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
opportunitySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Opportunity', opportunitySchema); 