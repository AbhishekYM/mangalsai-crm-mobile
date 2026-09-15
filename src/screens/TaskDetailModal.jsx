import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { X, Play, CheckCircle, PauseCircle, Send, Clock, User, MessageSquare } from 'lucide-react';

export const TaskDetailModal = () => {
  const { selectedTask, setSelectedTask, updateTaskStatus, addProgressComment, activeRole } = useCRM();
  
  const [commentText, setCommentText] = useState('');
  const [showHoldPrompt, setShowHoldPrompt] = useState(false);
  const [holdReasonText, setHoldReasonText] = useState('');

  if (!selectedTask) return null;

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addProgressComment(selectedTask.id, commentText);
    setCommentText('');
  };

  const handlePutOnHold = () => {
    if (!holdReasonText.trim()) return;
    updateTaskStatus(selectedTask.id, 'On Hold', 'Put task on hold', holdReasonText);
    setShowHoldPrompt(false);
    setHoldReasonText('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-sheet">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '4px' }}>{selectedTask.department}</span>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>
              {selectedTask.title}
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {selectedTask.id}</span>
          </div>
          <button
            onClick={() => setSelectedTask(null)}
            className="modal-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Task Metadata Card */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          padding: '12px',
          marginBottom: '14px',
          fontSize: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Assigned Employee:</span>
            <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{selectedTask.assignedTo}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Priority:</span>
            <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{selectedTask.priority}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Due Date:</span>
            <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{selectedTask.dueDate}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Current Status:</span>
            <span className="badge badge-success" style={{ fontSize: '10px' }}>{selectedTask.status}</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '14px' }}>
          <div className="form-label">Task Description</div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            {selectedTask.description}
          </p>
        </div>

        {/* Status Action Buttons */}
        <div style={{ marginBottom: '16px' }}>
          <div className="form-label">Employee Actions</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {selectedTask.status !== 'In Progress' && selectedTask.status !== 'Completed' && (
              <button
                onClick={() => updateTaskStatus(selectedTask.id, 'In Progress', 'Started working on this task')}
                className="btn btn-primary btn-sm"
              >
                <Play size={12} />
                Start
              </button>
            )}

            {selectedTask.status !== 'Completed' && (
              <button
                onClick={() => updateTaskStatus(selectedTask.id, 'Completed', 'Task marked completed')}
                className="btn btn-sm"
                style={{ background: 'var(--status-success)', color: 'white' }}
              >
                <CheckCircle size={12} />
                Complete
              </button>
            )}

            {selectedTask.status !== 'On Hold' && selectedTask.status !== 'Completed' && (
              <button
                onClick={() => setShowHoldPrompt(true)}
                className="btn btn-sm"
                style={{ background: 'var(--status-warning-bg)', color: 'var(--status-warning)', border: '1px solid var(--status-warning)' }}
              >
                <PauseCircle size={12} />
                On Hold
              </button>
            )}
          </div>
        </div>

        {/* Hold Reason Form Overlay */}
        {showHoldPrompt && (
          <div style={{
            background: 'var(--status-warning-bg)',
            border: '1px solid var(--status-warning)',
            borderRadius: '12px',
            padding: '12px',
            marginBottom: '14px'
          }}>
            <label className="form-label" style={{ color: 'var(--status-warning)' }}>Reason for placing On Hold:</label>
            <input
              type="text"
              placeholder="e.g. Awaiting client confirmation"
              value={holdReasonText}
              onChange={(e) => setHoldReasonText(e.target.value)}
              className="form-input"
              style={{ marginBottom: '8px' }}
            />
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowHoldPrompt(false)} className="btn btn-secondary btn-sm">Cancel</button>
              <button onClick={handlePutOnHold} className="btn btn-sm" style={{ background: 'var(--status-warning)', color: 'white' }}>Save Hold Status</button>
            </div>
          </div>
        )}

        {/* Live Timeline Updates */}
        <div>
          <div className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MessageSquare size={13} />
            Progress Updates & Discussion
          </div>

          <div style={{
            maxHeight: '160px',
            overflowY: 'auto',
            marginBottom: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {selectedTask.comments?.length === 0 ? (
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>No comments yet. Add an update below.</div>
            ) : (
              selectedTask.comments.map(c => (
                <div key={c.id} style={{
                  background: 'var(--bg-secondary)',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>{c.author}</span>
                    <span>{c.time}</span>
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>{c.text}</div>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Input */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <input
              type="text"
              placeholder="Add progress comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              className="form-input"
              style={{ flex: 1 }}
            />
            <button onClick={handleAddComment} className="btn btn-primary btn-sm">
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
