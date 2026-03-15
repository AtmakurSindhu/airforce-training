import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { DashboardCard } from '@/components/ui/DashboardCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { users, roles, systemStatus, auditLogs } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  Activity,
  Server,
  Lock,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronRight,
  Terminal,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  
  const totalUsers = users.length;
  const totalRoles = roles.length;
  const activeServices = systemStatus.filter(s => s.status === 'operational').length;
  const degradedServices = systemStatus.filter(s => s.status === 'degraded').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Admin Control Center"
        subtitle="System administration and security management"
        icon={LayoutDashboard}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Users"
          value={totalUsers}
          subtitle="Active platform users"
          icon={Users}
        />
        <DashboardCard
          title="Roles Configured"
          value={totalRoles}
          subtitle="Access control roles"
          icon={Shield}
        />
        <DashboardCard
          title="System Status"
          value={`${activeServices}/${systemStatus.length}`}
          subtitle="Services operational"
          icon={Server}
          variant={degradedServices > 0 ? 'warning' : 'success'}
        />
        <DashboardCard
          title="Security Score"
          value="98%"
          subtitle="Platform security rating"
          icon={Lock}
          variant="glow"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* System Status */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <Server className="w-5 h-5 text-iaf-cyan" />
                System Services
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/system')}
                className="text-iaf-cyan hover:text-iaf-cyan hover:bg-iaf-cyan/10"
              >
                Manage <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {systemStatus.map((service) => (
                  <div
                    key={service.service}
                    className="flex items-center justify-between p-3 rounded-lg bg-iaf-navy-light/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-2 h-2 rounded-full',
                        service.status === 'operational' && 'bg-iaf-success',
                        service.status === 'degraded' && 'bg-iaf-warning',
                        service.status === 'down' && 'bg-iaf-alert'
                      )} />
                      <span className="text-sm text-iaf-sky">{service.service}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-iaf-sky/50">{service.uptime} uptime</span>
                      <StatusBadge status={service.status} size="sm" showDot={false} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Audit Logs */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <Terminal className="w-5 h-5 text-iaf-gold" />
                Recent Activity Logs
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/audit')}
                className="text-iaf-gold hover:text-iaf-gold-light hover:bg-iaf-gold/10"
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {auditLogs.slice(0, 5).map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-iaf-navy-light/30 hover:bg-iaf-navy-light/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-iaf-navy-light flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-iaf-sky/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-iaf-sky">{log.action}</span>
                        <span className="text-xs text-iaf-sky/50">• {log.module}</span>
                      </div>
                      <p className="text-xs text-iaf-sky/60 truncate">{log.details}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-iaf-sky/70">{log.userName}</p>
                      <p className="text-xs text-iaf-sky/40">{formatRelativeTime(log.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-iaf-sky">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 border-iaf-navy-light/50 text-iaf-sky hover:bg-iaf-gold/20 hover:border-iaf-gold/50 hover:text-iaf-gold transition-all duration-200"
                onClick={() => navigate('/admin/users')}
              >
                <Users className="w-4 h-4 text-iaf-gold" />
                Manage Users
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 border-iaf-navy-light/50 text-iaf-sky hover:bg-iaf-cyan/20 hover:border-iaf-cyan/50 hover:text-iaf-cyan transition-all duration-200"
                onClick={() => navigate('/admin/roles')}
              >
                <Shield className="w-4 h-4 text-iaf-cyan" />
                Configure Roles
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 border-iaf-navy-light/50 text-iaf-sky hover:bg-iaf-success/20 hover:border-iaf-success/50 hover:text-iaf-success transition-all duration-200"
                onClick={() => navigate('/admin/security')}
              >
                <Lock className="w-4 h-4 text-iaf-success" />
                Security Settings
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 border-iaf-navy-light/50 text-iaf-sky hover:bg-iaf-warning/20 hover:border-iaf-warning/50 hover:text-iaf-warning transition-all duration-200"
                onClick={() => navigate('/admin/system')}
              >
                <Settings className="w-4 h-4 text-iaf-warning" />
                System Config
              </Button>
            </CardContent>
          </Card>

          {/* Role Summary */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-iaf-sky">Role Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-iaf-navy-light/30"
                >
                  <div>
                    <p className="text-sm font-medium text-iaf-sky">{role.name}</p>
                    <p className="text-xs text-iaf-sky/50">{role.permissions.length} permissions</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-iaf-sky/40" />
                    <span className="text-sm text-iaf-sky">{role.userCount}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security Alerts */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-iaf-alert" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-iaf-success/10 border border-iaf-success/30">
                <CheckCircle className="w-5 h-5 text-iaf-success" />
                <div>
                  <p className="text-sm text-iaf-sky">All Systems Secure</p>
                  <p className="text-xs text-iaf-sky/50">No security threats detected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-iaf-warning/10 border border-iaf-warning/30">
                <Clock className="w-5 h-5 text-iaf-warning" />
                <div>
                  <p className="text-sm text-iaf-sky">Session Timeout</p>
                  <p className="text-xs text-iaf-sky/50">Auto-logout in 15 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
