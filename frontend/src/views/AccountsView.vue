<script setup>
import { ref } from 'vue'

const accounts = ref([
  {
    id: 1,
    name: 'Acme Corporation',
    industry: 'Technology',
    revenue: '$5M - $10M',
    employees: '50-100',
    status: 'Active',
    location: 'New York, USA',
    lastContact: '2024-04-05'
  },
  {
    id: 2,
    name: 'Global Industries',
    industry: 'Manufacturing',
    revenue: '$10M - $50M',
    employees: '100-500',
    status: 'Active',
    location: 'Chicago, USA',
    lastContact: '2024-04-04'
  },
  {
    id: 3,
    name: 'Tech Solutions Inc',
    industry: 'Software',
    revenue: '$1M - $5M',
    employees: '10-50',
    status: 'Inactive',
    location: 'San Francisco, USA',
    lastContact: '2024-03-30'
  }
])

const showAddModal = ref(false)
const newAccount = ref({
  name: '',
  industry: '',
  revenue: '',
  employees: '',
  status: 'Active',
  location: ''
})

const addAccount = () => {
  accounts.value.push({
    id: accounts.value.length + 1,
    ...newAccount.value,
    lastContact: new Date().toISOString().split('T')[0]
  })
  showAddModal.value = false
  newAccount.value = {
    name: '',
    industry: '',
    revenue: '',
    employees: '',
    status: 'Active',
    location: ''
  }
}
</script>

<template>
  <div class="accounts-view">
    <div class="header">
      <h1>Accounts</h1>
      <button class="add-button" @click="showAddModal = true">
        <i class="fas fa-plus"></i>
        Add Account
      </button>
    </div>

    <!-- Accounts Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Revenue</th>
            <th>Employees</th>
            <th>Status</th>
            <th>Location</th>
            <th>Last Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account.id">
            <td>{{ account.name }}</td>
            <td>{{ account.industry }}</td>
            <td>{{ account.revenue }}</td>
            <td>{{ account.employees }}</td>
            <td>
              <span :class="['status-badge', account.status.toLowerCase()]">
                {{ account.status }}
              </span>
            </td>
            <td>{{ account.location }}</td>
            <td>{{ account.lastContact }}</td>
            <td>
              <div class="actions">
                <button class="action-button">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-button">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Account Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add New Account</h2>
          <button class="close-button" @click="showAddModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="newAccount.name" placeholder="Enter company name">
          </div>

          <div class="form-group">
            <label>Industry</label>
            <select v-model="newAccount.industry">
              <option value="Technology">Technology</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Software">Software</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label>Annual Revenue</label>
            <select v-model="newAccount.revenue">
              <option value="$0 - $1M">$0 - $1M</option>
              <option value="$1M - $5M">$1M - $5M</option>
              <option value="$5M - $10M">$5M - $10M</option>
              <option value="$10M - $50M">$10M - $50M</option>
              <option value="$50M+">$50M+</option>
            </select>
          </div>

          <div class="form-group">
            <label>Number of Employees</label>
            <select v-model="newAccount.employees">
              <option value="1-10">1-10</option>
              <option value="10-50">10-50</option>
              <option value="50-100">50-100</option>
              <option value="100-500">100-500</option>
              <option value="500+">500+</option>
            </select>
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="newAccount.status">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div class="form-group">
            <label>Location</label>
            <input type="text" v-model="newAccount.location" placeholder="Enter location">
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-button" @click="showAddModal = false">Cancel</button>
          <button class="save-button" @click="addAccount">Save Account</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accounts-view {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.add-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
}

.add-button:hover {
  background: var(--secondary-color);
}

.table-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  color: var(--text-color);
  font-weight: 600;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
}

.status-badge.active {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.inactive {
  background: #ffebee;
  color: #c62828;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-button {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.action-button:hover {
  opacity: 1;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-color);
}

.close-button {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0.6;
}

.close-button:hover {
  opacity: 1;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--text-color);
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: var(--text-color);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-button,
.save-button {
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.cancel-button {
  background: none;
  border: 1px solid #ddd;
  color: var(--text-color);
}

.save-button {
  background: var(--primary-color);
  border: none;
  color: white;
}

.save-button:hover {
  background: var(--secondary-color);
}
</style> 