<script setup>
import { ref } from 'vue'

const tasks = ref([
  {
    id: 1,
    title: 'Follow up with Acme Corp',
    description: 'Schedule a demo of the new product features',
    dueDate: '2024-04-10',
    priority: 'High',
    status: 'Pending',
    assignedTo: 'John Smith',
    relatedTo: 'Acme Corporation'
  },
  {
    id: 2,
    title: 'Prepare proposal',
    description: 'Create detailed proposal for manufacturing equipment',
    dueDate: '2024-04-15',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Sarah Johnson',
    relatedTo: 'Global Industries'
  },
  {
    id: 3,
    title: 'Contract review',
    description: 'Review and finalize consulting services contract',
    dueDate: '2024-04-20',
    priority: 'Low',
    status: 'Completed',
    assignedTo: 'Michael Brown',
    relatedTo: 'Tech Solutions Inc'
  }
])

const showAddModal = ref(false)
const newTask = ref({
  title: '',
  description: '',
  dueDate: '',
  priority: 'Medium',
  status: 'Pending',
  assignedTo: '',
  relatedTo: ''
})

const addTask = () => {
  tasks.value.push({
    id: tasks.value.length + 1,
    ...newTask.value
  })
  showAddModal.value = false
  newTask.value = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    assignedTo: '',
    relatedTo: ''
  }
}
</script>

<template>
  <div class="tasks-view">
    <div class="header">
      <h1>Tasks</h1>
      <button class="add-button" @click="showAddModal = true">
        <i class="fas fa-plus"></i>
        Add Task
      </button>
    </div>

    <!-- Tasks Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Related To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ task.dueDate }}</td>
            <td>
              <span :class="['priority-badge', task.priority.toLowerCase()]">
                {{ task.priority }}
              </span>
            </td>
            <td>
              <span :class="['status-badge', task.status.toLowerCase().replace(' ', '-')]">
                {{ task.status }}
              </span>
            </td>
            <td>{{ task.assignedTo }}</td>
            <td>{{ task.relatedTo }}</td>
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

    <!-- Add Task Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add New Task</h2>
          <button class="close-button" @click="showAddModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Title</label>
            <input type="text" v-model="newTask.title" placeholder="Enter task title">
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="newTask.description" placeholder="Enter task description" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label>Due Date</label>
            <input type="date" v-model="newTask.dueDate">
          </div>

          <div class="form-group">
            <label>Priority</label>
            <select v-model="newTask.priority">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="newTask.status">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div class="form-group">
            <label>Assigned To</label>
            <input type="text" v-model="newTask.assignedTo" placeholder="Enter assignee name">
          </div>

          <div class="form-group">
            <label>Related To</label>
            <input type="text" v-model="newTask.relatedTo" placeholder="Enter related account/contact">
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-button" @click="showAddModal = false">Cancel</button>
          <button class="save-button" @click="addTask">Save Task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tasks-view {
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

.priority-badge,
.status-badge {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
}

.priority-badge.high {
  background: #ffebee;
  color: #c62828;
}

.priority-badge.medium {
  background: #fff3e0;
  color: #f57c00;
}

.priority-badge.low {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.pending {
  background: #e3f2fd;
  color: #1976d2;
}

.status-badge.in-progress {
  background: #fff3e0;
  color: #f57c00;
}

.status-badge.completed {
  background: #e8f5e9;
  color: #2e7d32;
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
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: var(--text-color);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
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