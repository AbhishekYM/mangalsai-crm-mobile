import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { X, CheckCircle, PhoneCall, DollarSign } from 'lucide-react';

export const LogFollowUpModal = () => {
  const { selectedCollection, setSelectedCollection, logCollectionFollowUp, recordPayment } = useCRM();

  const [status, setStatus] = useState('Promise To Pay');
  const [noteText, setNoteText] = useState('');
  const [nextDate, setNextDate] = useState('18-Sep-2026');
  const [paymentAmt, setPaymentAmt] = useState('');

  if (!selectedCollection) return null;

  const handleSaveFollowup = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    logCollectionFollowUp(selectedCollection.id, status, noteText, nextDate);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentAmt || Number(paymentAmt) <= 0) return;
    recordPayment(selectedCollection.id, paymentAmt);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-sheet">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
              Log Collection Follow-up
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{selectedCollection.customer}</span>
          </div>
          <button
            onClick={() => setSelectedCollection(null)}
            className="modal-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Current Balance Card */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          padding: '10px 14px',
          marginBottom: '14px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Current Due:</div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--status-danger)' }}>
              ₹{selectedCollection.outstandingAmount.toLocaleString('en-IN')}
            </div>
          </div>
          <span className="badge badge-primary">{selectedCollection.assignedExecutive}</span>
        </div>

        {/* Record Payment Option */}
        <div style={{
          background: 'var(--status-success-bg)',
          border: '1px solid var(--status-success)',
          borderRadius: '12px',
          padding: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--status-success)', marginBottom: '6px' }}>
            💳 Quick Record Payment Received
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input
              type="number"
              placeholder="Enter collected amount (₹)"
              value={paymentAmt}
              onChange={(e) => setPaymentAmt(e.target.value)}
              className="form-input"
              style={{ flex: 1 }}
            />
            <button
              onClick={handlePaymentSubmit}
              className="btn btn-sm"
              style={{ background: 'var(--status-success)', color: 'white' }}
            >
              Record Payment
            </button>
          </div>
        </div>

        {/* Log Call Outcome Form */}
        <form onSubmit={handleSaveFollowup}>
          <div className="form-group">
            <label className="form-label">Call Outcome Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-select"
            >
              <option value="Contacted">📞 Contacted (Spoke to accountant/owner)</option>
              <option value="Promise To Pay">🤝 Promise To Pay (PTP)</option>
              <option value="Follow-up Required">⏳ Follow-up Required (Visit needed)</option>
              <option value="Paid">✅ Fully Paid & Cleared</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Follow-up Remarks / Notes *</label>
            <textarea
              rows={3}
              required
              placeholder="Details of call discussion or promise date details..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Schedule Next Follow-up Date</label>
            <input
              type="text"
              value={nextDate}
              onChange={(e) => setNextDate(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            <PhoneCall size={16} />
            Save Call Log & Schedule Follow-up
          </button>
        </form>
      </div>
    </div>
  );
};
