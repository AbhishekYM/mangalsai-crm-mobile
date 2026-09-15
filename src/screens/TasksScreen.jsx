import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Plus, Clock, Filter, ChevronRight, User } from 'lucide-react';

export const TasksScreen = () => {
  const { tasks, setSelectedTask, setIsCreateTaskOpen } = useCRM();
  
  const [activeTab, setActiveTab] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');

  const tabs = ['All', 'Due Today', 'Pending', 'Overdue', 'Completed', 'On Hold'];
  const departments = ['All', 'Sales', 'Banking', 'Office Staff', 'Delivery', 'Renewal / Collection', 'Accounts'];

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'Due Today' && !task.dueDate.includes('Today')) return false;
    if (activeTab === 'Pending' && (task.status === 'Completed' || task.status === 'Cancelled')) return false;
    if (activeTab === 'Overdue' && !task.dueDate.includes('Overdue')) return false;
    if (activeTab === 'Completed' && task.status !== 'Completed') return false;
    if (activeTab === 'On Hold' && task.status !== 'On Hold') return false;

    if (selectedDept !== 'All' && task.department !== selectedDept) return false;

    return true;
  });

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High': return 'badge-danger';
      case 'Medium': return 'badge-warning';
      default: return 'badge-mint';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'badge-success';
      case 'In Progress': return 'badge-mint';
      case 'On Hold': return 'badge-warning';
      case 'Overdue': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="screen-container">
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            Task Operations
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Module 1 — {filteredTasks.length} Tasks Active
          </span>
        </div>
        <button
          onClick={() => setIsCreateTaskOpen(true)}
          className="btn btn-mint btn-sm"
        >
          <Plus size={15} />
          Create Task
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-chip ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Department Dropdown Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
        <Filter size={14} color="var(--accent-mint)" />
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="form-select"
          style={{ padding: '8px 12px', fontSize: '12px', fontFamily: 'var(--font-display)' }}
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>Dept: {dept}</option>
          ))}
        </select>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: 'var(--text-muted)',
          fontSize: '13px',
          background: 'var(--bg-card)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)'
        }}>
          No tasks found matching current tab.
        </div>
      ) : (
        filteredTasks.map(task => (
          <div
            key={task.id}
            className="card"
            onClick={() => setSelectedTask(task)}
            style={{ cursor: 'pointer', padding: '22px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                {task.priority} Priority
              </span>
              <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                {task.status}
              </span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
              {task.title}
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.4 }}>
              {task.description}
            </p>

            {task.status === 'On Hold' && task.holdReason && (
              <div style={{
                background: 'var(--status-warning-bg)',
                color: 'var(--status-warning)',
                padding: '10px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                marginBottom: '16px',
                fontWeight: '600'
              }}>
                ⚠️ Reason: {task.holdReason}
              </div>
            )}

            {/* Footer */}
            <div style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              paddingTop: '14px',
              borderTop: '1px solid var(--border-color)',
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="var(--accent-mint)" />
                <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{task.assignedTo}</span>
                <span>({task.department})</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} />
                <span style={{ fontWeight: '700', fontFamily: 'var(--font-display)', color: task.dueDate.includes('Overdue') ? 'var(--status-danger)' : 'var(--text-secondary)' }}>
                  {task.dueDate}
                </span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
