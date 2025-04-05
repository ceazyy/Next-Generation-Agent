<template>
  <div>
    <!-- AI Button -->
    <button 
      @click="toggleChat" 
      class="ai-button"
      :class="{ 'active': isChatOpen }"
    >
      <font-awesome-icon :icon="['fas', 'robot']" />
      Simplify
    </button>

    <!-- Chatbot Window -->
    <div 
      v-if="isChatOpen" 
      class="chatbot-container"
      ref="chatbotWindow"
      :style="{ left: position.x + 'px', top: position.y + 'px' }"
      @mousedown="startDragging"
    >
      <div class="chatbot-header">
        <h3>AI Assistant</h3>
        <button @click="toggleChat" class="close-button">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>

      <div class="chat-messages" ref="messageContainer">
        <div v-if="messages.length === 0" class="welcome-message">
          <h4>Welcome to your AI Assistant!</h4>
          <p>Try asking questions like:</p>
          <ul>
            <li>"Show me a 360° view of customer [ID/Name]"</li>
            <li>"List all escalated cases from last week"</li>
            <li>"What's the status of customer complaints?"</li>
          </ul>
        </div>
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          :class="['message', message.type]"
        >
          <div class="message-content" v-html="formatMessage(message.content)"></div>
          <div v-if="message.metadata" class="message-metadata">
            <small>Confidence: {{ message.metadata.confidence }}%</small>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <textarea 
          v-model="userInput"
          @keyup.enter.prevent="sendMessage"
          placeholder="Ask anything about your customers..."
          rows="2"
        ></textarea>
        <button @click="sendMessage" class="send-button">
          <font-awesome-icon :icon="['fas', 'paper-plane']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { marked } from 'marked'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const authStore = useAuthStore()
const isChatOpen = ref(false)
const messages = ref([])
const userInput = ref('')
const position = ref({ x: window.innerWidth - 420, y: 100 })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const chatbotWindow = ref(null)
const messageContainer = ref(null)

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}

const formatMessage = (content) => {
  return marked(content)
}

const scrollToBottom = async () => {
  await nextTick()
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

const startDragging = (e) => {
  if (e.target.closest('.chatbot-header')) {
    isDragging.value = true
    dragOffset.value = {
      x: e.clientX - position.value.x,
      y: e.clientY - position.value.y
    }

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDragging)
  }
}

const onDrag = (e) => {
  if (isDragging.value) {
    position.value = {
      x: Math.max(0, Math.min(window.innerWidth - 400, e.clientX - dragOffset.value.x)),
      y: Math.max(0, Math.min(window.innerHeight - 600, e.clientY - dragOffset.value.y))
    }
  }
}

const stopDragging = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDragging)
}

const sendMessage = async () => {
  if (!userInput.value.trim()) return
  if (!authStore.isAuthenticated()) {
    messages.value.push({
      type: 'error',
      content: 'Please log in to use the AI assistant.'
    })
    await scrollToBottom()
    return
  }

  const userMessage = userInput.value
  messages.value.push({
    type: 'user',
    content: userMessage
  })

  userInput.value = ''
  await scrollToBottom()

  try {
    const response = await api.post('/ai/chat', {
      message: userMessage
    })

    messages.value.push({
      type: 'bot',
      content: response.data.answer,
      metadata: response.data.metadata
    })
    await scrollToBottom()
  } catch (error) {
    console.error('AI Chat Error:', error)
    messages.value.push({
      type: 'error',
      content: error.response?.status === 401 
        ? 'Please log in to use the AI assistant.'
        : 'Sorry, I encountered an error processing your request.'
    })
    await scrollToBottom()
  }
}

// Handle window resize
const handleResize = () => {
  position.value = {
    x: Math.min(position.value.x, window.innerWidth - 400),
    y: Math.min(position.value.y, window.innerHeight - 600)
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
</script>

<style scoped>
.ai-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  z-index: 1000;
  font-size: 1rem;
}

.ai-button:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

.ai-button.active {
  background: var(--secondary-color);
}

.chatbot-container {
  position: fixed;
  width: 400px;
  height: 600px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
}

.chatbot-header {
  padding: 15px;
  background: var(--primary-color);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
}

.chatbot-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.close-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2em;
  padding: 5px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.close-button:hover {
  opacity: 1;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f8f9fa;
}

.welcome-message {
  text-align: center;
  color: var(--text-color);
  padding: 20px;
  background: white;
  border-radius: 10px;
  margin-bottom: 20px;
}

.welcome-message h4 {
  margin-bottom: 15px;
  color: var(--primary-color);
}

.welcome-message ul {
  list-style: none;
  padding: 0;
}

.welcome-message li {
  margin: 10px 0;
  color: var(--text-color);
  font-size: 0.9rem;
}

.message {
  margin-bottom: 15px;
  max-width: 80%;
  animation: fadeIn 0.3s ease;
}

.message.user {
  margin-left: auto;
  background: var(--primary-color);
  color: white;
  border-radius: 15px 15px 0 15px;
}

.message.bot {
  background: white;
  color: var(--text-color);
  border-radius: 15px 15px 15px 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.message.error {
  background: #ffebee;
  color: #c62828;
  border-radius: 15px;
}

.message-content {
  padding: 12px 15px;
  line-height: 1.4;
}

.message-content :deep(p) {
  margin: 0;
}

.message-content :deep(a) {
  color: inherit;
  text-decoration: underline;
}

.message-metadata {
  padding: 5px 15px;
  font-size: 0.8em;
  opacity: 0.7;
}

.chat-input {
  padding: 15px;
  border-top: 1px solid #eee;
  background: white;
  display: flex;
  gap: 10px;
}

.chat-input textarea {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--text-color);
  background: #f8f9fa;
}

.chat-input textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.send-button {
  padding: 10px 15px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.send-button:hover {
  background: var(--secondary-color);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 