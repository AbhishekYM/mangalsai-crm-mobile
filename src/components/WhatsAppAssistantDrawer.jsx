import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { X, Send, Copy, Check, MessageSquareShare, Sparkles } from 'lucide-react';

export const WhatsAppAssistantDrawer = () => {
  const { isWhatsAppOpen, setIsWhatsAppOpen, whatsAppMessageText, setWhatsAppMessageText } = useCRM();
  const [copied, setCopied] = useState(false);

  if (!isWhatsAppOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsAppMessageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(whatsAppMessageText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-sheet" style={{ borderTop: '2px solid #25D366' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: '#25D366',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}>
              <MessageSquareShare size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '900', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                WhatsApp AI Smart Assistant
              </h3>
              <span style={{ fontSize: '10px', color: '#25D366', fontWeight: '800' }}>
                Auto-Formatted Business Message
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsWhatsAppOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Message Editor */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} color="#25D366" /> Generated WhatsApp Card Text
          </label>
          <textarea
            rows={7}
            value={whatsAppMessageText}
            onChange={(e) => setWhatsAppMessageText(e.target.value)}
            className="form-textarea"
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              lineHeight: 1.5
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <button
            onClick={handleCopy}
            className="btn btn-secondary btn-full"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            {copied ? <Check size={16} color="var(--status-success)" /> : <Copy size={16} />}
            {copied ? 'Copied to Clipboard!' : 'Copy Text'}
          </button>

          <button
            onClick={handleSendWhatsApp}
            className="btn btn-full"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '6px',
              boxShadow: '0 8px 20px rgba(37, 211, 102, 0.35)'
            }}
          >
            <Send size={16} />
            Share via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};
