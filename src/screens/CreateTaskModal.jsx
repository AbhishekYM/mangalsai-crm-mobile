import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { X, CheckCircle2, Paperclip } from 'lucide-react';

export const CreateTaskModal = () => {
  const { isCreateTaskOpen, setIsCreateTaskOpen, createTask } = useCRM();

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Sales');
  const [assignedTo, setAssignedTo] = useState('Rahul Gohil');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('Today, 6:00 PM');
  const [description, setDescription] = useState('');

  if (!isCreateTaskOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask({
      title,
      department,
      assignedTo,
      priority,
      dueDate,
      description: description || 'No description provided.'
    });

    // Reset Form
    setTitle('');
    setDescription('');
  };

  const employees = ['Rahul Gohil', 'Priya Sharma', 'Ramesh Kumar', 'Vikram Singh', 'Amit Patel', 'Suresh Patel', 'Neha Varma'];
  const departments = ['Sales', 'Banking', 'Office Staff', 'Delivery', 'Renewal / Collection', 'Accounts'];

  return (
    <div className="modal-overlay">
      <div className="modal-sheet">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
            Create New Task
          </h3>
          <button
            onClick={() => setIsCreateTaskOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Follow up on payment PO"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="form-select"
              >
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assign Employee</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="form-select"
              >
                {employees.map(emp => <option key={emp} value={emp}>{emp}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-select"
              >
                <option value="High">🔴 High Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="Low">🟢 Low Priority</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Due Date / Time</label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description / Instructions</label>
            <textarea
              rows={3}
              placeholder="Enter task details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div style={{
            padding: '10px',
            border: '1px dashed var(--border-color)',
            borderRadius: '10px',
            textAlign: 'center',
            fontSize: '11px',
            color: 'var(--text-muted)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            gap: '6px'
          }}>
            <Paperclip size={14} />
            <span>Attach Proof Document / Image (Optional)</span>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            <CheckCircle2 size={16} />
            Assign Task
          </button>
        </form>
      </div>
    </div>
  );
};
