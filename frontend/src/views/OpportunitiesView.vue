<script setup>
import { ref } from 'vue'

const opportunities = ref([
  {
    id: 1,
    name: 'Enterprise Software License',
    account: 'Acme Corporation',
    value: '$50,000',
    stage: 'Qualification',
    probability: '20%',
    expectedCloseDate: '2024-06-30',
    owner: 'John Smith'
  },
  {
    id: 2,
    name: 'Manufacturing Equipment',
    account: 'Global Industries',
    value: '$150,000',
    stage: 'Proposal',
    probability: '60%',
    expectedCloseDate: '2024-05-15',
    owner: 'Sarah Johnson'
  },
  {
    id: 3,
    name: 'Consulting Services',
    account: 'Tech Solutions Inc',
    value: '$25,000',
    stage: 'Negotiation',
    probability: '80%',
    expectedCloseDate: '2024-04-30',
    owner: 'Michael Brown'
  }
])

const showAddModal = ref(false)
const newOpportunity = ref({
  name: '',
  account: '',
  value: '',
  stage: 'Qualification',
  probability: '20%',
  expectedCloseDate: '',
  owner: ''
})

const addOpportunity = () => {
  opportunities.value.push({
    id: opportunities.value.length + 1,
    ...newOpportunity.value
  })
  showAddModal.value = false
  newOpportunity.value = {
    name: '',
    account: '',
    value: '',
    stage: 'Qualification',
    probability: '20%',
    expectedCloseDate: '',
    owner: ''
  }
}
</script>

<template>
  <div class="opportunities-view">
    <div class="header">
      <h1>Opportunities</h1>
      <button class="add-button" @click="showAddModal = true">
        <i class="fas fa-plus"></i>
        Add Opportunity
      </button>
    </div>

    <!-- Opportunities Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Account</th>
            <th>Value</th>
            <th>Stage</th>
            <th>Probability</th>
            <th>Expected Close</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="opportunity in opportunities" :key="opportunity.id">
            <td>{{ opportunity.name }}</td>
            <td>{{ opportunity.account }}</td>
            <td>{{ opportunity.value }}</td>
            <td>
              <span :class="['stage-badge', opportunity.stage.toLowerCase()]">
                {{ opportunity.stage }}
              </span>
            </td>
            <td>{{ opportunity.probability }}</td>
            <td>{{ opportunity.expectedCloseDate }}</td>
            <td>{{ opportunity.owner }}</td>
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

    <!-- Add Opportunity Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add New Opportunity</h2>
          <button class="close-button" @click="showAddModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="newOpportunity.name" placeholder="Enter opportunity name">
          </div>

          <div class="form-group">
            <label>Account</label>
            <input type="text" v-model="newOpportunity.account" placeholder="Enter account name">
          </div>

          <div class="form-group">
            <label>Value</label>
            <input type="text" v-model="newOpportunity.value" placeholder="Enter value">
          </div>

          <div class="form-group">
            <label>Stage</label>
            <select v-model="newOpportunity.stage">
              <option value="Qualification">Qualification</option>
              <option value="Needs Analysis">Needs Analysis</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
            </select>
          </div>

          <div class="form-group">
            <label>Probability</label>
            <select v-model="newOpportunity.probability">
              <option value="20%">20%</option>
              <option value="40%">40%</option>
              <option value="60%">60%</option>
              <option value="80%">80%</option>
              <option value="100%">100%</option>
            </select>
          </div>

          <div class="form-group">
            <label>Expected Close Date</label>
            <input type="date" v-model="newOpportunity.expectedCloseDate">
          </div>

          <div class="form-group">
            <label>Owner</label>
            <input type="text" v-model="newOpportunity.owner" placeholder="Enter owner name">
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-button" @click="showAddModal = false">Cancel</button>
          <button class="save-button" @click="addOpportunity">Save Opportunity</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.opportunities-view {
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

.stage-badge {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
}

.stage-badge.qualification {
  background: #e3f2fd;
  color: #1976d2;
}

.stage-badge.proposal {
  background: #fff3e0;
  color: #f57c00;
}

.stage-badge.negotiation {
  background: #e8f5e9;
  color: #2e7d32;
}

.stage-badge.closed {
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