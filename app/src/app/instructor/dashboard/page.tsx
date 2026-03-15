import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { DashboardCard } from '@/components/ui/DashboardCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { traineeOverviews, trainingSessions, analyticsData } from '@/data/mockData';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  TrendingUp,
  Calendar,
  Target,
  AlertTriangle,
  ChevronRight,
  BarChart3,
  Clock,
  BookOpen,
} from 'lucide-react';

export default function InstructorDashboardPage() {
  const navigate = useNavigate();
  
  const activeTrainees = traineeOverviews.filter(t => t.status === 'active');
  const avgReadiness = Math.round(
    traineeOverviews.reduce((acc, t) => acc + t.readinessScore, 0) / traineeOverviews.length
  );
  const avgProgress = Math.round(
    traineeOverviews.reduce((acc, t) => acc + t.progress, 0) / traineeOverviews.length
  );
  const upcomingSessions = trainingSessions.filter(s => s.status === 'scheduled');

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Instructor Dashboard"
        subtitle="Overview of trainee progress and training activities"
        icon={LayoutDashboard}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Trainees"
          value={traineeOverviews.length}
          subtitle={`${activeTrainees.length} currently active`}
          icon={Users}
        />
        <DashboardCard
          title="Avg. Readiness"
          value={avgReadiness}
          subtitle="Squadron readiness score"
          icon={Target}
          variant="glow"
        />
        <DashboardCard
          title="Avg. Progress"
          value={`${avgProgress}%`}
          subtitle="Training completion rate"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <DashboardCard
          title="Upcoming Sessions"
          value={upcomingSessions.length}
          subtitle="Scheduled training sessions"
          icon={Calendar}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trainee Performance */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-iaf-gold" />
                Trainee Performance
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/instructor/trainees')}
                className="text-iaf-gold hover:text-iaf-gold-light hover:bg-iaf-gold/10"
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {traineeOverviews.slice(0, 5).map((trainee) => (
                  <div
                    key={trainee.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-iaf-navy-light/30 hover:bg-iaf-navy-light/50 transition-colors cursor-pointer"
                    onClick={() => navigate('/instructor/trainees')}
                  >
                    <img
                      src={trainee.avatar}
                      alt={trainee.name}
                      className="w-10 h-10 rounded-full bg-iaf-navy-light"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-iaf-sky">{trainee.name}</h4>
                        <StatusBadge status={trainee.status} size="sm" showDot={false} />
                      </div>
                      <p className="text-xs text-iaf-sky/50">{trainee.rank}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-iaf-sky/50">Readiness</p>
                        <p className={cn(
                          'text-sm font-medium',
                          trainee.readinessScore >= 80 ? 'text-iaf-success' :
                          trainee.readinessScore >= 60 ? 'text-iaf-warning' : 'text-iaf-alert'
                        )}>
                          {trainee.readinessScore}
                        </p>
                      </div>
                      <div className="w-24">
                        <ProgressBar value={trainee.progress} size="sm" showLabel={false} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Training Analytics Chart */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-iaf-cyan" />
                Training Analytics
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/instructor/analytics')}
                className="text-iaf-cyan hover:text-iaf-cyan hover:bg-iaf-cyan/10"
              >
                Detailed View <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end justify-between gap-4">
                {analyticsData.readinessTrend.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center gap-1">
                      <div
                        className="w-4 bg-iaf-gold/60 rounded-t transition-all"
                        style={{ height: `${data.value * 1.5}px` }}
                      />
                      <div
                        className="w-4 bg-iaf-cyan/60 rounded-t transition-all"
                        style={{ height: `${(data.value - 10) * 1.5}px` }}
                      />
                    </div>
                    <span className="text-xs text-iaf-sky/50">{data.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-iaf-gold/60 rounded" />
                  <span className="text-xs text-iaf-sky/60">Readiness Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-iaf-cyan/60 rounded" />
                  <span className="text-xs text-iaf-sky/60">Completion Rate</span>
                </div>
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
                onClick={() => navigate('/instructor/sessions')}
              >
                <Calendar className="w-4 h-4 text-iaf-gold group-hover:text-iaf-gold" />
                Schedule Session
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 border-iaf-navy-light/50 text-iaf-sky hover:bg-iaf-cyan/20 hover:border-iaf-cyan/50 hover:text-iaf-cyan transition-all duration-200"
                onClick={() => navigate('/instructor/content')}
              >
                <BookOpen className="w-4 h-4 text-iaf-cyan" />
                Manage Content
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 border-iaf-navy-light/50 text-iaf-sky hover:bg-iaf-success/20 hover:border-iaf-success/50 hover:text-iaf-success transition-all duration-200"
                onClick={() => navigate('/instructor/scenarios')}
              >
                <Target className="w-4 h-4 text-iaf-success" />
                Create Scenario
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <Clock className="w-5 h-5 text-iaf-cyan" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-3 rounded-lg bg-iaf-navy-light/30 border-l-2 border-iaf-cyan"
                >
                  <h4 className="text-sm font-medium text-iaf-sky">{session.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-iaf-sky/40" />
                    <span className="text-xs text-iaf-sky/50">
                      {new Date(session.date).toLocaleDateString()} • {session.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Users className="w-3 h-3 text-iaf-sky/40" />
                    <span className="text-xs text-iaf-sky/50">{session.participants.length} trainees</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-iaf-warning" />
                Attention Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {traineeOverviews
                .filter(t => t.readinessScore < 60)
                .map((trainee) => (
                  <div
                    key={trainee.id}
                    className="p-3 rounded-lg bg-iaf-alert/10 border border-iaf-alert/30"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-iaf-alert" />
                      <span className="text-sm text-iaf-sky">{trainee.name}</span>
                    </div>
                    <p className="text-xs text-iaf-sky/60 mt-1">
                      Low readiness score: {trainee.readinessScore}
                    </p>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Skill Distribution */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-iaf-sky">Skill Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analyticsData.skillDistribution.map((skill) => (
                <div key={skill.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-iaf-sky/70">{skill.label}</span>
                    <span className="text-xs text-iaf-sky">{skill.value}%</span>
                  </div>
                  <ProgressBar value={skill.value} size="sm" showLabel={false} />
                </div>
              ))}
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
