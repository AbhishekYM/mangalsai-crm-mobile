import React from 'react';
import { CRMProvider, useCRM } from './context/CRMContext';
import { HeaderBar } from './components/HeaderBar';
import { BottomNavigation } from './components/BottomNavigation';

import { DashboardScreen } from './screens/DashboardScreen';
import { TasksScreen } from './screens/TasksScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { CollectionsScreen } from './screens/CollectionsScreen';
import { ReportsScreen } from './screens/ReportsScreen';

import { CreateTaskModal } from './screens/CreateTaskModal';
import { TaskDetailModal } from './screens/TaskDetailModal';
import { CreateOrderModal } from './screens/CreateOrderModal';
import { LogFollowUpModal } from './screens/LogFollowUpModal';
import { WhatsAppAssistantDrawer } from './components/WhatsAppAssistantDrawer';
import { LiveGpsTrackerModal } from './components/LiveGpsTrackerModal';

const ScreenRouter = () => {
  const { currentScreen } = useCRM();

  switch (currentScreen) {
    case 'tasks':
      return <TasksScreen />;
    case 'orders':
      return <OrdersScreen />;
    case 'collections':
      return <CollectionsScreen />;
    case 'reports':
      return <ReportsScreen />;
    case 'dashboard':
    default:
      return <DashboardScreen />;
  }
};

const MainContent = () => {
  const { isFullscreen } = useCRM();

  return (
    <div className="app-wrapper">
      {/* Smartphone Titanium Enclosure */}
      <div className={`device-frame ${isFullscreen ? 'fullscreen' : ''}`}>
        {/* Android Status Bar & Camera Notch Pill */}
        <div className="android-status-bar">
          <div className="camera-notch">
            <div className="camera-lens" />
          </div>
          <span>09:41</span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span>5G</span>
            <span>📶</span>
            <span>🔋 96%</span>
          </div>
        </div>

        {/* Top Header Bar */}
        <HeaderBar />

        {/* Main Content Router */}
        <div className="mobile-content">
          <ScreenRouter />
          <BottomNavigation />
        </div>

        {/* Global Modal Sheets & Unique Feature Drawers */}
        <CreateTaskModal />
        <TaskDetailModal />
        <CreateOrderModal />
        <LogFollowUpModal />
        <WhatsAppAssistantDrawer />
        <LiveGpsTrackerModal />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CRMProvider>
      <MainContent />
    </CRMProvider>
  );
}
