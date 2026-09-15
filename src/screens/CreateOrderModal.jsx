import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { X, ShoppingBag } from 'lucide-react';

export const CreateOrderModal = () => {
  const { isCreateOrderOpen, setIsCreateOrderOpen, createOrder, activeRole } = useCRM();

  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('GIDC Zone A');
  const [products, setProducts] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [requiredDate, setRequiredDate] = useState('Today, 4:00 PM');

  if (!isCreateOrderOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.trim() || !products.trim()) return;

    createOrder({
      customer,
      address: address || 'Main Commercial Estate',
      area,
      products,
      totalAmount: totalAmount ? `₹${totalAmount}` : '₹45,000',
      salesPerson: activeRole === 'Sales' ? 'Sales Executive' : 'Rahul Gohil',
      requiredDate
    });

    setCustomer('');
    setAddress('');
    setProducts('');
    setTotalAmount('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-sheet">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
            Create New Sales Order
          </h3>
          <button
            onClick={() => setIsCreateOrderOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Customer Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Traders Pvt Ltd"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Delivery Address & Area</label>
            <input
              type="text"
              placeholder="Full delivery street address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              style={{ marginBottom: '8px' }}
            />
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="form-select"
            >
              <option value="GIDC Zone A">GIDC Zone A</option>
              <option value="Ring Road Zone B">Ring Road Zone B</option>
              <option value="Highway Zone C">Highway Zone C</option>
              <option value="Station Area">Station Area</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Products & Quantity *</label>
            <textarea
              rows={2}
              required
              placeholder="e.g. 50 Boxes Brass Valves, 10 Drums Lubricant"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div className="form-group">
              <label className="form-label">Order Total Value (₹)</label>
              <input
                type="number"
                placeholder="45000"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Required Delivery Date</label>
              <input
                type="text"
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            <ShoppingBag size={16} />
            Post Order to CRM
          </button>
        </form>
      </div>
    </div>
  );
};
