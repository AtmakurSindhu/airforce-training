import { useNavigate } from 'react-router-dom';
import { requireAuth } from '@/lib/auth';
import { PageHeader } from '@/components/layout/PageHeader';
import { DashboardCard } from '@/components/ui/DashboardCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { traineeProgress, courses, simulations, alerts } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  AlertTriangle,
  Play,
  ChevronRight,
  Plane,
  Cpu,
  Bot,
} from 'lucide-react';

export default function TraineeDashboardPage() {
  const navigate = useNavigate();
  const user = requireAuth();

  if (!user) return null;

  const inProgressCourses = courses.filter(c => c.status === 'in-progress').slice(0, 3);
  const availableSimulations = simulations.filter(s => s.status === 'available').slice(0, 3);
  const unreadAlerts = alerts.filter(a => !a.isRead);

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Mission Dashboard"
        subtitle={`Welcome back, ${user.rank} ${user.name.split(' ').pop()}`}
        icon={LayoutDashboard}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Overall Progress"
          value={`${traineeProgress.overallProgress}%`}
          subtitle={`${traineeProgress.completedModules} of ${traineeProgress.totalModules} modules`}
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Readiness Score"
          value={traineeProgress.readinessScore}
          subtitle="Based on assessments & simulations"
          icon={Target}
          variant="glow"
        />
        <DashboardCard
          title="Simulation Hours"
          value={traineeProgress.simulationHours}
          subtitle="Total training time"
          icon={Clock}
        />
        <DashboardCard
          title="Courses Completed"
          value={`${traineeProgress.completedCourses}/${traineeProgress.totalCourses}`}
          subtitle="Active learning path"
          icon={BookOpen}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          {/* In Progress Courses */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-iaf-gold" />
                Continue Learning
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/trainee/catalog')}
                className="text-iaf-gold hover:text-iaf-gold-light hover:bg-iaf-gold/10"
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {inProgressCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-iaf-navy-light/30 hover:bg-iaf-navy-light/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/trainee/module/${course.id}`)}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-20 h-14 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-iaf-sky truncate">{course.title}</h4>
                    <p className="text-xs text-iaf-sky/50">{course.category}</p>
                    <div className="mt-2">
                      <ProgressBar value={course.progress} size="sm" showLabel={false} />
                    </div>
                  </div>
                  <Button size="sm" className="bg-iaf-gold hover:bg-iaf-gold-light text-iaf-navy-dark">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Available Simulations */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <Plane className="w-5 h-5 text-iaf-cyan" />
                Mission Simulations
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/trainee/simulation')}
                className="text-iaf-cyan hover:text-iaf-cyan hover:bg-iaf-cyan/10"
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableSimulations.map((sim) => (
                <div
                  key={sim.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-iaf-navy-light/30 hover:bg-iaf-navy-light/50 transition-colors cursor-pointer"
                  onClick={() => navigate('/trainee/simulation')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-iaf-cyan/20 flex items-center justify-center">
                      <Plane className="w-5 h-5 text-iaf-cyan" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-iaf-sky">{sim.title}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StatusBadge status={sim.difficulty} size="sm" showDot={false} />
                        <span className="text-xs text-iaf-sky/50">{sim.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-iaf-cyan/50 text-iaf-cyan hover:bg-iaf-cyan/10"
                  >
                    Launch
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-iaf-sky">Quick Launch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 border-iaf-navy-light text-iaf-sky hover:bg-iaf-gold/20 hover:border-iaf-gold hover:text-iaf-gold transition-all duration-200 group"
                onClick={() => navigate('/trainee/digital-twin')}
              >
                <Cpu className="w-4 h-4 text-iaf-gold group-hover:text-iaf-gold" />
                Digital Twin Explorer
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 border-iaf-navy-light text-iaf-sky hover:bg-iaf-cyan/20 hover:border-iaf-cyan hover:text-iaf-cyan transition-all duration-200 group"
                onClick={() => navigate('/trainee/ai-assistant')}
              >
                <Bot className="w-4 h-4 text-iaf-cyan group-hover:text-iaf-cyan" />
                AI Training Assistant
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 border-iaf-navy-light text-iaf-sky hover:bg-iaf-success/20 hover:border-iaf-success hover:text-iaf-success transition-all duration-200 group"
                onClick={() => navigate('/trainee/catalog')}
              >
                <BookOpen className="w-4 h-4 text-iaf-success group-hover:text-iaf-success" />
                Browse Course Catalog
              </Button>
            </CardContent>
          </Card>

          {/* Skills Overview */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-iaf-sky">Skill Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {traineeProgress.skills.slice(0, 4).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-iaf-sky/70">{skill.name}</span>
                    <span className="text-xs text-iaf-sky/50">{skill.level}/{skill.maxLevel}</span>
                  </div>
                  <ProgressBar
                    value={skill.level}
                    max={skill.maxLevel}
                    size="sm"
                    showLabel={false}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-iaf-warning" />
                Alerts
              </CardTitle>
              {unreadAlerts.length > 0 && (
                <span className="px-2 py-0.5 bg-iaf-alert/20 text-iaf-alert text-xs rounded-full">
                  {unreadAlerts.length}
                </span>
              )}
            </CardHeader>
            <CardContent className="space-y-2">
              {alerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg bg-iaf-navy-light/30 border-l-2 border-iaf-warning"
                >
                  <div className="flex items-start gap-2">
                    <StatusBadge status={alert.type} size="sm" showDot={false} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-iaf-sky">{alert.title}</p>
                      <p className="text-xs text-iaf-sky/50 line-clamp-2">{alert.message}</p>
                      <p className="text-xs text-iaf-sky/30 mt-1">
                        {formatRelativeTime(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-iaf-sky">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {traineeProgress.recentActivity.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-iaf-gold mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-iaf-sky truncate">{activity.title}</p>
                    <p className="text-xs text-iaf-sky/50">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
