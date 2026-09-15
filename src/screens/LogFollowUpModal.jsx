import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { X, CheckCircle, PhoneCall, DollarSign, Building2, User } from 'lucide-react';

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
    setPaymentAmt('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-sheet" style={{ padding: '24px' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              Log Collection Follow-up
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <Building2 size={13} color="var(--accent-mint)" />
              <span style={{ fontSize: '12px', color: 'var(--accent-mint)', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                {selectedCollection.customer}
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedCollection(null)}
            className="modal-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Crisp 2-Column Balance & Assigned Executive Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-color)',
          borderRadius: '20px',
          padding: '16px 18px',
          marginBottom: '18px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Left Column: Outstanding Amount */}
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-display)' }}>
              CURRENT DUE AMOUNT
            </div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--status-danger)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
              ₹{selectedCollection.outstandingAmount.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Right Column: Assigned Executive (Aligned Right) */}
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
              ASSIGNED EXEC
            </div>
            <span className="badge badge-mint" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <User size={12} /> {selectedCollection.assignedExecutive}
            </span>
          </div>
        </div>

        {/* Quick Record Payment Option */}
        <div style={{
          background: 'var(--status-success-bg)',
          border: '1.5px solid rgba(0, 180, 115, 0.35)',
          borderRadius: '18px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            color: 'var(--status-success)', 
            marginBottom: '10px', 
            fontFamily: 'var(--font-display)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            💳 Quick Record Payment Received
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <input
              type="number"
              placeholder="Enter Collected Amount (₹)"
              value={paymentAmt}
              onChange={(e) => setPaymentAmt(e.target.value)}
              className="form-input"
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                fontSize: '13px',
                fontWeight: '600',
                background: '#FFFFFF'
              }}
            />
          </div>

          <button
            onClick={handlePaymentSubmit}
            className="btn btn-mint btn-full"
            style={{ padding: '11px 16px', borderRadius: '12px', fontSize: '13px' }}
          >
            Record Payment
          </button>
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

          <button type="submit" className="btn btn-mint btn-full" style={{ padding: '14px', borderRadius: '16px', fontSize: '14px' }}>
            <PhoneCall size={16} />
            Save Call Log & Schedule Follow-up
          </button>
        </form>
      </div>
    </div>
  );
};
