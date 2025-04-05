<script setup>
import { ref } from 'vue'

const contacts = ref([
  {
    id: 1,
    name: 'John Smith',
    company: 'Acme Corp',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    lastContact: '2024-04-05'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    company: 'Tech Solutions Inc',
    email: 'sarah.j@techsolutions.com',
    phone: '+1 (555) 987-6543',
    status: 'Active',
    lastContact: '2024-04-04'
  },
  {
    id: 3,
    name: 'Michael Brown',
    company: 'Global Industries',
    email: 'm.brown@global.com',
    phone: '+1 (555) 456-7890',
    status: 'Inactive',
    lastContact: '2024-03-30'
  }
])

const showAddModal = ref(false)
const newContact = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  status: 'Active'
})

const addContact = () => {
  contacts.value.push({
    id: contacts.value.length + 1,
    ...newContact.value,
    lastContact: new Date().toISOString().split('T')[0]
  })
  showAddModal.value = false
  newContact.value = {
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'Active'
  }
}
</script>

<template>
  <div class="contacts-view">
    <div class="header">
      <h1>Contacts</h1>
      <button class="add-button" @click="showAddModal = true">
        <i class="fas fa-plus"></i>
        Add Contact
      </button>
    </div>

    <!-- Contacts Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Last Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.id">
            <td>{{ contact.name }}</td>
            <td>{{ contact.company }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.phone }}</td>
            <td>
              <span :class="['status-badge', contact.status.toLowerCase()]">
                {{ contact.status }}
              </span>
            </td>
            <td>{{ contact.lastContact }}</td>
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

    <!-- Add Contact Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add New Contact</h2>
          <button class="close-button" @click="showAddModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="newContact.name" placeholder="Enter name">
          </div>

          <div class="form-group">
            <label>Company</label>
            <input type="text" v-model="newContact.company" placeholder="Enter company">
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="newContact.email" placeholder="Enter email">
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input type="tel" v-model="newContact.phone" placeholder="Enter phone">
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="newContact.status">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-button" @click="showAddModal = false">Cancel</button>
          <button class="save-button" @click="addContact">Save Contact</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contacts-view {
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