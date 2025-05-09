# Next Generation Agent

A modern CRM system with integrated AI capabilities using GPT-4 for intelligent customer insights and automation. Newer version is under development, as for hosting it, I'm can't really do it because I'm learning deployment :3 

## Features

- AI-powered customer insights
- 360° customer view
- Smart case management
- Intelligent chatbot interface
- Natural language querying
- Responsive design
- Secure data handling

## Tech Stack

- Backend:
  - Node.js + Express
  - MongoDB for data storage
  - LangChain for AI orchestration
  - GPT-4 for natural language processing
  - Vector storage for semantic search

- Frontend:
  - Vue.js 3
  - SCSS for styling
  - Axios for API communication
  - FontAwesome icons
  - Draggable chat interface

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- OpenAI API key
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd crm-ai
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Configure environment variables:
   ```bash
   # In the backend directory
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration values.

4. Start the development servers:
   ```bash
   # Start backend server (from backend directory)
   npm run dev

   # Start frontend server (from frontend directory)
   npm run serve
   ```

5. Access the application:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000

## AI Features Usage

### Chatbot Interface

1. Click the "Simplify" button in the bottom-right corner to open the AI assistant
2. Type your query in natural language
3. The AI will process your request and provide relevant information

### Example Queries

- "Show me a 360° view of customer [ID/Name]"
- "List all escalated cases from last week"
- "Summarize customer complaints about [Product]"
- "What's the current status of [Customer]'s cases?"

### AI Integration

The system uses:
- GPT-4 for natural language understanding
- RAG (Retrieval Augmented Generation) for context-aware responses
- Vector storage for efficient semantic search
- Few-shot learning for common query patterns

## Security Considerations

- All API keys should be stored in environment variables
- JWT authentication for API endpoints
- Data privacy controls in AI responses
- Rate limiting on API endpoints
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
