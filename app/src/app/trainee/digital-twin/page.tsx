import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { aircraftSystems } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  Cpu,
  Settings,
  AlertTriangle,
  CheckCircle,
  Info,
  Wrench,
  FileText,
  RotateCcw,
  Eye,
} from 'lucide-react';

const systemCategories = [
  { id: 'all', label: 'All Systems', icon: Cpu },
  { id: 'engine', label: 'Engine', icon: Settings },
  { id: 'hydraulics', label: 'Hydraulics', icon: Settings },
  { id: 'electrical', label: 'Electrical', icon: Settings },
  { id: 'avionics', label: 'Avionics', icon: Cpu },
  { id: 'landing-gear', label: 'Landing Gear', icon: Settings },
  { id: 'fuel-system', label: 'Fuel System', icon: Settings },
  { id: 'weapons-integration', label: 'Weapons', icon: Settings },
];

export default function DigitalTwinPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSystem, setSelectedSystem] = useState(aircraftSystems[0]);
  const [selectedComponent, setSelectedComponent] = useState(aircraftSystems[0]?.components[0]);
  const [viewMode, setViewMode] = useState<'3d' | 'schematic'>('3d');

  const filteredSystems = selectedCategory === 'all'
    ? aircraftSystems
    : aircraftSystems.filter(s => s.category === selectedCategory);

  const overallHealth = Math.round(
    aircraftSystems.reduce((acc, sys) => acc + sys.health, 0) / aircraftSystems.length
  );

  const operationalCount = aircraftSystems.filter(s => s.status === 'operational').length;
  const maintenanceCount = aircraftSystems.filter(s => s.status === 'maintenance').length;
  const faultyCount = aircraftSystems.filter(s => s.status === 'faulty').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Digital Twin Explorer"
        subtitle="Interactive aircraft systems visualization and component analysis"
        icon={Cpu}
      />

      {/* System Health Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-iaf-sky/60">Overall Health</p>
                <p className={cn(
                  'text-3xl font-bold',
                  overallHealth >= 80 ? 'text-iaf-success' :
                  overallHealth >= 60 ? 'text-iaf-warning' : 'text-iaf-alert'
                )}>
                  {overallHealth}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-iaf-navy-light flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-iaf-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-iaf-sky/60">Operational</p>
                <p className="text-3xl font-bold text-iaf-success">{operationalCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-iaf-success/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-iaf-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-iaf-sky/60">Maintenance</p>
                <p className="text-3xl font-bold text-iaf-warning">{maintenanceCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-iaf-warning/20 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-iaf-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-iaf-sky/60">Faulty</p>
                <p className="text-3xl font-bold text-iaf-alert">{faultyCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-iaf-alert/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-iaf-alert" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* System Navigation */}
        <div className="space-y-4">
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-iaf-sky">Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {systemCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left',
                    selectedCategory === category.id
                      ? 'bg-iaf-gold/20 text-iaf-gold'
                      : 'text-iaf-sky/70 hover:bg-iaf-navy-light/50 hover:text-iaf-sky'
                  )}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="text-sm">{category.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* System List */}
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-iaf-sky">
                {selectedCategory === 'all' ? 'All Systems' : systemCategories.find(c => c.id === selectedCategory)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredSystems.map((system) => (
                <button
                  key={system.id}
                  onClick={() => {
                    setSelectedSystem(system);
                    setSelectedComponent(system.components[0]);
                  }}
                  className={cn(
                    'w-full p-3 rounded-lg border transition-all text-left',
                    selectedSystem.id === system.id
                      ? 'bg-iaf-gold/10 border-iaf-gold/50'
                      : 'bg-iaf-navy-light/30 border-transparent hover:border-iaf-navy-light/50'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-iaf-sky">{system.name}</span>
                    <StatusBadge status={system.status} size="sm" showDot={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-iaf-sky/50">{system.components.length} components</span>
                    <span className={cn(
                      'text-xs font-medium',
                      system.health >= 80 ? 'text-iaf-success' :
                      system.health >= 60 ? 'text-iaf-warning' : 'text-iaf-alert'
                    )}>
                      {system.health}%
                    </span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 3D Viewer Placeholder */}
        <div className="lg:col-span-2">
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30 h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-iaf-sky flex items-center gap-2">
                <Eye className="w-5 h-5 text-iaf-gold" />
                {selectedSystem.name} - 3D Viewer
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode('3d')}
                  className={cn(
                    'border-iaf-navy-light',
                    viewMode === '3d' && 'bg-iaf-gold/20 border-iaf-gold text-iaf-gold'
                  )}
                >
                  3D View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode('schematic')}
                  className={cn(
                    'border-iaf-navy-light',
                    viewMode === 'schematic' && 'bg-iaf-gold/20 border-iaf-gold text-iaf-gold'
                  )}
                >
                  Schematic
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square bg-iaf-navy-dark rounded-lg overflow-hidden border border-iaf-navy-light/50">
                {/* Placeholder for 3D viewer */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-iaf-gold/10 flex items-center justify-center mb-4">
                    <Cpu className="w-16 h-16 text-iaf-gold/50" />
                  </div>
                  <p className="text-iaf-sky/60 text-center">
                    3D Interactive Model<br />
                    <span className="text-sm text-iaf-sky/40">{selectedSystem.name}</span>
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Button variant="outline" size="sm" className="border-iaf-navy-light text-iaf-sky">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Rotate
                    </Button>
                    <Button variant="outline" size="sm" className="border-iaf-navy-light text-iaf-sky">
                      <Eye className="w-4 h-4 mr-2" />
                      Explode View
                    </Button>
                  </div>
                </div>
                
                {/* Grid overlay */}
                <div className="absolute inset-0 iaf-grid-pattern opacity-30 pointer-events-none" />
                
                {/* Hotspots */}
                {selectedSystem.components.map((comp, index) => (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComponent(comp)}
                    className={cn(
                      'absolute w-4 h-4 rounded-full border-2 transition-all',
                      selectedComponent?.id === comp.id
                        ? 'bg-iaf-gold border-iaf-gold scale-125'
                        : 'bg-iaf-cyan/50 border-iaf-cyan hover:scale-110'
                    )}
                    style={{
                      top: `${20 + (index * 15)}%`,
                      left: `${30 + (index % 2) * 40}%`,
                    }}
                    title={comp.name}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-iaf-sky whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      {comp.name}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Component Details */}
        <div>
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-iaf-sky">Component Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedComponent ? (
                <>
                  <div>
                    <h4 className="text-lg font-semibold text-iaf-sky">{selectedComponent.name}</h4>
                    <p className="text-sm text-iaf-sky/50">{selectedComponent.partNumber}</p>
                  </div>

                  <StatusBadge status={selectedComponent.status} />

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-iaf-sky/70">Health</span>
                      <span className={cn(
                        'text-sm font-medium',
                        selectedComponent.health >= 80 ? 'text-iaf-success' :
                        selectedComponent.health >= 60 ? 'text-iaf-warning' : 'text-iaf-alert'
                      )}>
                        {selectedComponent.health}%
                      </span>
                    </div>
                    <div className="h-2 bg-iaf-navy-light/50 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          selectedComponent.health >= 80 ? 'bg-iaf-success' :
                          selectedComponent.health >= 60 ? 'bg-iaf-warning' : 'bg-iaf-alert'
                        )}
                        style={{ width: `${selectedComponent.health}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-iaf-navy-light/30 space-y-3">
                    <div>
                      <p className="text-xs text-iaf-sky/50 mb-1">Description</p>
                      <p className="text-sm text-iaf-sky/80">{selectedComponent.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-iaf-sky/50 mb-1">Last Maintenance</p>
                        <p className="text-sm text-iaf-sky">{selectedComponent.lastMaintenance}</p>
                      </div>
                      <div>
                        <p className="text-xs text-iaf-sky/50 mb-1">Next Maintenance</p>
                        <p className="text-sm text-iaf-sky">{selectedComponent.nextMaintenance}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-iaf-navy-light/30">
                    <p className="text-xs text-iaf-sky/50 mb-2">Specifications</p>
                    <div className="space-y-1">
                      {Object.entries(selectedComponent.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-iaf-sky/60">{key}</span>
                          <span className="text-iaf-sky">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <Button variant="outline" className="w-full border-iaf-navy-light text-iaf-sky">
                      <FileText className="w-4 h-4 mr-2" />
                      View Documentation
                    </Button>
                    <Button variant="outline" className="w-full border-iaf-navy-light text-iaf-sky">
                      <Wrench className="w-4 h-4 mr-2" />
                      Maintenance History
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Info className="w-12 h-12 text-iaf-sky/20 mx-auto mb-2" />
                  <p className="text-sm text-iaf-sky/50">Select a component to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
