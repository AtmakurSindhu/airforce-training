import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { courses } from '@/data/mockData';
import { cn, getDifficultyBadgeColor } from '@/lib/utils';
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  Layers,
  Play,
  CheckCircle,
  RotateCcw,
} from 'lucide-react';

const categories = [
  'All',
  'Jet Engine Systems',
  'Hydraulics',
  'Electrical Systems',
  'Avionics',
  'Flight Control',
  'Weapons Systems',
  'Landing Gear',
  'Fuel Systems',
];

const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];

export default function CourseCatalogPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-iaf-success" />;
      case 'in-progress':
        return <Play className="w-4 h-4 text-iaf-cyan" />;
      default:
        return null;
    }
  };

  const getActionButton = (course: typeof courses[0]) => {
    switch (course.status) {
      case 'completed':
        return (
          <Button
            variant="outline"
            size="sm"
            className="border-iaf-success/50 text-iaf-success hover:bg-iaf-success/10"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/trainee/module/${course.id}`);
            }}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Review
          </Button>
        );
      case 'in-progress':
        return (
          <Button
            size="sm"
            className="bg-iaf-cyan hover:bg-iaf-cyan/80 text-iaf-navy-dark"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/trainee/module/${course.id}`);
            }}
          >
            <Play className="w-4 h-4 mr-1" />
            Continue
          </Button>
        );
      default:
        return (
          <Button
            size="sm"
            className="bg-iaf-gold hover:bg-iaf-gold-light text-iaf-navy-dark"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/trainee/module/${course.id}`);
            }}
          >
            <Play className="w-4 h-4 mr-1" />
            Start
          </Button>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Training Catalog"
        subtitle="Browse and enroll in aircraft systems training courses"
        icon={BookOpen}
      />

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-iaf-sky/50" />
            <Input
              placeholder="Search courses, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-iaf-navy-light/50 border-iaf-navy-light text-iaf-sky placeholder:text-iaf-sky/40"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'border-iaf-navy-light text-iaf-sky hover:bg-iaf-navy-light/50',
              showFilters && 'bg-iaf-navy-light/50 border-iaf-gold/50'
            )}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="p-4 rounded-lg bg-iaf-navy-light/30 border border-iaf-navy-light/50 space-y-4">
            {/* Category Filter */}
            <div>
              <label className="text-sm text-iaf-sky/70 mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'px-3 py-1.5 text-xs rounded-full border transition-colors',
                      selectedCategory === category
                        ? 'bg-iaf-gold/20 border-iaf-gold text-iaf-gold'
                        : 'bg-iaf-navy/50 border-iaf-navy-light/50 text-iaf-sky/60 hover:text-iaf-sky hover:border-iaf-sky/30'
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="text-sm text-iaf-sky/70 mb-2 block">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={cn(
                      'px-3 py-1.5 text-xs rounded-full border transition-colors capitalize',
                      selectedDifficulty === difficulty
                        ? 'bg-iaf-cyan/20 border-iaf-cyan text-iaf-cyan'
                        : 'bg-iaf-navy/50 border-iaf-navy-light/50 text-iaf-sky/60 hover:text-iaf-sky hover:border-iaf-sky/30'
                    )}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-iaf-sky/60">
            Showing <span className="text-iaf-sky font-medium">{filteredCourses.length}</span> courses
          </p>
          {(selectedCategory !== 'All' || selectedDifficulty !== 'All') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="text-iaf-sky/60 hover:text-iaf-sky"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="bg-iaf-navy/60 border-iaf-navy-light/30 hover:border-iaf-gold/30 transition-all duration-200 cursor-pointer group overflow-hidden"
            onClick={() => navigate(`/trainee/module/${course.id}`)}
          >
            {/* Thumbnail */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-iaf-navy to-transparent" />
              
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <StatusBadge status={course.status} size="sm" />
              </div>
              
              {/* Difficulty Badge */}
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className={getDifficultyBadgeColor(course.difficulty)}>
                  {course.difficulty}
                </Badge>
              </div>
              
              {/* Category */}
              <div className="absolute bottom-3 left-3">
                <span className="text-xs text-iaf-sky/70 bg-iaf-navy/80 px-2 py-0.5 rounded">
                  {course.category}
                </span>
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              {/* Title */}
              <div className="flex items-start gap-2">
                <h3 className="text-lg font-bold text-iaf-sky line-clamp-2 flex-1 tracking-wide" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {course.title}
                </h3>
                {getStatusIcon(course.status)}
              </div>

              {/* Description */}
              <p className="text-sm text-iaf-sky/60 line-clamp-2">
                {course.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-iaf-sky/50">
                <div className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{course.moduleCount} modules</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Progress */}
              {course.status !== 'not-started' && (
                <div className="pt-2">
                  <ProgressBar value={course.progress} size="sm" />
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                {getActionButton(course)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-iaf-sky/20 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-iaf-sky mb-2">No courses found</h3>
          <p className="text-sm text-iaf-sky/60">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
