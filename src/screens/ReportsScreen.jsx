import React from 'react';
import { useCRM } from '../context/CRMContext';
import { BarChart3, TrendingUp, Users, Clock, Award, ShieldCheck, Zap } from 'lucide-react';

export const ReportsScreen = () => {
  const { tasks, orders } = useCRM();

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const completionRate = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const deliveryRate = orders.length ? Math.round((deliveredOrders / orders.length) * 100) : 0;

  const employeePerformance = [
    { rank: '🥇', name: 'Rahul Gohil', dept: 'Sales', completed: 18, pending: 2, score: '98%' },
    { rank: '🥈', name: 'Ramesh Kumar', dept: 'Delivery', completed: 24, pending: 1, score: '95%' },
    { rank: '🥉', name: 'Vikram Singh', dept: 'Collection', completed: 14, pending: 3, score: '89%' },
    { rank: '4️⃣', name: 'Priya Sharma', dept: 'Banking', completed: 12, pending: 0, score: '100%' }
  ];

  return (
    <div className="screen-container">
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
          Business Intelligence
        </h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700' }}>
          Executive Productivity Analytics & Fleet Metrics
        </span>
      </div>

      {/* Completion Score Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div className="card card-glow-emerald" style={{ margin: 0 }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '800' }}>TASK COMPLETION RATE</div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--status-success)', fontFamily: 'var(--font-display)', marginTop: '4px' }}>
            {completionRate}%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '600' }}>
            ⚡ Avg resolution: 4.2h
          </div>
        </div>

        <div className="card card-glow-indigo" style={{ margin: 0 }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '800' }}>FLEET DISPATCH RATE</div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--accent-indigo)', fontFamily: 'var(--font-display)', marginTop: '4px' }}>
            {deliveryRate}%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '600' }}>
            🚚 Avg delivery: 1.8h
          </div>
        </div>
      </div>

      {/* Employee Productivity Leaderboard */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--status-warning)" />
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '900', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                Employee Productivity Index
              </h3>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>Weekly Scoreboard</span>
            </div>
          </div>
          <span className="badge badge-warning">Top 4</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {employeePerformance.map(emp => (
            <div key={emp.name} style={{
              background: 'var(--bg-secondary)',
              borderRadius: '14px',
              padding: '12px',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>{emp.rank}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>{emp.name}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{emp.dept} • {emp.completed} Tasks Done</div>
                </div>
              </div>
              <span className="badge badge-success" style={{ fontSize: '11px' }}>{emp.score} Score</span>
            </div>
          ))}
        </div>
      </div>

      {/* Area Delivery Distribution Meter */}
      <div className="card">
        <h3 style={{ fontSize: '15px', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
          Logistics Route Volume Distribution
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', marginBottom: '4px' }}>
              <span>GIDC Zone A</span>
              <span>45% Volume</span>
            </div>
            <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '45%', height: '100%', background: 'var(--gradient-primary)', borderRadius: '4px' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', marginBottom: '4px' }}>
              <span>Ring Road Zone B</span>
              <span>35% Volume</span>
            </div>
            <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '35%', height: '100%', background: 'var(--gradient-emerald)', borderRadius: '4px' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', marginBottom: '4px' }}>
              <span>Highway Zone C</span>
              <span>20% Volume</span>
            </div>
            <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '20%', height: '100%', background: 'var(--gradient-amber)', borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
