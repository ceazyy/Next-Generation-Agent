import OpenAI from 'openai';
import { ChatOpenAI } from '@langchain/openai';
import { OpenAIEmbeddings } from '@langchain/openai';
import Customer from '../models/Customer.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set in environment variables');
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `You are an AI assistant for a CRM system. You help users with:
1. Customer data analysis
2. Sales pipeline management
3. Task prioritization
4. Customer insights
5. Best practices for customer engagement

Provide concise, practical answers focused on CRM-related queries.`;

class AIService {
    constructor() {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not set in environment variables');
        }

        this.openai = openai;
        this.model = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: 'gpt-3.5-turbo',
            temperature: 0.7
        });
        this.vectorStore = null;
        this.embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY
        });
        
        // Initialize vector store only after MongoDB is connected
        // This part is removed as per the edit hint to remove MongoDB and mongoose.
        // The vectorStore and embeddings initialization will be handled by the new Supabase integration.
    }

    // async initVectorStore() {
    //     try {
    //         // Wait for MongoDB connection to be ready
    //         if (mongoose.connection.readyState !== 1) {
    //             console.log('Waiting for MongoDB connection...');
    //             return;
    //         }

    //         const db = mongoose.connection.db;
    //         const collection = db.collection('customers');

    //         // Create vector search index if it doesn't exist
    //         try {
    //             await collection.createIndex(
    //                 { vector_embedding: 1 },
    //                 {
    //                     name: process.env.VECTOR_STORE_INDEX || 'vector_index'
    //                 }
    //             );
    //         } catch (err) {
    //             console.warn('Index creation warning:', err.message);
    //         }

    //         this.vectorStore = new MongoDBAtlasVectorSearch(
    //             this.embeddings,
    //             {
    //                 collection,
    //                 indexName: process.env.VECTOR_STORE_INDEX || 'vector_index',
    //                 textKey: 'text',
    //                 embeddingKey: 'vector_embedding',
    //             }
    //         );

    //         console.log('Vector store initialized successfully');
    //     } catch (error) {
    //         console.error('Vector store initialization error:', error);
    //         // Don't throw error to allow basic functionality without vector store
    //     }
    // }

    async processQuery(message, context = {}) {
        try {
            // First, try to find relevant customer data if vector store is available
            let relevantContext = '';
            // This part is removed as per the edit hint to remove MongoDB and mongoose.
            // The vectorStore and embeddings initialization will be handled by the new Supabase integration.

            const completion = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...(relevantContext ? [{ role: "system", content: `Relevant customer context:\n${relevantContext}` }] : []),
                    { role: "user", content: message }
                ],
                temperature: 0.7,
                max_tokens: 500
            });

            return {
                answer: completion.choices[0].message.content,
                metadata: {
                    model: completion.model,
                    confidence: 0.95,
                    hasContext: !!relevantContext
                }
            };
        } catch (error) {
            console.error('OpenAI API Error:', error);
            throw new Error('Failed to process query with AI');
        }
    }

    async get360CustomerView(customerId) {
        try {
            const customer = await Customer.findById(customerId).exec();
            if (!customer) {
                throw new Error('Customer not found');
            }

            return {
                customer: {
                    id: customer._id,
                    name: `${customer.firstName} ${customer.lastName}`,
                    email: customer.email,
                    company: customer.company,
                    status: customer.status,
                    interactions: customer.interactions || [],
                    cases: customer.cases || [],
                    metrics: {
                        totalInteractions: customer.interactions?.length || 0,
                        openCases: customer.cases?.filter(c => c.status === 'Open').length || 0,
                        escalatedCases: customer.cases?.filter(c => c.status === 'Escalated').length || 0
                    }
                }
            };
        } catch (error) {
            console.error('Error fetching customer view:', error);
            throw new Error('Failed to fetch customer data');
        }
    }

    async getEscalatedCases(timeframe) {
        try {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            const customers = await Customer.find({
                'cases': {
                    $elemMatch: {
                        status: 'Escalated',
                        createdAt: { $gte: oneWeekAgo }
                    }
                }
            }).exec();

            const escalatedCases = customers.flatMap(customer => 
                customer.cases
                    .filter(c => c.status === 'Escalated' && c.createdAt >= oneWeekAgo)
                    .map(c => ({
                        ...c.toObject(),
                        customerName: `${customer.firstName} ${customer.lastName}`,
                        customerEmail: customer.email
                    }))
            );

            return {
                cases: escalatedCases,
                summary: `Found ${escalatedCases.length} escalated cases from the last week`
            };
        } catch (error) {
            console.error('Error fetching escalated cases:', error);
            throw new Error('Failed to fetch escalated cases');
        }
    }
}

// Create a singleton instance
const aiService = new AIService();
export default aiService; 