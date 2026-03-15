import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/badge';
import { courses, modules } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  FileText,
  ListOrdered,
  Image as ImageIcon,
  AlertTriangle,
  BookOpen,
  Clock,
} from 'lucide-react';

export default function ModuleViewerPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('video');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const course = courses.find(c => c.id === id) || courses[0];
  const courseModules = modules.filter(m => m.courseId === course.id);
  const currentModule = courseModules[currentModuleIndex] || modules[0];

  const toggleStepComplete = (stepId: string) => {
    setCompletedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(s => s !== stepId)
        : [...prev, stepId]
    );
  };

  const goToNextModule = () => {
    if (currentModuleIndex < courseModules.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
    }
  };

  const goToPrevModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(prev => prev - 1);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={course.title}
        subtitle={`Module ${currentModuleIndex + 1} of ${courseModules.length}: ${currentModule.title}`}
        icon={BookOpen}
        showBackButton
      />

      {/* Progress Bar */}
      <div className="bg-iaf-navy-light/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-iaf-sky/70">Course Progress</span>
          <span className="text-sm font-medium text-iaf-sky">{course.progress}%</span>
        </div>
        <ProgressBar value={course.progress} showLabel={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-iaf-navy-light/50 border border-iaf-navy-light/50">
              <TabsTrigger
                value="video"
                className="data-[state=active]:bg-iaf-gold data-[state=active]:text-iaf-navy-dark"
              >
                <Play className="w-4 h-4 mr-2" />
                Video
              </TabsTrigger>
              <TabsTrigger
                value="documentation"
                className="data-[state=active]:bg-iaf-gold data-[state=active]:text-iaf-navy-dark"
              >
                <FileText className="w-4 h-4 mr-2" />
                Documentation
              </TabsTrigger>
              <TabsTrigger
                value="procedures"
                className="data-[state=active]:bg-iaf-gold data-[state=active]:text-iaf-navy-dark"
              >
                <ListOrdered className="w-4 h-4 mr-2" />
                Procedures
              </TabsTrigger>
              <TabsTrigger
                value="diagrams"
                className="data-[state=active]:bg-iaf-gold data-[state=active]:text-iaf-navy-dark"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Diagrams
              </TabsTrigger>
            </TabsList>

            {/* Video Tab */}
            <TabsContent value="video" className="mt-4">
              <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-iaf-navy-dark rounded-t-lg overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={currentModule.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 rounded-full bg-iaf-gold/90 hover:bg-iaf-gold flex items-center justify-center transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-iaf-navy-dark" />
                        ) : (
                          <Play className="w-8 h-8 text-iaf-navy-dark ml-1" />
                        )}
                      </button>
                    </div>
                    
                    {/* Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-white hover:text-iaf-gold"
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                        <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-iaf-gold" />
                        </div>
                        <span className="text-xs text-white/70">12:34 / {currentModule.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-iaf-sky mb-2">{currentModule.title}</h3>
                    <p className="text-sm text-iaf-sky/60">{currentModule.description}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documentation Tab */}
            <TabsContent value="documentation" className="mt-4">
              <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
                <CardHeader>
                  <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                    <FileText className="w-5 h-5 text-iaf-gold" />
                    Module Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-iaf-sky/80 leading-relaxed whitespace-pre-line">
                      {currentModule.documentation}
                    </p>
                    <div className="mt-6 p-4 bg-iaf-cyan/10 border border-iaf-cyan/30 rounded-lg">
                      <h4 className="text-sm font-medium text-iaf-cyan mb-2">Key Points</h4>
                      <ul className="list-disc list-inside text-sm text-iaf-sky/70 space-y-1">
                        <li>Always follow the checklist in sequence</li>
                        <li>Monitor EGT closely during startup</li>
                        <li>Abort start if EGT exceeds limits</li>
                        <li>Verify all parameters before flight</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Procedures Tab */}
            <TabsContent value="procedures" className="mt-4">
              <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
                <CardHeader>
                  <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                    <ListOrdered className="w-5 h-5 text-iaf-gold" />
                    Step-by-Step Procedures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentModule.procedures.map((procedure) => (
                    <div
                      key={procedure.id}
                      className={cn(
                        'p-4 rounded-lg border transition-all cursor-pointer',
                        completedSteps.includes(procedure.id)
                          ? 'bg-iaf-success/10 border-iaf-success/30'
                          : 'bg-iaf-navy-light/30 border-iaf-navy-light/50 hover:border-iaf-gold/30'
                      )}
                      onClick={() => toggleStepComplete(procedure.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                          completedSteps.includes(procedure.id)
                            ? 'bg-iaf-success text-white'
                            : 'bg-iaf-navy-light text-iaf-sky'
                        )}>
                          {completedSteps.includes(procedure.id) ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-medium">{procedure.step}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-iaf-sky">{procedure.title}</h4>
                          <p className="text-sm text-iaf-sky/60 mt-1">{procedure.description}</p>
                          {procedure.caution && (
                            <div className="mt-2 p-2 bg-iaf-warning/10 border border-iaf-warning/30 rounded flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-iaf-warning flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-iaf-warning">{procedure.caution}</span>
                            </div>
                          )}
                          {procedure.warning && (
                            <div className="mt-2 p-2 bg-iaf-alert/10 border border-iaf-alert/30 rounded flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-iaf-alert flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-iaf-alert">{procedure.warning}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Diagrams Tab */}
            <TabsContent value="diagrams" className="mt-4">
              <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
                <CardHeader>
                  <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-iaf-gold" />
                    Technical Diagrams
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentModule.diagrams.map((diagram) => (
                    <div key={diagram.id} className="space-y-2">
                      <img
                        src={diagram.imageUrl}
                        alt={diagram.title}
                        className="w-full rounded-lg border border-iaf-navy-light/50"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-iaf-sky">{diagram.title}</h4>
                          <p className="text-xs text-iaf-sky/50">{diagram.description}</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-iaf-navy-light text-iaf-sky">
                          View Full Size
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={goToPrevModule}
              disabled={currentModuleIndex === 0}
              className="border-iaf-navy-light text-iaf-sky hover:bg-iaf-navy-light/50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Module
            </Button>
            <Button
              onClick={goToNextModule}
              disabled={currentModuleIndex === courseModules.length - 1}
              className="bg-iaf-gold hover:bg-iaf-gold-light text-iaf-navy-dark disabled:opacity-50"
            >
              Next Module
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Sidebar - Module List */}
        <div className="space-y-4">
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader>
              <CardTitle className="text-lg text-iaf-sky">Module List</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {courseModules.map((module, index) => (
                <button
                  key={module.id}
                  onClick={() => setCurrentModuleIndex(index)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3',
                    currentModuleIndex === index
                      ? 'bg-iaf-gold/20 border border-iaf-gold/50'
                      : 'bg-iaf-navy-light/30 hover:bg-iaf-navy-light/50 border border-transparent'
                  )}
                >
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs',
                    module.isCompleted
                      ? 'bg-iaf-success text-white'
                      : currentModuleIndex === index
                      ? 'bg-iaf-gold text-iaf-navy-dark'
                      : 'bg-iaf-navy-light text-iaf-sky/60'
                  )}>
                    {module.isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'text-sm font-medium truncate',
                      currentModuleIndex === index ? 'text-iaf-gold' : 'text-iaf-sky'
                    )}>
                      {module.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-iaf-sky/40" />
                      <span className="text-xs text-iaf-sky/50">{module.duration}</span>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Course Info */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader>
              <CardTitle className="text-lg text-iaf-sky">Course Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-iaf-sky/60">Category</span>
                <Badge variant="outline" className="border-iaf-navy-light text-iaf-sky">
                  {course.category}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-iaf-sky/60">Difficulty</span>
                <Badge variant="outline" className="border-iaf-navy-light text-iaf-sky capitalize">
                  {course.difficulty}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-iaf-sky/60">Duration</span>
                <span className="text-sm text-iaf-sky">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-iaf-sky/60">Modules</span>
                <span className="text-sm text-iaf-sky">{course.moduleCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
