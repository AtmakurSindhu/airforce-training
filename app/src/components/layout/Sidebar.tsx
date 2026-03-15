import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/lib/auth';
import type { User } from '@/types';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Cpu,
  Plane,
  Bot,
  Users,
  FileText,
  Calendar,
  Target,
  BarChart3,
  Shield,
  Settings,
  Lock,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: User['role'][];
}

const navItems: NavItem[] = [
  // Trainee Navigation
  { label: 'Dashboard', href: '/trainee/dashboard', icon: LayoutDashboard, roles: ['trainee'] },
  { label: 'Course Catalog', href: '/trainee/catalog', icon: BookOpen, roles: ['trainee'] },
  { label: 'My Progress', href: '/trainee/progress', icon: GraduationCap, roles: ['trainee'] },
  { label: 'Digital Twin', href: '/trainee/digital-twin', icon: Cpu, roles: ['trainee'] },
  { label: 'Simulation', href: '/trainee/simulation', icon: Plane, roles: ['trainee'] },
  { label: 'AI Assistant', href: '/trainee/ai-assistant', icon: Bot, roles: ['trainee'] },
  
  // Instructor Navigation
  { label: 'Dashboard', href: '/instructor/dashboard', icon: LayoutDashboard, roles: ['instructor'] },
  { label: 'Trainees', href: '/instructor/trainees', icon: Users, roles: ['instructor'] },
  { label: 'Content', href: '/instructor/content', icon: FileText, roles: ['instructor'] },
  { label: 'Sessions', href: '/instructor/sessions', icon: Calendar, roles: ['instructor'] },
  { label: 'Scenarios', href: '/instructor/scenarios', icon: Target, roles: ['instructor'] },
  { label: 'Analytics', href: '/instructor/analytics', icon: BarChart3, roles: ['instructor'] },
  
  // Admin Navigation
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['admin'] },
  { label: 'Users', href: '/admin/users', icon: Users, roles: ['admin'] },
  { label: 'Roles', href: '/admin/roles', icon: Shield, roles: ['admin'] },
  { label: 'Security', href: '/admin/security', icon: Lock, roles: ['admin'] },
  { label: 'System', href: '/admin/system', icon: Settings, roles: ['admin'] },
  { label: 'Audit Logs', href: '/admin/audit', icon: ClipboardList, roles: ['admin'] },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  
  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );
  
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'trainee': return 'Trainee Portal';
      case 'instructor': return 'Instructor Console';
      case 'admin': return 'Admin Control';
      default: return 'Portal';
    }
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-iaf-navy-dark border-r border-iaf-navy-light/30 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-iaf-navy-light/30">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-iaf-gold flex items-center justify-center">
              <Plane className="w-5 h-5 text-iaf-navy-dark" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-iaf-sky">IAF TRAINING</h1>
              <p className="text-xs text-iaf-sky/60">{user ? getRoleLabel(user.role) : ''}</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-full bg-iaf-gold flex items-center justify-center mx-auto">
            <Plane className="w-5 h-5 text-iaf-navy-dark" />
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            'p-1 rounded-md hover:bg-iaf-navy-light/50 text-iaf-sky/60 hover:text-iaf-sky transition-colors',
            isCollapsed && 'absolute -right-3 top-16 bg-iaf-navy border border-iaf-navy-light/30'
          )}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group',
                isActive
                  ? 'bg-iaf-gold/20 text-iaf-gold border-l-2 border-iaf-gold'
                  : 'text-iaf-sky/70 hover:bg-iaf-navy-light/50 hover:text-iaf-sky'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className={cn(
                'w-5 h-5 flex-shrink-0',
                isActive ? 'text-iaf-gold' : 'text-iaf-sky/60 group-hover:text-iaf-sky'
              )} />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-iaf-navy-light/30">
        {user && !isCollapsed && (
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full bg-iaf-navy-light"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-iaf-sky truncate">{user.name}</p>
              <p className="text-xs text-iaf-sky/60 truncate">{user.rank}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            import('@/lib/auth').then(({ logout }) => {
              logout();
              window.location.href = '/login';
            });
          }}
          className={cn(
            'flex items-center gap-2 text-iaf-sky/60 hover:text-iaf-alert transition-colors',
            isCollapsed && 'justify-center w-full'
          )}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
