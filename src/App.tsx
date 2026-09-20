import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User, NotificationItem } from './types';
import { api } from './services/api';

// Components
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

// Pages
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AiAdvisor } from './pages/AiAdvisor';
import { Assessment } from './pages/Assessment';
import { EnergyAnalytics } from './pages/EnergyAnalytics';
import { WaterAnalytics } from './pages/WaterAnalytics';
import { WasteAnalytics } from './pages/WasteAnalytics';
import { TransportAnalytics } from './pages/TransportAnalytics';
import { ActionPlan } from './pages/ActionPlan';
import { ImpactDashboard } from './pages/ImpactDashboard';
import { ResponsibleAi } from './pages/ResponsibleAi';
import { KnowledgeBaseAdmin } from './pages/KnowledgeBaseAdmin';
import { ProfileSettings } from './pages/ProfileSettings';
import { AboutPage } from './pages/AboutPage';

// Default Student Demo User for frictionless evaluation
const DEFAULT_USER: User = {
  id: 'user_student_01',
  name: 'Katta Sanvee',
  email: 'student@greencampus.edu',
  role: 'student',
  token: 'demo-token-123'
};

const AppLayout: React.FC<{
  user: User | null;
  onLogout: () => void;
  aiStatus: any;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  children: React.ReactNode;
}> = ({ user, onLogout, aiStatus, notifications, onMarkNotificationRead, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isPublicPage = ['/', '/login', '/signup', '/forgot-password'].includes(location.pathname);

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col">
      <Navbar
        user={user}
        onLogout={onLogout}
        aiStatus={aiStatus}
        notifications={notifications}
        onMarkNotificationRead={onMarkNotificationRead}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 flex">
        <Sidebar
          user={user}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('greencampus_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [aiStatus, setAiStatus] = useState<any>({
    name: 'Demo AI Mode (Local Grounded RAG)',
    is_demo_mode: true,
    model: 'Local RAG Synthesis',
    status: 'Demo AI Mode'
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('greencampus_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('greencampus_user');
    }
  }, [user]);

  useEffect(() => {
    async function loadMeta() {
      try {
        const [statusRes, notifRes] = await Promise.all([
          api.getAiStatus().catch(() => null),
          api.getNotifications().catch(() => [])
        ]);
        if (statusRes) setAiStatus(statusRes);
        if (notifRes) setNotifications(notifRes);
      } catch (e) {
        console.warn('Initial meta fetch failed, using defaults');
      }
    }
    loadMeta();
  }, []);

  const handleLoginSuccess = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleMarkNotificationRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BrowserRouter>
      <AppLayout
        user={user}
        onLogout={handleLogout}
        aiStatus={aiStatus}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
      >
        <Routes>
          {/* Public Landing & Auth */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* User & Admin Dashboards */}
          <Route path="/dashboard" element={<UserDashboard user={user || DEFAULT_USER} />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Core Decision Support Modules */}
          <Route path="/ai-advisor" element={<AiAdvisor />} />
          <Route path="/assessment" element={<Assessment />} />

          {/* Resource Telemetry */}
          <Route path="/energy" element={<EnergyAnalytics />} />
          <Route path="/water" element={<WaterAnalytics />} />
          <Route path="/waste" element={<WasteAnalytics />} />
          <Route path="/transport" element={<TransportAnalytics />} />

          {/* Execution & Progress */}
          <Route path="/action-plan" element={<ActionPlan />} />
          <Route path="/impact" element={<ImpactDashboard />} />

          {/* Governance & Reference */}
          <Route path="/responsible-ai" element={<ResponsibleAi />} />
          <Route path="/admin/knowledge-base" element={<KnowledgeBaseAdmin />} />
          <Route path="/profile" element={<ProfileSettings user={user || DEFAULT_USER} />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
export default App;
