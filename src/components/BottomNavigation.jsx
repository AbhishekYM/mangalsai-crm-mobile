import React from 'react';
import { useCRM } from '../context/CRMContext';
import { LayoutDashboard, CheckSquare, ShoppingBag, Wallet } from 'lucide-react';

export const BottomNavigation = () => {
  const { currentScreen, setCurrentScreen, tasks, orders } = useCRM();

  const pendingTasksCount = tasks.filter(t => t.status === 'In Progress' || t.status === 'Assigned' || t.status === 'Overdue').length;
  const activeOrdersCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: activeOrdersCount },
    { id: 'collections', label: 'Collections', icon: Wallet }
  ];

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '64px',
      backgroundColor: 'var(--bottom-nav-bg)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border-color)',
      display: 'flex',
      justify: 'space-around',
      alignItems: 'center',
      padding: '4px 0',
      zIndex: 150,
      boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.05)'
    }}>
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center',
              gap: '2px',
              color: isActive ? 'var(--accent-mint)' : 'var(--text-muted)',
              cursor: 'pointer',
              position: 'relative',
              padding: '4px 16px',
              borderRadius: '12px',
              transition: 'all 0.2s ease',
              flex: 1
            }}
          >
            {/* Icon Box with Badge */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              {item.badge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-10px',
                  background: 'var(--status-danger)',
                  color: '#FFFFFF',
                  fontSize: '9px',
                  fontWeight: '800',
                  padding: '1px 5px',
                  borderRadius: '10px',
                  minWidth: '14px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-display)',
                  boxShadow: '0 2px 5px rgba(225, 29, 72, 0.4)',
                  lineHeight: 1.2
                }}>
                  {item.badge}
                </span>
              )}
            </div>

            {/* Label below Icon */}
            <span style={{
              fontSize: '11px',
              fontWeight: isActive ? '700' : '500',
              fontFamily: 'var(--font-display)',
              lineHeight: 1,
              marginTop: '2px'
            }}>
              {item.label}
            </span>

            {/* Active Indicator Underline */}
            {isActive && (
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                width: '16px',
                height: '3px',
                borderRadius: '2px',
                background: 'var(--accent-mint)'
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
};
