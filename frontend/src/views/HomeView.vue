<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home-container">
    <div class="hero">
      <h1>Welcome to CRM AI</h1>
      <p>Manage your customer relationships smarter with AI assistance</p>
      <div class="cta-buttons">
        <RouterLink to="/login" class="cta-button login">Login</RouterLink>
        <RouterLink to="/register" class="cta-button register">Register</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 4rem);
  background-color: #f8fafc;
}

.hero {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
}

h1 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

p {
  font-size: 1.25rem;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cta-button {
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button.login {
  background-color: var(--primary-color);
  color: white;
}

.cta-button.register {
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
