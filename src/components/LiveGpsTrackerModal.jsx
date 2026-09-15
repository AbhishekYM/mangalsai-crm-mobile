import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { X, Navigation, Phone, MapPin, Camera, Clock, Gauge, Truck, Factory } from 'lucide-react';

export const LiveGpsTrackerModal = () => {
  const { selectedGpsOrder, setSelectedGpsOrder, updateOrderStatus } = useCRM();
  const [liveProgress, setLiveProgress] = useState(65);

  useEffect(() => {
    if (!selectedGpsOrder) return;
    setLiveProgress(selectedGpsOrder.gpsCoords?.progress || 65);
    const interval = setInterval(() => {
      setLiveProgress(prev => (prev >= 96 ? 96 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [selectedGpsOrder]);

  if (!selectedGpsOrder) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-sheet" style={{ padding: '24px' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'var(--accent-gradient)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              boxShadow: '0 4px 14px rgba(0, 180, 115, 0.35)'
            }}>
              <Navigation size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                Live Delivery Telematics GPS
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span className="pulse-dot-mint" />
                <span style={{ fontSize: '11px', color: 'var(--accent-mint)', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                  Driver En Route • 14 Min ETA
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedGpsOrder(null)}
            style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              color: 'var(--text-secondary)', 
              cursor: 'pointer' 
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Crisp Mint Pearl Telematics Vector Map Canvas */}
        <div style={{
          height: '210px',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, #EFF8F4 0%, #E6F3EE 100%)',
          border: '1.5px solid rgba(0, 180, 115, 0.3)',
          boxShadow: 'inset 0 2px 10px rgba(0, 180, 115, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '18px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          padding: '16px'
        }}>
          {/* Map Vector Grid Pattern */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            opacity: 0.35,
            backgroundImage: 'radial-gradient(var(--accent-mint) 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }} />

          {/* Top Telematics Pills */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
            <div style={{ 
              background: '#FFFFFF', 
              padding: '6px 12px', 
              borderRadius: '16px', 
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              fontSize: '11px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-display)'
            }}>
              <Truck size={14} color="var(--accent-mint)" />
              Vehicle #3 (GIDC Express Route)
            </div>

            <div style={{ 
              background: 'var(--status-success-bg)', 
              padding: '6px 12px', 
              borderRadius: '16px', 
              border: '1px solid rgba(0, 180, 115, 0.3)',
              fontSize: '11px',
              fontWeight: '700',
              color: 'var(--status-success)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: 'var(--font-display)'
            }}>
              <Gauge size={13} /> Speed: 42 km/h
            </div>
          </div>

          {/* Route Track & Elevated Pins */}
          <div style={{ position: 'relative', width: '100%', height: '80px', zIndex: 2, marginTop: '8px' }}>
            
            {/* Origin Pin (Elevated above line) */}
            <div style={{ 
              position: 'absolute', 
              top: '4px', 
              left: '4%', 
              background: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              fontSize: '10px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-display)'
            }}>
              <Factory size={12} color="var(--status-info)" /> Warehouse
            </div>

            {/* Destination Pin (Elevated above line) */}
            <div style={{ 
              position: 'absolute', 
              top: '4px', 
              right: '2%', 
              background: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: '10px',
              border: '1px solid var(--status-danger-bg)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              fontSize: '10px',
              fontWeight: '700',
              color: 'var(--status-danger)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-display)'
            }}>
              <MapPin size={12} color="var(--status-danger)" /> {selectedGpsOrder.customer}
            </div>

            {/* Main Route Track Line */}
            <div style={{
              position: 'absolute',
              top: '52px',
              left: '8%',
              right: '8%',
              height: '6px',
              background: 'rgba(0, 180, 115, 0.15)',
              borderRadius: '3px'
            }} />

            {/* Live Progress Fill */}
            <div style={{
              position: 'absolute',
              top: '52px',
              left: '8%',
              width: `${liveProgress * 0.84}%`,
              height: '6px',
              background: 'var(--accent-gradient)',
              borderRadius: '3px',
              boxShadow: '0 0 10px rgba(0, 180, 115, 0.5)'
            }} />

            {/* Moving Truck Node Icon */}
            <div style={{
              position: 'absolute',
              top: '41px',
              left: `calc(7% + ${liveProgress * 0.78}%)`,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--accent-gradient)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              boxShadow: '0 4px 14px rgba(0, 180, 115, 0.5)',
              transition: 'left 0.5s linear',
              fontSize: '14px'
            }}>
              🚚
            </div>
          </div>

          {/* Bottom Distance & Target Bar */}
          <div style={{ 
            display: 'flex', 
            justify: 'space-between', 
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '8px 14px',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            fontSize: '11px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            zIndex: 2
          }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              Distance Remaining: <strong style={{ color: 'var(--accent-mint)' }}>3.4 km</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
              <Clock size={12} color="var(--text-muted)" /> Target: <strong style={{ color: 'var(--text-primary)' }}>{selectedGpsOrder.requiredDate}</strong>
            </span>
          </div>
        </div>

        {/* Balanced Driver Contact Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '18px',
          padding: '16px',
          marginBottom: '18px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-display)' }}>
              ASSIGNED DRIVER
            </div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
              {selectedGpsOrder.assignedDeliveryPerson}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Phone: <strong>{selectedGpsOrder.driverPhone}</strong>
            </div>
          </div>

          <button
            onClick={() => window.open(`tel:${selectedGpsOrder.driverPhone}`)}
            className="btn btn-mint btn-sm"
            style={{ borderRadius: '12px', padding: '10px 16px' }}
          >
            <Phone size={14} /> Call Driver
          </button>
        </div>

        {/* Proof of Delivery Action */}
        <button
          onClick={() => {
            updateOrderStatus(selectedGpsOrder.id, 'Delivered');
            setSelectedGpsOrder(null);
          }}
          className="btn btn-mint btn-full"
          style={{ padding: '14px', borderRadius: '16px', fontSize: '14px' }}
        >
          <Camera size={17} />
          Upload Delivery Proof Photo & Close Order
        </button>
      </div>
    </div>
  );
};
