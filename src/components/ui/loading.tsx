import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-muted border-t-primary',
        sizeClasses[size],
        className
      )}
    />
  );
};

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className,
  lines = 1 
}) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'loading-skeleton rounded h-4',
            index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full',
            className
          )}
        />
      ))}
    </div>
  );
};

interface LoadingCardProps {
  className?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ className }) => {
  return (
    <div className={cn('p-6 border rounded-lg space-y-4', className)}>
      <div className="flex items-center space-x-4">
        <div className="loading-skeleton rounded-full w-12 h-12" />
        <div className="flex-1 space-y-2">
          <div className="loading-skeleton rounded h-4 w-1/2" />
          <div className="loading-skeleton rounded h-3 w-3/4" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="loading-skeleton rounded h-4 w-full" />
        <div className="loading-skeleton rounded h-4 w-5/6" />
        <div className="loading-skeleton rounded h-4 w-4/6" />
      </div>
    </div>
  );
};

interface LoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  isLoading, 
  children, 
  fallback 
}) => {
  if (isLoading) {
    return fallback || <LoadingSpinner />;
  }
  
  return <>{children}</>;
};

export default LoadingSpinner;
