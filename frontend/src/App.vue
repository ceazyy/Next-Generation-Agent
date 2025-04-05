<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AIChatbot from './components/AIChatbot.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
}
</script>

<template>
  <div class="app">
    <!-- Sidebar Navigation -->
    <nav class="sidebar">
      <div class="logo">
        <h1>CRM AI</h1>
      </div>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">
          <i class="fas fa-chart-line"></i>
          Dashboard
        </RouterLink>
        <RouterLink to="/contacts" class="nav-link">
          <i class="fas fa-address-book"></i>
          Contacts
        </RouterLink>
        <RouterLink to="/leads" class="nav-link">
          <i class="fas fa-user-plus"></i>
          Leads
        </RouterLink>
        <RouterLink to="/accounts" class="nav-link">
          <i class="fas fa-building"></i>
          Accounts
        </RouterLink>
        <RouterLink to="/opportunities" class="nav-link">
          <i class="fas fa-dollar-sign"></i>
          Opportunities
        </RouterLink>
        <RouterLink to="/tasks" class="nav-link">
          <i class="fas fa-tasks"></i>
          Tasks
        </RouterLink>
        <RouterLink to="/reports" class="nav-link">
          <i class="fas fa-chart-bar"></i>
          Reports
        </RouterLink>
      </div>
      <div class="auth-buttons">
        <RouterLink v-if="!authStore.isAuthenticated()" to="/login" class="auth-button login">Login</RouterLink>
        <RouterLink v-if="!authStore.isAuthenticated()" to="/register" class="auth-button register">Register</RouterLink>
        <button v-if="authStore.isAuthenticated()" @click="logout" class="auth-button logout">Logout</button>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- AI Chatbot -->
    <AIChatbot />
  </div>
</template>

<style>
/* CSS Variables */
:root {
  --primary-color: #2563eb;
  --secondary-color: #1d4ed8;
  --text-color: #1f2937;
  --text-light: #6b7280;
  --background-color: #f3f4f6;
  --sidebar-width: 250px;
  --header-height: 60px;
  --border-radius: 8px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--text-color);
  background: var(--background-color);
  line-height: 1.5;
}

/* App Layout */
.app {
  display: flex;
  min-height: 100vh;
}

/* Sidebar Styles */
.sidebar {
  width: var(--sidebar-width);
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 20px;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.logo {
  padding: 20px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  text-align: center;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: var(--text-color);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: var(--background-color);
  color: var(--primary-color);
}

.nav-link.router-link-active {
  background: var(--primary-color);
  color: white;
}

.nav-link i {
  width: 20px;
  text-align: center;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: 20px;
  background: var(--background-color);
  min-height: 100vh;
}

/* Typography */
h1 {
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.75rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

/* Buttons */
button {
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Forms */
input, select, textarea {
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: var(--border-radius);
  background: white;
  color: var(--text-color);
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  background: #f8fafc;
  font-weight: 600;
  color: var(--text-color);
}

/* Cards */
.card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 0;
    padding: 0;
  }

  .main-content {
    margin-left: 0;
  }
}

.auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.auth-button {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  width: 100%;
  text-decoration: none;
}

.auth-button.login {
  background-color: var(--primary-color);
  color: white;
}

.auth-button.register {
  background-color: #e5e7eb;
  color: var(--text-color);
}

.auth-button.logout {
  background-color: #ef4444;
  color: white;
}

.auth-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>
