import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
  actions?: React.ReactNode;
  showBackButton?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  actions,
  showBackButton = false,
  className,
}: PageHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className={cn('mb-6', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-iaf-sky/70 hover:text-iaf-sky hover:bg-iaf-navy-light/50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {Icon && <Icon className="w-6 h-6 text-iaf-gold flex-shrink-0" />}
              <h1 className="text-2xl font-bold text-iaf-sky" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{title}</h1>
            </div>
            {subtitle && (
              <p className="text-sm text-iaf-sky/60 mt-1 truncate">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
