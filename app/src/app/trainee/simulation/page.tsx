import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { simulations } from '@/data/mockData';
import { cn, getDifficultyBadgeColor } from '@/lib/utils';
import {
  Plane,
  Play,
  Clock,
  Target,
  CheckCircle,
  RotateCcw,
  Settings,
  BarChart3,
} from 'lucide-react';

const simulationTypes = [
  { id: 'all', label: 'All Simulations' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'flight-readiness', label: 'Flight Readiness' },
  { id: 'mission-rehearsal', label: 'Mission Rehearsal' },
];

export default function SimulationPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSimulation, setSelectedSimulation] = useState<typeof simulations[0] | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  const filteredSimulations = selectedType === 'all'
    ? simulations
    : simulations.filter(s => s.type === selectedType);

  const handleLaunch = () => {
    if (!selectedSimulation) return;
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      // In a real app, this would launch the simulation
    }, 2000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <Settings className="w-5 h-5" />;
      case 'flight-readiness':
        return <Plane className="w-5 h-5" />;
      case 'mission-rehearsal':
        return <Target className="w-5 h-5" />;
      default:
        return <Plane className="w-5 h-5" />;
    }
  };

  const getStatusButton = (simulation: typeof simulations[0]) => {
    switch (simulation.status) {
      case 'completed':
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSimulation(simulation);
            }}
            className="border-iaf-success/50 text-iaf-success hover:bg-iaf-success/10"
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Results
          </Button>
        );
      case 'in-progress':
        return (
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSimulation(simulation);
            }}
            className="bg-iaf-cyan hover:bg-iaf-cyan/80 text-iaf-navy-dark"
          >
            <Play className="w-4 h-4 mr-1" />
            Resume
          </Button>
        );
      default:
        return (
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSimulation(simulation);
            }}
            className="bg-iaf-gold hover:bg-iaf-gold-light text-iaf-navy-dark"
          >
            <Play className="w-4 h-4 mr-1" />
            Launch
          </Button>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Mission Simulation"
        subtitle="Launch training simulations and mission rehearsals"
        icon={Plane}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulation List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            {simulationTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  'px-4 py-2 text-sm rounded-lg border transition-colors',
                  selectedType === type.id
                    ? 'bg-iaf-gold/20 border-iaf-gold text-iaf-gold'
                    : 'bg-iaf-navy/50 border-iaf-navy-light/50 text-iaf-sky/60 hover:text-iaf-sky hover:border-iaf-sky/30'
                )}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Simulations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSimulations.map((simulation) => (
              <Card
                key={simulation.id}
                className={cn(
                  'bg-iaf-navy/60 border-iaf-navy-light/30 cursor-pointer transition-all',
                  selectedSimulation?.id === simulation.id && 'border-iaf-gold/50 ring-1 ring-iaf-gold/30'
                )}
                onClick={() => setSelectedSimulation(simulation)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center',
                      simulation.type === 'maintenance' && 'bg-iaf-warning/20 text-iaf-warning',
                      simulation.type === 'flight-readiness' && 'bg-iaf-cyan/20 text-iaf-cyan',
                      simulation.type === 'mission-rehearsal' && 'bg-iaf-gold/20 text-iaf-gold'
                    )}>
                      {getTypeIcon(simulation.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-iaf-sky truncate">{simulation.title}</h3>
                        <StatusBadge status={simulation.status} size="sm" showDot={false} />
                      </div>
                      <p className="text-xs text-iaf-sky/50 mt-1 line-clamp-2">{simulation.description}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <Badge variant="outline" className={getDifficultyBadgeColor(simulation.difficulty)}>
                          {simulation.difficulty}
                        </Badge>
                        <span className="text-xs text-iaf-sky/50 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {simulation.duration}
                        </span>
                        <span className="text-xs text-iaf-sky/50">{simulation.aircraft}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-iaf-navy-light/30 flex justify-end">
                    {getStatusButton(simulation)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Briefing Panel */}
        <div>
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30 sticky top-20">
            <CardHeader>
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <Target className="w-5 h-5 text-iaf-gold" />
                Mission Briefing
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedSimulation ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-iaf-sky">{selectedSimulation.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <StatusBadge status={selectedSimulation.status} size="sm" />
                      <Badge variant="outline" className={getDifficultyBadgeColor(selectedSimulation.difficulty)}>
                        {selectedSimulation.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-iaf-navy-light/30 rounded-lg">
                    <p className="text-sm text-iaf-sky/80">{selectedSimulation.briefing}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-iaf-sky mb-2">Mission Objectives</h4>
                    <ul className="space-y-2">
                      {selectedSimulation.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-iaf-gold mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-iaf-sky/70">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-iaf-navy-light/30">
                    <div>
                      <p className="text-xs text-iaf-sky/50">Aircraft</p>
                      <p className="text-sm text-iaf-sky">{selectedSimulation.aircraft}</p>
                    </div>
                    <div>
                      <p className="text-xs text-iaf-sky/50">Duration</p>
                      <p className="text-sm text-iaf-sky">{selectedSimulation.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-iaf-sky/50">Type</p>
                      <p className="text-sm text-iaf-sky capitalize">{selectedSimulation.type.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-iaf-sky/50">Difficulty</p>
                      <p className="text-sm text-iaf-sky capitalize">{selectedSimulation.difficulty}</p>
                    </div>
                  </div>

                  <Button
                    onClick={handleLaunch}
                    disabled={isLaunching || selectedSimulation.status === 'completed'}
                    className="w-full bg-iaf-gold hover:bg-iaf-gold-light text-iaf-navy-dark"
                  >
                    {isLaunching ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                        Launching...
                      </>
                    ) : selectedSimulation.status === 'completed' ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </>
                    ) : selectedSimulation.status === 'in-progress' ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Resume Simulation
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Simulation
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Plane className="w-16 h-16 text-iaf-sky/20 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-iaf-sky mb-2">Select a Simulation</h3>
                  <p className="text-sm text-iaf-sky/50">
                    Choose a simulation from the list to view the mission briefing
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
