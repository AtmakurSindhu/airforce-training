import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { DashboardCard } from '@/components/ui/DashboardCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { traineeProgress, courses } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import {
  GraduationCap,
  TrendingUp,
  Clock,
  BookOpen,
  Target,
  Award,
  Activity,
  CheckCircle,
  BarChart3,
} from 'lucide-react';

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState('week');
  
  const completedCourses = courses.filter(c => c.status === 'completed');
  const inProgressCourses = courses.filter(c => c.status === 'in-progress');

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Training Progress"
        subtitle="Track your learning journey and achievements"
        icon={GraduationCap}
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Overall Progress"
          value={`${traineeProgress.overallProgress}%`}
          subtitle="Across all courses"
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
        <DashboardCard
          title="Readiness Score"
          value={traineeProgress.readinessScore}
          subtitle="Mission readiness rating"
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
          subtitle="Certification progress"
          icon={Award}
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-iaf-navy-light/50 border border-iaf-navy-light/50">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-iaf-gold data-[state=active]:text-iaf-navy-dark"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className="data-[state=active]:bg-iaf-gold data-[state=active]:text-iaf-navy-dark"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Courses
          </TabsTrigger>
          <TabsTrigger
            value="skills"
            className="data-[state=active]:bg-iaf-gold data-[state=active]:text-iaf-navy-dark"
          >
            <Target className="w-4 h-4 mr-2" />
            Skills
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="data-[state=active]:bg-iaf-gold data-[state=active]:text-iaf-navy-dark"
          >
            <Activity className="w-4 h-4 mr-2" />
            Activity
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Chart Placeholder */}
            <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-iaf-sky">Progress Trend</CardTitle>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-iaf-navy-light/50 border border-iaf-navy-light rounded px-2 py-1 text-xs text-iaf-sky"
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                </select>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[65, 68, 72, 70, 75, 78, 82].map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-iaf-gold/60 rounded-t transition-all duration-500"
                        style={{ height: `${value * 2}px` }}
                      />
                      <span className="text-xs text-iaf-sky/50">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Readiness Breakdown */}
            <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
              <CardHeader>
                <CardTitle className="text-lg text-iaf-sky">Readiness Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Technical Knowledge', value: 85 },
                  { label: 'Practical Skills', value: 72 },
                  { label: 'Emergency Procedures', value: 90 },
                  { label: 'Simulation Performance', value: 78 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-iaf-sky/70">{item.label}</span>
                      <span className="text-sm font-medium text-iaf-sky">{item.value}%</span>
                    </div>
                    <ProgressBar value={item.value} size="sm" showLabel={false} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Modules Completed', value: traineeProgress.completedModules, icon: CheckCircle },
              { label: 'Assessments Passed', value: 24, icon: Award },
              { label: 'Simulations Run', value: 18, icon: Activity },
              { label: 'Study Hours', value: 156, icon: Clock },
            ].map((stat) => (
              <Card key={stat.label} className="bg-iaf-navy/60 border-iaf-navy-light/30">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-iaf-gold/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-iaf-gold" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-iaf-sky">{stat.value}</p>
                    <p className="text-xs text-iaf-sky/50">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="mt-6 space-y-6">
          {/* In Progress */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader>
              <CardTitle className="text-lg text-iaf-sky">In Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {inProgressCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-iaf-navy-light/30"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-iaf-sky">{course.title}</h4>
                    <p className="text-xs text-iaf-sky/50">{course.category}</p>
                  </div>
                  <div className="w-32">
                    <ProgressBar value={course.progress} size="sm" />
                  </div>
                  <span className="text-sm font-medium text-iaf-sky">{course.progress}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Completed */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader>
              <CardTitle className="text-lg text-iaf-sky">Completed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-iaf-success/10 border border-iaf-success/30"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-iaf-sky">{course.title}</h4>
                    <p className="text-xs text-iaf-sky/50">{course.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-iaf-success" />
                    <span className="text-sm font-medium text-iaf-success">Completed</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="mt-6">
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader>
              <CardTitle className="text-lg text-iaf-sky">Skill Proficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {traineeProgress.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-iaf-sky">{skill.name}</h4>
                        <p className="text-xs text-iaf-sky/50">{skill.category}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-iaf-gold">
                          {Math.round((skill.level / skill.maxLevel) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="relative h-3 bg-iaf-navy-light/50 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-iaf-gold to-iaf-gold-light rounded-full transition-all duration-500"
                        style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-iaf-sky/40">
                      Level {skill.level} of {skill.maxLevel}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="mt-6">
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader>
              <CardTitle className="text-lg text-iaf-sky">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {traineeProgress.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-iaf-navy-light/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-iaf-gold/20 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-iaf-gold" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-iaf-sky">{activity.title}</h4>
                      {activity.details && (
                        <p className="text-sm text-iaf-sky/60">{activity.details}</p>
                      )}
                      <p className="text-xs text-iaf-sky/40 mt-1">
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-iaf-gold" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
