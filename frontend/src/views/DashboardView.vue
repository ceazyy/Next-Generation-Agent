<script setup>
import { ref } from 'vue'

const stats = ref({
  totalLeads: 156,
  newContacts: 23,
  openCases: 45,
  activeOpportunities: 78
})

const recentActivities = ref([
  {
    type: 'lead',
    title: 'New Lead Created',
    description: 'John Smith from Acme Corp',
    time: '2 hours ago'
  },
  {
    type: 'case',
    title: 'Case Escalated',
    description: 'Technical Support Required - ID #45678',
    time: '3 hours ago'
  },
  {
    type: 'opportunity',
    title: 'Deal Won',
    description: 'Enterprise Package - $50,000',
    time: '5 hours ago'
  }
])

const upcomingTasks = ref([
  {
    title: 'Follow up with Acme Corp',
    due: 'Tomorrow',
    priority: 'High'
  },
  {
    title: 'Prepare proposal for XYZ Inc',
    due: 'Next Week',
    priority: 'Medium'
  },
  {
    title: 'Client review meeting',
    due: 'Today',
    priority: 'High'
  }
])
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-funnel-dollar"></i>
        </div>
        <div class="stat-content">
          <h3>Total Leads</h3>
          <p class="stat-number">{{ stats.totalLeads }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-user-plus"></i>
        </div>
        <div class="stat-content">
          <h3>New Contacts</h3>
          <p class="stat-number">{{ stats.newContacts }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-ticket-alt"></i>
        </div>
        <div class="stat-content">
          <h3>Open Cases</h3>
          <p class="stat-number">{{ stats.openCases }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-chart-line"></i>
        </div>
        <div class="stat-content">
          <h3>Active Opportunities</h3>
          <p class="stat-number">{{ stats.activeOpportunities }}</p>
        </div>
      </div>
    </div>

    <!-- Activity and Tasks -->
    <div class="dashboard-grid">
      <!-- Recent Activities -->
      <div class="dashboard-card">
        <h2>Recent Activities</h2>
        <div class="activities-list">
          <div v-for="(activity, index) in recentActivities" 
               :key="index"
               class="activity-item">
            <div class="activity-icon">
              <i :class="[
                'fas',
                {
                  'fa-user-plus': activity.type === 'lead',
                  'fa-ticket-alt': activity.type === 'case',
                  'fa-dollar-sign': activity.type === 'opportunity'
                }
              ]"></i>
            </div>
            <div class="activity-content">
              <h4>{{ activity.title }}</h4>
              <p>{{ activity.description }}</p>
              <small>{{ activity.time }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Tasks -->
      <div class="dashboard-card">
        <h2>Upcoming Tasks</h2>
        <div class="tasks-list">
          <div v-for="(task, index) in upcomingTasks" 
               :key="index"
               class="task-item">
            <div class="task-content">
              <h4>{{ task.title }}</h4>
              <div class="task-meta">
                <span class="task-due">Due: {{ task.due }}</span>
                <span :class="['task-priority', task.priority.toLowerCase()]">
                  {{ task.priority }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  color: var(--text-color);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon {
  width: 50px;
  height: 50px;
  background: var(--primary-color);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-content h3 {
  color: var(--text-color);
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.8;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--text-color);
  margin: 5px 0 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.dashboard-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.dashboard-card h2 {
  color: var(--text-color);
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.activities-list, .tasks-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  gap: 15px;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.activity-item:hover {
  background-color: #f8f9fa;
}

.activity-icon {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.activity-content h4 {
  margin: 0;
  color: var(--text-color);
  font-size: 1rem;
}

.activity-content p {
  margin: 5px 0;
  color: var(--text-color);
  opacity: 0.8;
}

.activity-content small {
  color: var(--text-color);
  opacity: 0.6;
}

.task-item {
  padding: 15px;
  border-radius: 8px;
  background: #f8f9fa;
  transition: transform 0.3s ease;
}

.task-item:hover {
  transform: translateX(5px);
}

.task-content h4 {
  margin: 0;
  color: var(--text-color);
  font-size: 1rem;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.9rem;
}

.task-due {
  color: var(--text-color);
  opacity: 0.7;
}

.task-priority {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.task-priority.high {
  background: #ffebee;
  color: #c62828;
}

.task-priority.medium {
  background: #fff3e0;
  color: #ef6c00;
}

.task-priority.low {
  background: #e8f5e9;
  color: #2e7d32;
}
</style> 