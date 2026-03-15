import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { getCurrentUser, isAuthenticated } from '@/lib/auth';
import { cn } from '@/lib/utils';

// Pages
import LoginPage from '@/app/login/page';
import UnauthorizedPage from '@/app/unauthorized/page';

// Trainee Pages
import TraineeDashboard from '@/app/trainee/dashboard/page';
import TraineeCatalog from '@/app/trainee/catalog/page';
import TraineeModule from '@/app/trainee/module/page';
import TraineeProgress from '@/app/trainee/progress/page';
import TraineeDigitalTwin from '@/app/trainee/digital-twin/page';
import TraineeSimulation from '@/app/trainee/simulation/page';
import TraineeAIAssistant from '@/app/trainee/ai-assistant/page';

// Instructor Pages
import InstructorDashboard from '@/app/instructor/dashboard/page';

// Admin Pages
import AdminDashboard from '@/app/admin/dashboard/page';

// Protected Route Component
function ProtectedRoute({ allowedRoles }: { allowedRoles?: string[] }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      const isAuth = isAuthenticated();
      
      setAuthenticated(isAuth);
      setUser(currentUser);
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-iaf-navy-dark flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-iaf-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-iaf-sky">Loading...</span>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

// Layout Component
function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-iaf-navy-dark iaf-grid-pattern">
      {/* Sidebar - hidden on mobile */}
      {!isMobile && (
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}
      
      {/* Main Content */}
      <div className={cn(
        'transition-all duration-300',
        !isMobile && (sidebarCollapsed ? 'ml-16' : 'ml-64')
      )}>
        {/* Navbar */}
        <Navbar
          showMenuButton={isMobile}
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Page Content */}
        <main className="pt-16 min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && !sidebarCollapsed && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarCollapsed(true)}
          />
          <div className="fixed left-0 top-0 z-50">
            <Sidebar isCollapsed={false} onToggle={() => setSidebarCollapsed(true)} />
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            {/* Trainee Routes */}
            <Route element={<ProtectedRoute allowedRoles={['trainee', 'instructor', 'admin']} />}>
              <Route path="/trainee/dashboard" element={<TraineeDashboard />} />
              <Route path="/trainee/catalog" element={<TraineeCatalog />} />
              <Route path="/trainee/module/:id" element={<TraineeModule />} />
              <Route path="/trainee/progress" element={<TraineeProgress />} />
              <Route path="/trainee/digital-twin" element={<TraineeDigitalTwin />} />
              <Route path="/trainee/simulation" element={<TraineeSimulation />} />
              <Route path="/trainee/ai-assistant" element={<TraineeAIAssistant />} />
            </Route>
            
            {/* Instructor Routes */}
            <Route element={<ProtectedRoute allowedRoles={['instructor', 'admin']} />}>
              <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
              <Route path="/instructor/trainees" element={<InstructorDashboard />} />
              <Route path="/instructor/content" element={<InstructorDashboard />} />
              <Route path="/instructor/sessions" element={<InstructorDashboard />} />
              <Route path="/instructor/scenarios" element={<InstructorDashboard />} />
              <Route path="/instructor/analytics" element={<InstructorDashboard />} />
            </Route>
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminDashboard />} />
              <Route path="/admin/roles" element={<AdminDashboard />} />
              <Route path="/admin/security" element={<AdminDashboard />} />
              <Route path="/admin/system" element={<AdminDashboard />} />
              <Route path="/admin/audit" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

// Role-based redirect component
function RoleBasedRedirect() {
  const user = getCurrentUser();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  switch (user.role) {
    case 'trainee':
      return <Navigate to="/trainee/dashboard" replace />;
    case 'instructor':
      return <Navigate to="/instructor/dashboard" replace />;
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/trainee/dashboard" replace />;
  }
}

export default App;
