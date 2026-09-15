import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Wallet, PhoneCall, Calendar, User, Phone, ChevronRight } from 'lucide-react';

export const CollectionsScreen = () => {
  const { collections, setSelectedCollection } = useCRM();

  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Promise To Pay', 'Follow-up Required', 'Pending', 'Paid'];

  const filteredCollections = collections.filter(c => {
    if (activeTab === 'All') return true;
    return c.status === activeTab;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid': return 'badge-success';
      case 'Promise To Pay': return 'badge-primary';
      case 'Follow-up Required': return 'badge-danger';
      case 'Contacted': return 'badge-warning';
      default: return 'badge-secondary';
    }
  };

  const totalOutstanding = collections.reduce((acc, curr) => acc + (curr.outstandingAmount || 0), 0);

  return (
    <div className="screen-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            Collections & Renewals
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Module 3 — Total Debt: ₹{totalOutstanding.toLocaleString('en-IN')}
          </span>
        </div>
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

      {/* Spacious De-cluttered Customer Cards */}
      {filteredCollections.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: 'var(--text-muted)',
          fontSize: '13px',
          background: 'var(--bg-card)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)'
        }}>
          No customer accounts in "{activeTab}" status.
        </div>
      ) : (
        filteredCollections.map(item => (
          <div key={item.id} className="card" style={{ padding: '22px' }}>
            {/* Top Row: Customer Name & Status Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-primary" style={{ fontSize: '10px', marginBottom: '4px' }}>{item.id}</span>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
                  {item.customer}
                </h3>
              </div>
              <span className={`badge ${getStatusBadge(item.status)}`}>
                {item.status}
              </span>
            </div>

            {/* Contact Info Row */}
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={13} color="var(--accent-mint)" />
              <span>Contact: <strong style={{ color: 'var(--text-primary)' }}>{item.contactPerson}</strong></span>
            </div>

            {/* Stacked Outstanding Box with Divider Line (Zero Overlap Guaranteed) */}
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '16px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {/* Row 1: Balance */}
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px' }}>
                  OUTSTANDING BALANCE
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  color: item.outstandingAmount > 0 ? 'var(--status-danger)' : 'var(--status-success)',
                  fontFamily: 'var(--font-display)',
                  marginTop: '2px'
                }}>
                  ₹{item.outstandingAmount.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'var(--border-color)', width: '100%' }} />

              {/* Row 2: 2-Column Info Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '12px' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: '700', letterSpacing: '0.4px' }}>DUE DATE</div>
                  <div style={{ color: item.dueDate.includes('Overdue') ? 'var(--status-danger)' : 'var(--text-primary)', fontWeight: '700', marginTop: '2px' }}>
                    {item.dueDate}
                  </div>
                </div>

                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: '700', letterSpacing: '0.4px' }}>ASSIGNED EXEC</div>
                  <div style={{ color: 'var(--accent-mint)', fontWeight: '700', marginTop: '2px' }}>
                    {item.assignedExecutive}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Followup Schedule */}
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Calendar size={14} color="var(--accent-mint)" />
                <span>Next Follow-up Date: <strong style={{ color: 'var(--text-primary)' }}>{item.nextFollowUpDate}</strong></span>
              </div>

              {item.history?.length > 0 && (
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  background: 'var(--bg-primary)',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  borderLeft: '3px solid var(--accent-mint)',
                  lineHeight: 1.4
                }}>
                  Latest Note ({item.history[item.history.length - 1].date}): "{item.history[item.history.length - 1].note}"
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => setSelectedCollection(item)}
              className="btn btn-mint btn-sm btn-full"
              style={{ padding: '12px' }}
            >
              <PhoneCall size={15} />
              Log Follow-up & Payment
            </button>
          </div>
        ))
      )}
    </div>
  );
};
