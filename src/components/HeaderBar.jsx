import React from 'react';
import { useCRM } from '../context/CRMContext';
import { MessageSquareShare, UserCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';

export const HeaderBar = () => {
  const { activeRole, setActiveRole, openWhatsAppSmartSummarizer } = useCRM();

  const roles = [
    { id: 'Manager', label: '👑 Owner / Manager' },
    { id: 'Sales', label: '💼 Sales Exec' },
    { id: 'Delivery', label: '🚚 Delivery Staff' },
    { id: 'Collection', label: '💰 Collection Exec' },
    { id: 'Accountant', label: '📊 Accountant' }
  ];

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'var(--header-bg)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '12px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 110
    }}>
      {/* Top Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        
        {/* Imported Brand Logo Emblem & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 180, 115, 0.25)',
            border: '1px solid var(--border-color)',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            flexShrink: 0
          }}>
            <img
              src={logoImg}
              alt="Mangalsai CRM Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.1, margin: 0 }}>
                Mangalsai CRM
              </h1>
              <span className="pulse-dot-mint" />
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>
              Enterprise Operations
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
          {/* WhatsApp AI Shortcut */}
          <button
            onClick={() => openWhatsAppSmartSummarizer('daily')}
            title="WhatsApp AI Card"
            style={{
              background: 'rgba(0, 180, 115, 0.12)',
              border: '1px solid rgba(0, 180, 115, 0.35)',
              color: 'var(--accent-mint)',
              padding: '8px 14px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              display: 'inline-flex',
              alignItems: 'center',
              justify: 'center',
              gap: '6px',
              cursor: 'pointer',
              lineHeight: 1,
              outline: 'none',
              boxShadow: '0 2px 6px rgba(0, 180, 115, 0.15)',
              transition: 'all 0.2s ease'
            }}
          >
            <MessageSquareShare size={14} />
            <span>WA Assistant</span>
          </button>
        </div>
      </div>

      {/* Role Switcher Selector Bar */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: '10px',
        border: '1px solid var(--border-color)',
        padding: '6px 10px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)' }}>
          <UserCheck size={14} color="var(--accent-mint)" />
          <span>Active Role:</span>
        </div>

        <select
          value={activeRole}
          onChange={(e) => setActiveRole(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-mint)',
            fontSize: '12px',
            fontWeight: '700',
            fontFamily: 'var(--font-display)',
            outline: 'none',
            cursor: 'pointer',
            padding: '2px 4px'
          }}
        >
          {roles.map(r => (
            <option key={r.id} value={r.id} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
