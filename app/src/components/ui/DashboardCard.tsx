import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'glow' | 'alert' | 'success' | 'warning';
  onClick?: () => void;
}

export function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  variant = 'default',
  onClick,
}: DashboardCardProps) {
  const variantStyles = {
    default: 'bg-iaf-navy/60 border-iaf-navy-light/30',
    glow: 'bg-iaf-navy/80 border-iaf-gold/30 shadow-lg shadow-iaf-gold/5',
    alert: 'bg-iaf-alert/10 border-iaf-alert/30',
    success: 'bg-iaf-success/10 border-iaf-success/30',
    warning: 'bg-iaf-warning/10 border-iaf-warning/30',
  };

  return (
    <Card
      className={cn(
        'transition-all duration-200',
        variantStyles[variant],
        onClick && 'cursor-pointer hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-iaf-sky/70">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn(
            'p-2 rounded-md',
            variant === 'glow' && 'bg-iaf-gold/20',
            variant === 'alert' && 'bg-iaf-alert/20',
            variant === 'success' && 'bg-iaf-success/20',
            variant === 'warning' && 'bg-iaf-warning/20',
            variant === 'default' && 'bg-iaf-navy-light/50'
          )}>
            <Icon className={cn(
              'w-4 h-4',
              variant === 'glow' && 'text-iaf-gold',
              variant === 'alert' && 'text-iaf-alert',
              variant === 'success' && 'text-iaf-success',
              variant === 'warning' && 'text-iaf-warning',
              variant === 'default' && 'text-iaf-sky/60'
            )} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className={cn(
            'text-3xl font-bold',
            variant === 'glow' && 'text-iaf-gold iaf-text-glow',
            variant === 'alert' && 'text-iaf-alert',
            variant === 'success' && 'text-iaf-success',
            variant === 'warning' && 'text-iaf-warning',
            variant === 'default' && 'text-iaf-sky'
          )}>
            {value}
          </span>
          {trend && (
            <span className={cn(
              'text-xs font-medium',
              trend.isPositive ? 'text-iaf-success' : 'text-iaf-alert'
            )}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-iaf-sky/50 mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
