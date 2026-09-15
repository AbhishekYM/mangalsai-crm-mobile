import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { ShoppingBag, Truck, CheckCircle2, Plus, MapPin, User, Package, Navigation, MessageSquareShare } from 'lucide-react';

export const OrdersScreen = () => {
  const { orders, updateOrderStatus, setIsCreateOrderOpen, setSelectedGpsOrder, openWhatsAppSmartSummarizer } = useCRM();
  
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Confirmed', 'Preparing', 'Ready for Delivery', 'Out For Delivery', 'Delivered'];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'All') return true;
    return order.status === activeTab;
  });

  const getOrderStatusBadge = (status) => {
    switch (status) {
      case 'Delivered': return 'badge-success';
      case 'Out For Delivery': return 'badge-primary';
      case 'Ready for Delivery': return 'badge-warning';
      case 'Confirmed': return 'badge-secondary';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="screen-container">
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
            Order & Delivery
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Module 2 — {filteredOrders.length} Orders Active
          </span>
        </div>
        <button
          onClick={() => setIsCreateOrderOpen(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={15} />
          Create Order
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

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: 'var(--text-muted)',
          fontSize: '13px',
          background: 'var(--bg-card)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}>
          No orders found in "{activeTab}" status.
        </div>
      ) : (
        filteredOrders.map(order => (
          <div key={order.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-primary" style={{ fontSize: '10px' }}>{order.id}</span>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
                  {order.customer}
                </h3>
              </div>
              <span className={`badge ${getOrderStatusBadge(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* Products Box */}
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '14px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <Package size={16} color="var(--accent-primary)" style={{ marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Items Ordered:</div>
                <div style={{ marginTop: '2px' }}>{order.products}</div>
              </div>
            </div>

            {/* Address & Logistics Info */}
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="var(--status-danger)" />
                <span style={{ color: 'var(--text-secondary)' }}>{order.address} ({order.area})</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={13} />
                  <span>Driver: <strong style={{ color: 'var(--text-primary)' }}>{order.assignedDeliveryPerson}</strong></span>
                </div>
                <span style={{ fontWeight: '800', color: 'var(--status-success)', fontSize: '16px' }}>
                  {order.totalAmount}
                </span>
              </div>
            </div>

            {/* Features & Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <button
                onClick={() => setSelectedGpsOrder(order)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
              >
                <Navigation size={14} color="var(--accent-primary)" />
                Live GPS
              </button>

              <button
                onClick={() => openWhatsAppSmartSummarizer('order', order)}
                className="btn btn-sm"
                style={{ background: 'var(--status-success-bg)', color: 'var(--status-success)', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: '700' }}
              >
                <MessageSquareShare size={14} />
                WA Card
              </button>
            </div>

            {/* Workflow Buttons */}
            <div style={{ display: 'flex', gap: '6px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
              {order.status === 'Confirmed' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'Ready for Delivery')}
                  className="btn btn-primary btn-sm btn-full"
                >
                  Mark Ready for Delivery
                </button>
              )}

              {order.status === 'Ready for Delivery' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'Out For Delivery')}
                  className="btn btn-sm btn-full"
                  style={{ background: 'var(--status-info)', color: 'white' }}
                >
                  <Truck size={14} />
                  Dispatch (Out for Delivery)
                </button>
              )}

              {order.status === 'Out For Delivery' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'Delivered')}
                  className="btn btn-sm btn-full"
                  style={{ background: 'var(--status-success)', color: 'white' }}
                >
                  <CheckCircle2 size={14} />
                  Confirm Delivered
                </button>
              )}

              {order.status === 'Delivered' && (
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--status-success)', width: '100%', textAlign: 'center' }}>
                  ✓ Delivery Complete & Verified
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
