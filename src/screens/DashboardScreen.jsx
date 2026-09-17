import React from 'react';
import { useCRM } from '../context/CRMContext';
import { CheckSquare, ShoppingBag, Wallet, AlertCircle, Truck, Plus, ArrowUpRight, ChevronRight, Sliders } from 'lucide-react';

export const DashboardScreen = () => {
  const { 
    tasks, 
    orders, 
    collections, 
    fleetSimulator, 
    updateFleetSimulatorSlider, 
    activeRole, 
    setCurrentScreen, 
    setIsCreateTaskOpen, 
    setIsCreateOrderOpen 
  } = useCRM();

  // Computations
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'In Progress' || t.status === 'Assigned' || t.status === 'New').length;
  const overdueTasks = tasks.filter(t => t.status === 'Overdue' || t.dueDate.includes('Overdue')).length;

  const totalOrders = orders.length;
  const pendingDeliveries = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const completedDeliveries = orders.filter(o => o.status === 'Delivered').length;

  const totalPendingCollectionAmt = collections.reduce((acc, curr) => acc + (curr.outstandingAmount || 0), 0);

  return (
    <div className="screen-container">
      {/* Futuristic Cyber-Emerald Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #061B14 0%, #00422B 50%, #008756 100%)',
        borderRadius: '26px',
        padding: '24px',
        color: '#FFFFFF',
        marginBottom: '22px',
        boxShadow: '0 14px 40px rgba(0, 180, 115, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        border: '1.5px solid rgba(0, 245, 160, 0.35)'
      }}>
        {/* Background Glowing Vector Mesh */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 245, 160, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            fontSize: '10px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            background: 'rgba(0, 245, 160, 0.15)',
            color: '#00F5A0',
            border: '1px solid rgba(0, 245, 160, 0.4)',
            padding: '5px 12px',
            borderRadius: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '10px',
            fontFamily: 'var(--font-display)'
          }}>
            <span className="pulse-dot-mint" style={{ width: '6px', height: '6px' }} />
            {activeRole === 'Manager' ? 'Executive Cyber Desk' : `${activeRole} Portal`}
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-display)', lineHeight: 1.15, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            Mangalsai Business OS
          </h2>
          <p style={{ fontSize: '12px', marginTop: '6px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: '500', lineHeight: 1.45 }}>
            Centralized Dispatch, Live Telematics & Revenue Operations Desk.
          </p>

          {/* Futuristic Quick Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '18px' }}>
            <button
              onClick={() => setIsCreateTaskOpen(true)}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #00F5A0 0%, #00B473 100%)',
                color: '#030E09',
                border: 'none',
                fontSize: '13px',
                fontWeight: '800',
                fontFamily: 'var(--font-display)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 6px 20px rgba(0, 245, 160, 0.4)',
                cursor: 'pointer'
              }}
            >
              <Plus size={16} /> Create Task
            </button>

            <button
              onClick={() => setIsCreateOrderOpen(true)}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                fontSize: '13px',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <ShoppingBag size={16} /> New Order
            </button>
          </div>
        </div>
      </div>

      {/* AI Morning Fleet Forecast Card */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={18} color="var(--accent-mint)" />
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              Morning Dispatch Forecast
            </h3>
          </div>
          <span className="badge badge-mint">AI Forecast</span>
        </div>

        {/* Volume Slider */}
        <div style={{
          background: 'var(--bg-secondary)',
          padding: '12px 14px',
          borderRadius: '14px',
          marginBottom: '14px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
              <Sliders size={13} color="var(--accent-mint)" /> Pending Delivery Volume:
            </span>
            <span style={{ color: 'var(--accent-mint)', fontSize: '14px', fontWeight: '700' }}>
              {fleetSimulator.pendingDeliveries} Orders
            </span>
          </div>

          <input
            type="range"
            min="20"
            max="300"
            value={fleetSimulator.pendingDeliveries}
            onChange={(e) => updateFleetSimulatorSlider(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-mint)', cursor: 'pointer' }}
          />
        </div>

        {/* Dynamic Metric Box */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', fontFamily: 'var(--font-display)' }}>VEHICLES REQUIRED</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent-mint)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
              {fleetSimulator.vehiclesNeeded} Trucks
            </div>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', fontFamily: 'var(--font-display)' }}>STAFF DRIVERS</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--status-info)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
              {fleetSimulator.deliveryStaffNeeded} Drivers
            </div>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', fontFamily: 'var(--font-display)' }}>TEMP HELPERS</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--status-warning)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
              {fleetSimulator.tempHelpersNeeded} Helpers
            </div>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', fontFamily: 'var(--font-display)' }}>ESTIMATED FUEL</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--status-success)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
              {fleetSimulator.estimatedFuelCost}
            </div>
          </div>
        </div>
      </div>

      {/* Bento KPIs Grid */}
      <h3 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-display)' }}>
        Operations Summary KPIs
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {/* Task KPI */}
        <div className="card" onClick={() => setCurrentScreen('tasks')} style={{ cursor: 'pointer', margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CheckSquare size={18} color="var(--accent-mint)" />
            <ArrowUpRight size={14} color="var(--text-muted)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-display)', marginTop: '10px', color: 'var(--text-primary)' }}>
            {pendingTasks} <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>/ {totalTasks}</span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginTop: '2px', fontFamily: 'var(--font-display)' }}>
            Pending Tasks
          </div>
          {overdueTasks > 0 && (
            <span className="badge badge-danger" style={{ marginTop: '8px', fontSize: '9px' }}>
              {overdueTasks} Overdue
            </span>
          )}
        </div>

        {/* Order KPI */}
        <div className="card" onClick={() => setCurrentScreen('orders')} style={{ cursor: 'pointer', margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ShoppingBag size={18} color="var(--accent-cyan)" />
            <ArrowUpRight size={14} color="var(--text-muted)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-display)', marginTop: '10px', color: 'var(--text-primary)' }}>
            {pendingDeliveries} <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Active</span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginTop: '2px', fontFamily: 'var(--font-display)' }}>
            Today's Orders
          </div>
          <span className="badge badge-success" style={{ marginTop: '8px', fontSize: '9px' }}>
            {completedDeliveries} Delivered
          </span>
        </div>

        {/* Collections KPI */}
        <div className="card" onClick={() => setCurrentScreen('collections')} style={{ cursor: 'pointer', gridColumn: 'span 2', margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'var(--status-danger-bg)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}>
                <Wallet size={18} color="var(--status-danger)" />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
                  TOTAL OUTSTANDING DEBT
                </div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--status-danger)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
                  ₹{totalPendingCollectionAmt.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </div>
        </div>
      </div>

      {/* Overdue Urgent Alert */}
      <h3 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.8px', fontFamily: 'var(--font-display)' }}>
        Urgent Attention Required
      </h3>

      {tasks.filter(t => t.priority === 'High' || t.status === 'Overdue').map(task => (
        <div 
          key={task.id} 
          className="card" 
          onClick={() => setCurrentScreen('tasks')}
          style={{ 
            borderLeft: '5px solid var(--status-danger)', 
            marginBottom: '14px', 
            padding: '18px 20px',
            cursor: 'pointer' 
          }}
        >
          {/* Title Row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
            <AlertCircle size={17} color="var(--status-danger)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.35, flex: 1 }}>
              {task.title}
            </span>
          </div>

          {/* Meta & Badge Footer Row */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingTop: '10px', 
            borderTop: '1px solid var(--border-color)',
            gap: '8px'
          }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: '500' }}>
              Assigned: <strong style={{ color: 'var(--text-primary)' }}>{task.assignedTo}</strong> <span style={{ color: 'var(--text-muted)' }}>({task.department})</span>
            </p>
            <span className="badge badge-danger" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
              {task.dueDate}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
