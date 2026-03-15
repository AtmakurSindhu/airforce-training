import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'alert' | 'cyan';
  showLabel?: boolean;
  labelPosition?: 'inside' | 'outside';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = true,
  labelPosition = 'outside',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };
  
  const variantClasses = {
    default: 'bg-iaf-gold',
    success: 'bg-iaf-success',
    warning: 'bg-iaf-warning',
    alert: 'bg-iaf-alert',
    cyan: 'bg-iaf-cyan',
  };
  
  // Determine variant based on percentage if default
  const getVariant = () => {
    if (variant !== 'default') return variant;
    if (percentage >= 80) return 'success';
    if (percentage >= 50) return 'default';
    if (percentage >= 25) return 'warning';
    return 'alert';
  };
  
  const finalVariant = getVariant();

  return (
    <div className={cn('w-full', className)}>
      {showLabel && labelPosition === 'outside' && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-iaf-sky/60">Progress</span>
          <span className="text-xs font-medium text-iaf-sky">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn(
        'w-full bg-iaf-navy-light/50 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variantClasses[finalVariant]
          )}
          style={{ width: `${percentage}%` }}
        >
          {showLabel && labelPosition === 'inside' && size === 'lg' && (
            <span className="text-xs font-medium text-iaf-navy-dark px-2">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
