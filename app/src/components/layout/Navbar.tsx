import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/lib/auth';
import type { User } from '@/types';
import { alerts } from '@/data/mockData';
import {
  Bell,
  Search,
  Menu,
  X,
  Shield,
  Plane,
  User as UserIcon,
  Settings,
  LogOut,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export function Navbar({ onMenuToggle, showMenuButton = false }: NavbarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSearch, setShowSearch] = useState(false);
  
  useEffect(() => {
    setUser(getCurrentUser());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const unreadAlerts = alerts.filter(a => !a.isRead);
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'trainee':
        return { label: 'TRAINEE', color: 'bg-iaf-cyan/20 text-iaf-cyan border-iaf-cyan/30' };
      case 'instructor':
        return { label: 'INSTRUCTOR', color: 'bg-iaf-gold/20 text-iaf-gold border-iaf-gold/30' };
      case 'admin':
        return { label: 'ADMIN', color: 'bg-iaf-alert/20 text-iaf-alert border-iaf-alert/30' };
      default:
        return { label: 'USER', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-30 h-16 bg-iaf-navy-dark/95 backdrop-blur-md border-b border-iaf-navy-light/30">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md hover:bg-iaf-navy-light/50 text-iaf-sky/70 hover:text-iaf-sky transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          {/* Logo - visible on mobile */}
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-full bg-iaf-gold flex items-center justify-center">
              <Plane className="w-5 h-5 text-iaf-navy-dark" />
            </div>
            <span className="text-sm font-bold text-iaf-sky">IAF TRAINING</span>
          </Link>
          
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-md hover:bg-iaf-navy-light/50 text-iaf-sky/70"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        
        {/* Center Section - Search Bar */}
        <div className="flex-1 flex justify-center">
          <div className={cn(
            'hidden md:flex items-center gap-2 bg-iaf-navy-light rounded-lg px-4 py-2.5 border border-iaf-navy-light hover:border-iaf-gold/50 transition-colors',
            showSearch && 'flex absolute left-16 right-4 z-50'
          )}>
            <Search className="w-4 h-4 text-iaf-sky/80" />
            <input
              type="text"
              placeholder="Search courses, modules, documentation..."
              className="bg-transparent border-none outline-none text-sm text-iaf-sky placeholder:text-iaf-sky/70 w-64 lg:w-80"
            />
            {showSearch && (
              <button
                onClick={() => setShowSearch(false)}
                className="p-1 hover:bg-iaf-navy-light rounded"
              >
                <X className="w-4 h-4 text-iaf-sky/60" />
              </button>
            )}
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center justify-end gap-4 flex-1">
          {/* Date/Time */}
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs text-iaf-sky/60">
              {currentTime.toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </span>
            <span className="text-sm font-mono text-iaf-sky">
              {currentTime.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: false 
              })}
            </span>
          </div>
          
          {/* Security Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-iaf-success/10 border border-iaf-success/30 rounded-md">
            <Shield className="w-4 h-4 text-iaf-success" />
            <span className="text-xs font-medium text-iaf-success">SECURE</span>
          </div>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 rounded-md hover:bg-iaf-navy-light/50 text-iaf-sky/70 hover:text-iaf-sky transition-colors">
                <Bell className="w-5 h-5" />
                {unreadAlerts.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-iaf-alert rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                    {unreadAlerts.length}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-iaf-navy border-iaf-navy-light">
              <div className="flex items-center justify-between px-3 py-2 border-b border-iaf-navy-light">
                <span className="text-sm font-medium text-iaf-sky">Notifications</span>
                <span className="text-xs text-iaf-sky/60">{unreadAlerts.length} unread</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {alerts.map((alert) => (
                  <DropdownMenuItem
                    key={alert.id}
                    className="px-3 py-2 hover:bg-iaf-navy-light/70 hover:border-l-2 hover:border-iaf-gold focus:bg-iaf-navy-light/70 cursor-pointer border-l-2 border-transparent transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                        alert.type === 'critical' && 'bg-iaf-alert',
                        alert.type === 'warning' && 'bg-iaf-warning',
                        alert.type === 'info' && 'bg-iaf-cyan'
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-iaf-sky truncate">{alert.title}</p>
                        <p className="text-xs text-iaf-sky/60 line-clamp-2">{alert.message}</p>
                        <p className="text-xs text-iaf-sky/40 mt-1">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {!alert.isRead && (
                        <div className="w-2 h-2 bg-iaf-gold rounded-full flex-shrink-0" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-full hover:bg-iaf-navy-light/50 transition-colors">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full bg-iaf-navy-light"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-iaf-sky">{user.name}</p>
                    <Badge variant="outline" className={cn('text-[10px] px-1 py-0', getRoleBadge(user.role).color)}>
                      {getRoleBadge(user.role).label}
                    </Badge>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-iaf-navy border-iaf-navy-light">
                <div className="px-3 py-2 border-b border-iaf-navy-light">
                  <p className="text-sm font-medium text-iaf-sky">{user.name}</p>
                  <p className="text-xs text-iaf-sky/60">{user.email}</p>
                  <p className="text-xs text-iaf-sky/40 mt-1">{user.rank}</p>
                </div>
                <DropdownMenuItem className="text-iaf-sky/70 hover:text-iaf-sky hover:bg-iaf-navy-light cursor-pointer">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-iaf-sky/70 hover:text-iaf-sky hover:bg-iaf-navy-light cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-iaf-navy-light" />
                <DropdownMenuItem
                  onClick={() => {
                    import('@/lib/auth').then(({ logout }) => {
                      logout();
                      window.location.href = '/login';
                    });
                  }}
                  className="text-iaf-alert hover:text-iaf-alert hover:bg-iaf-navy-light cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
