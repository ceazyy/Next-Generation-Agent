<script setup>
import { ref } from 'vue'

const metrics = ref({
  totalLeads: 245,
  newLeadsThisMonth: 32,
  conversionRate: '18%',
  avgDealSize: '$45,000',
  totalRevenue: '$2.5M',
  openOpportunities: 28,
  activeAccounts: 156,
  customerSatisfaction: '4.2/5'
})

const recentActivity = ref([
  {
    id: 1,
    type: 'New Lead',
    description: 'New lead created for XYZ Corp',
    date: '2024-04-05',
    user: 'John Smith'
  },
  {
    id: 2,
    type: 'Opportunity Won',
    description: 'Closed deal with Acme Corp - $50,000',
    date: '2024-04-04',
    user: 'Sarah Johnson'
  },
  {
    id: 3,
    type: 'Task Completed',
    description: 'Follow-up call with Tech Solutions Inc',
    date: '2024-04-03',
    user: 'Michael Brown'
  }
])
</script>

<template>
  <div class="reports-view">
    <div class="header">
      <h1>Reports & Analytics</h1>
      <div class="date-filter">
        <select>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-quarter">This Quarter</option>
          <option value="last-quarter">Last Quarter</option>
          <option value="this-year">This Year</option>
        </select>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Total Leads</h3>
        <div class="metric-value">{{ metrics.totalLeads }}</div>
        <div class="metric-label">New this month: {{ metrics.newLeadsThisMonth }}</div>
      </div>

      <div class="metric-card">
        <h3>Conversion Rate</h3>
        <div class="metric-value">{{ metrics.conversionRate }}</div>
        <div class="metric-label">Lead to Opportunity</div>
      </div>

      <div class="metric-card">
        <h3>Average Deal Size</h3>
        <div class="metric-value">{{ metrics.avgDealSize }}</div>
        <div class="metric-label">Based on won opportunities</div>
      </div>

      <div class="metric-card">
        <h3>Total Revenue</h3>
        <div class="metric-value">{{ metrics.totalRevenue }}</div>
        <div class="metric-label">Year to date</div>
      </div>

      <div class="metric-card">
        <h3>Open Opportunities</h3>
        <div class="metric-value">{{ metrics.openOpportunities }}</div>
        <div class="metric-label">Total pipeline value</div>
      </div>

      <div class="metric-card">
        <h3>Active Accounts</h3>
        <div class="metric-value">{{ metrics.activeAccounts }}</div>
        <div class="metric-label">Currently engaged</div>
      </div>

      <div class="metric-card">
        <h3>Customer Satisfaction</h3>
        <div class="metric-value">{{ metrics.customerSatisfaction }}</div>
        <div class="metric-label">Average rating</div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="section">
      <h2>Recent Activity</h2>
      <div class="activity-list">
        <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
          <div class="activity-icon" :class="activity.type.toLowerCase().replace(' ', '-')">
            <i class="fas" :class="{
              'fa-user-plus': activity.type === 'New Lead',
              'fa-check-circle': activity.type === 'Opportunity Won',
              'fa-tasks': activity.type === 'Task Completed'
            }"></i>
          </div>
          <div class="activity-content">
            <div class="activity-header">
              <span class="activity-type">{{ activity.type }}</span>
              <span class="activity-date">{{ activity.date }}</span>
            </div>
            <div class="activity-description">{{ activity.description }}</div>
            <div class="activity-user">By {{ activity.user }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reports-view {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.date-filter select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: var(--text-color);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.metric-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.metric-card h3 {
  margin: 0 0 10px 0;
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 500;
}

.metric-value {
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.metric-label {
  font-size: 0.9rem;
  color: #666;
}

.section {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 20px;
}

.section h2 {
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  color: var(--text-color);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  background: #f8f9fa;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.activity-icon.new-lead {
  background: #1976d2;
}

.activity-icon.opportunity-won {
  background: #2e7d32;
}

.activity-icon.task-completed {
  background: #f57c00;
}

.activity-content {
  flex: 1;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.activity-type {
  font-weight: 500;
  color: var(--text-color);
}

.activity-date {
  font-size: 0.9rem;
  color: #666;
}

.activity-description {
  margin-bottom: 5px;
  color: var(--text-color);
}

.activity-user {
  font-size: 0.9rem;
  color: #666;
}
</style> 