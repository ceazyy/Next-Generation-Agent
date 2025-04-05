import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Prospect'],
        default: 'Active'
    },
    interactions: [{
        type: {
            type: String,
            enum: ['Call', 'Email', 'Meeting', 'Note'],
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        description: String,
        outcome: String
    }],
    cases: [{
        title: String,
        description: String,
        status: {
            type: String,
            enum: ['Open', 'In Progress', 'Escalated', 'Closed'],
            default: 'Open'
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Critical'],
            default: 'Medium'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        closedAt: Date
    }],
    tags: [String],
    customFields: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});

// Index for text search
customerSchema.index({
    firstName: 'text',
    lastName: 'text',
    email: 'text',
    company: 'text',
    'cases.title': 'text',
    'cases.description': 'text'
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer; 