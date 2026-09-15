import React, { createContext, useContext, useState, useEffect } from 'react';

const CRMContext = createContext();

export const CRMProvider = ({ children }) => {
  // Exclusive Pristine Light Theme
  const [theme] = useState('light');
  
  // Active User Role
  const [activeRole, setActiveRole] = useState('Manager');

  // Fullscreen Preview Toggle
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active Screen Navigation Tab: 'dashboard', 'tasks', 'orders', 'collections', 'reports'
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  // Selected Item Modals & Feature Overlays
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Unique Feature State: WhatsApp AI Summarizer Drawer
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppMessageText, setWhatsAppMessageText] = useState('');

  // Unique Feature State: Live GPS Driver Tracker Modal
  const [selectedGpsOrder, setSelectedGpsOrder] = useState(null);

  // Theme Syncing Effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  // Initial Mock Tasks (Module 1)
  const [tasks, setTasks] = useState([
    {
      id: 'TSK-101',
      title: 'Client Purchase Order Confirmation',
      department: 'Sales',
      assignedTo: 'Rahul Gohil',
      priority: 'High',
      dueDate: 'Today, 5:00 PM',
      status: 'In Progress',
      description: 'Call Apex Traders regarding PO #9021 quantity discrepancy and confirm delivery address.',
      comments: [
        { id: 1, author: 'Vishal Gohil (Manager)', time: '09:30 AM', text: 'Task assigned. Please complete before noon.' },
        { id: 2, author: 'Rahul Gohil', time: '11:15 AM', text: 'Contacted purchasing manager. Sent updated spec sheet.' }
      ]
    },
    {
      id: 'TSK-102',
      title: 'Banking Payment Reconciliation',
      department: 'Banking',
      assignedTo: 'Priya Sharma',
      priority: 'Medium',
      dueDate: 'Tomorrow',
      status: 'Assigned',
      description: 'Reconcile morning NEFT transfer receipts against pending invoices.',
      comments: []
    },
    {
      id: 'TSK-103',
      title: 'Urgent Dispatch of Batch #884',
      department: 'Delivery',
      assignedTo: 'Ramesh Kumar',
      priority: 'High',
      dueDate: 'Overdue (Yesterday)',
      status: 'In Progress',
      description: 'Ensure 35 cartons of industrial valves are loaded onto Vehicle #3.',
      comments: [
        { id: 1, author: 'Ramesh Kumar', time: 'Yesterday 4:00 PM', text: 'Vehicle delayed due to brake check.' }
      ]
    },
    {
      id: 'TSK-104',
      title: 'Quarterly Renewal Follow-up (Zenith Corp)',
      department: 'Renewal / Collection',
      assignedTo: 'Vikram Singh',
      priority: 'Low',
      dueDate: 'Sept 18',
      status: 'Completed',
      description: 'Send AMC renewal agreement and invoice copy to account representative.',
      comments: [
        { id: 1, author: 'Vikram Singh', time: 'Sept 12', text: 'Agreement signed and payment receipt uploaded.' }
      ]
    },
    {
      id: 'TSK-105',
      title: 'Invoice Voucher Audit - August',
      department: 'Accounts',
      assignedTo: 'Amit Patel',
      priority: 'Medium',
      dueDate: 'Sept 15',
      status: 'On Hold',
      holdReason: 'Awaiting third-party GST portal statements',
      description: 'Verify input tax credit logs for all supplier purchase orders.',
      comments: [
        { id: 1, author: 'Amit Patel', time: 'Yesterday', text: 'Put on hold - portal server undergoing maintenance.' }
      ]
    }
  ]);

  // Initial Mock Orders (Module 2)
  const [orders, setOrders] = useState([
    {
      id: 'ORD-501',
      customer: 'Apex Traders',
      address: 'Plot 42, GIDC Industrial Estate, Sector 3',
      products: 'Industrial Brass Valves (50 Units), Steel Pipes (20 Bun)',
      totalAmount: '₹84,500',
      salesPerson: 'Rahul Gohil',
      assignedDeliveryPerson: 'Ramesh Kumar',
      driverPhone: '+91 98765 43210',
      requiredDate: 'Today, 2:00 PM',
      area: 'GIDC Zone A',
      status: 'Out For Delivery',
      gpsCoords: { lat: 23.0225, lng: 72.5714, progress: 68 },
      proofImageUploaded: false
    },
    {
      id: 'ORD-502',
      customer: 'Bright Motors Ltd',
      address: '108 Commercial Ring Road, Near Highway',
      products: 'Engine Gaskets (120 Pcs), Synthetic Lubricant (5 Drums)',
      totalAmount: '₹1,42,000',
      salesPerson: 'Anil Mehta',
      assignedDeliveryPerson: 'Suresh Patel',
      driverPhone: '+91 98251 99887',
      requiredDate: 'Today, 4:30 PM',
      area: 'Ring Road Zone B',
      status: 'Ready for Delivery',
      gpsCoords: { lat: 23.0310, lng: 72.5820, progress: 35 },
      proofImageUploaded: false
    },
    {
      id: 'ORD-503',
      customer: 'Galaxy Textile Mills',
      address: 'Building B-4, Mill Compound, Station Road',
      products: 'Heavy Duty Bearings (15 Sets)',
      totalAmount: '₹38,000',
      salesPerson: 'Rahul Gohil',
      assignedDeliveryPerson: 'Unassigned',
      driverPhone: '-',
      requiredDate: 'Tomorrow, 11:00 AM',
      area: 'Station Area',
      status: 'Confirmed',
      gpsCoords: { lat: 23.0150, lng: 72.5600, progress: 10 },
      proofImageUploaded: false
    },
    {
      id: 'ORD-504',
      customer: 'Horizon Infrastructure',
      address: 'Site #12, Expressway Construction Hub',
      products: 'Armored Power Cables (300 Meters)',
      totalAmount: '₹2,10,000',
      salesPerson: 'Karan Shah',
      assignedDeliveryPerson: 'Ramesh Kumar',
      driverPhone: '+91 98765 43210',
      requiredDate: 'Yesterday',
      area: 'Highway Zone C',
      status: 'Delivered',
      gpsCoords: { lat: 23.0500, lng: 72.6000, progress: 100 },
      proofImageUploaded: true
    }
  ]);

  // Morning Fleet AI Logistics Simulator Parameters
  const [fleetSimulator, setFleetSimulator] = useState({
    pendingDeliveries: 135,
    vehiclesNeeded: 3,
    deliveryStaffNeeded: 7,
    tempHelpersNeeded: 2,
    estimatedFuelCost: '₹3,450'
  });

  // Initial Mock Collections / Renewals (Module 3)
  const [collections, setCollections] = useState([
    {
      id: 'COL-801',
      customer: 'Sunshine Electronics',
      contactPerson: 'Deepak Shah (+91 98250 11223)',
      phone: '+91 98250 11223',
      outstandingAmount: 45000,
      dueDate: 'Today',
      assignedExecutive: 'Vikram Singh',
      status: 'Promise To Pay',
      promiseDate: '16-Sep-2026',
      nextFollowUpDate: '16-Sep-2026',
      history: [
        { date: '12-Sep', note: 'Called client. Informed owner was out of office.' },
        { date: '14-Sep', note: 'Owner confirmed check will be ready on Wednesday (Sept 16).' }
      ]
    },
    {
      id: 'COL-802',
      customer: 'Premier Logistics Pvt Ltd',
      contactPerson: 'Rajesh Verma (+91 97129 44332)',
      phone: '+91 97129 44332',
      outstandingAmount: 125000,
      dueDate: 'Overdue (3 Days)',
      assignedExecutive: 'Neha Varma',
      status: 'Follow-up Required',
      promiseDate: '-',
      nextFollowUpDate: 'Today, 3:00 PM',
      history: [
        { date: '11-Sep', note: 'Invoice re-sent on WhatsApp.' },
        { date: '13-Sep', note: 'No response to phone call. Visit scheduled.' }
      ]
    },
    {
      id: 'COL-803',
      customer: 'Royal Hardware & Tools',
      contactPerson: 'Sunil Gupta (+91 94261 88900)',
      phone: '+91 94261 88900',
      outstandingAmount: 28500,
      dueDate: '20-Sep-2026',
      assignedExecutive: 'Vikram Singh',
      status: 'Pending',
      promiseDate: '-',
      nextFollowUpDate: '18-Sep-2026',
      history: [
        { date: '10-Sep', note: 'Standard bill dispatched.' }
      ]
    },
    {
      id: 'COL-804',
      customer: 'Precision Tools Mfg',
      contactPerson: 'Manish Patel (+91 98980 77112)',
      phone: '+91 98980 77112',
      outstandingAmount: 0,
      paidAmount: 65000,
      dueDate: '08-Sep-2026',
      assignedExecutive: 'Neha Varma',
      status: 'Paid',
      promiseDate: 'Completed',
      nextFollowUpDate: 'N/A',
      history: [
        { date: '08-Sep', note: 'Payment of ₹65,000 received via RTGS. Invoice cleared.' }
      ]
    }
  ]);

  // Actions
  const createTask = (newTaskData) => {
    const newTask = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      status: 'New',
      comments: [],
      ...newTaskData
    };
    setTasks(prev => [newTask, ...prev]);
    setIsCreateTaskOpen(false);
  };

  const updateTaskStatus = (taskId, newStatus, comment = '', holdReason = '') => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedComments = [...task.comments];
        if (comment) {
          updatedComments.push({
            id: Date.now(),
            author: `${activeRole} User`,
            time: 'Just Now',
            text: comment
          });
        }
        return {
          ...task,
          status: newStatus,
          holdReason: newStatus === 'On Hold' ? holdReason : task.holdReason,
          comments: updatedComments
        };
      }
      return task;
    }));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => ({
        ...prev,
        status: newStatus,
        holdReason: newStatus === 'On Hold' ? holdReason : prev?.holdReason
      }));
    }
  };

  const addProgressComment = (taskId, text) => {
    if (!text.trim()) return;
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          comments: [
            ...task.comments,
            { id: Date.now(), author: `${activeRole} User`, time: 'Just Now', text }
          ]
        };
      }
      return task;
    }));
  };

  const createOrder = (newOrderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(500 + Math.random() * 400)}`,
      status: 'Confirmed',
      assignedDeliveryPerson: 'Unassigned',
      driverPhone: '+91 98000 11223',
      gpsCoords: { lat: 23.0200, lng: 72.5700, progress: 15 },
      proofImageUploaded: false,
      ...newOrderData
    };
    setOrders(prev => [newOrder, ...prev]);
    setIsCreateOrderOpen(false);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          proofImageUploaded: newStatus === 'Delivered' ? true : order.proofImageUploaded,
          gpsCoords: newStatus === 'Delivered' ? { ...order.gpsCoords, progress: 100 } : order.gpsCoords
        };
      }
      return order;
    }));
  };

  const logCollectionFollowUp = (collectionId, newStatus, note, nextDate) => {
    setCollections(prev => prev.map(col => {
      if (col.id === collectionId) {
        const updatedHistory = [
          ...col.history,
          { date: 'Today', note: `Status updated to [${newStatus}]: ${note}` }
        ];
        return {
          ...col,
          status: newStatus,
          nextFollowUpDate: nextDate || col.nextFollowUpDate,
          history: updatedHistory
        };
      }
      return col;
    }));
    setSelectedCollection(null);
  };

  const recordPayment = (collectionId, amount) => {
    setCollections(prev => prev.map(col => {
      if (col.id === collectionId) {
        const remaining = Math.max(0, col.outstandingAmount - Number(amount));
        return {
          ...col,
          outstandingAmount: remaining,
          paidAmount: (col.paidAmount || 0) + Number(amount),
          status: remaining === 0 ? 'Paid' : 'Promise To Pay',
          history: [
            ...col.history,
            { date: 'Today', note: `Payment of ₹${Number(amount).toLocaleString('en-IN')} recorded.` }
          ]
        };
      }
      return col;
    }));
    setSelectedCollection(null);
  };

  const openWhatsAppSmartSummarizer = (type, item) => {
    let msg = '';
    if (type === 'task') {
      msg = `*MANGALSAI CRM TASK UPDATE*\n📌 Task: ${item.title}\n🏢 Dept: ${item.department}\n👤 Assigned: ${item.assignedTo}\n⏰ Due: ${item.dueDate}\n⚡ Status: ${item.status}\n\n*Note:* ${item.description}`;
    } else if (type === 'order') {
      msg = `*MANGALSAI CRM ORDER DISPATCH*\n📦 Order ID: ${item.id}\n🏬 Customer: ${item.customer}\n📍 Address: ${item.address}\n🚚 Driver: ${item.assignedDeliveryPerson}\n💰 Total: ${item.totalAmount}\nStatus: ${item.status}`;
    } else if (type === 'collection') {
      msg = `*MANGALSAI PAYMENT REMINDER*\nDear ${item.customer},\nThis is a friendly reminder regarding your outstanding bill of *₹${item.outstandingAmount?.toLocaleString('en-IN')}* due on ${item.dueDate}.\n\nPlease remit via UPI/NEFT. Thank you!\n- Mangalsai CRM Accounts Desk`;
    } else {
      const pendingCount = tasks.filter(t => t.status !== 'Completed').length;
      msg = `*MANGALSAI CRM DAILY SUMMARY*\n📊 Pending Tasks: ${pendingCount}\n🚚 Active Deliveries: ${orders.filter(o => o.status !== 'Delivered').length}\n💰 Collections Due: ₹${collections.reduce((a, b) => a + (b.outstandingAmount || 0), 0).toLocaleString('en-IN')}`;
    }
    setWhatsAppMessageText(msg);
    setIsWhatsAppOpen(true);
  };

  const updateFleetSimulatorSlider = (deliveryCount) => {
    const vehicles = Math.ceil(deliveryCount / 45);
    const staff = Math.ceil(deliveryCount / 20);
    const tempHelpers = Math.max(0, staff - 5);
    const fuel = deliveryCount * 25;
    setFleetSimulator({
      pendingDeliveries: deliveryCount,
      vehiclesNeeded: vehicles,
      deliveryStaffNeeded: staff,
      tempHelpersNeeded: tempHelpers,
      estimatedFuelCost: `₹${fuel.toLocaleString('en-IN')}`
    });
  };

  return (
    <CRMContext.Provider value={{
      theme,
      activeRole,
      setActiveRole,
      isFullscreen,
      setIsFullscreen,
      currentScreen,
      setCurrentScreen,
      tasks,
      createTask,
      updateTaskStatus,
      addProgressComment,
      selectedTask,
      setSelectedTask,
      isCreateTaskOpen,
      setIsCreateTaskOpen,
      orders,
      createOrder,
      updateOrderStatus,
      isCreateOrderOpen,
      setIsCreateOrderOpen,
      fleetSimulator,
      updateFleetSimulatorSlider,
      collections,
      logCollectionFollowUp,
      recordPayment,
      selectedCollection,
      setSelectedCollection,
      isWhatsAppOpen,
      setIsWhatsAppOpen,
      whatsAppMessageText,
      setWhatsAppMessageText,
      openWhatsAppSmartSummarizer,
      selectedGpsOrder,
      setSelectedGpsOrder
    }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => useContext(CRMContext);
