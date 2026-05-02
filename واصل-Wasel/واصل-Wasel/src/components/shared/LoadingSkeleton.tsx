import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'text' | 'avatar' | 'table-row';
  count?: number;
  className?: string;
}

const shimmerClass = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded-lg";

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'card',
  count = 1,
  className = '',
}) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (variant === 'card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
        {items.map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className={`h-48 ${shimmerClass}`} />
            <div className="p-6 space-y-3">
              <div className={`h-6 w-3/4 ${shimmerClass}`} />
              <div className={`h-4 w-full ${shimmerClass}`} />
              <div className={`h-4 w-2/3 ${shimmerClass}`} />
              <div className={`h-4 w-1/2 ${shimmerClass}`} />
              <div className={`h-10 w-full mt-4 ${shimmerClass}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-4 ${className}`}>
        {items.map((i) => (
          <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
            <div className={`w-12 h-12 rounded-full ${shimmerClass}`} />
            <div className="flex-1 space-y-2">
              <div className={`h-5 w-1/3 ${shimmerClass}`} />
              <div className={`h-4 w-2/3 ${shimmerClass}`} />
            </div>
            <div className={`h-8 w-20 ${shimmerClass}`} />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`space-y-3 ${className}`}>
        {items.map((i) => (
          <div key={i} className={`h-4 ${shimmerClass}`} style={{ width: `${Math.random() * 40 + 60}%` }} />
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className={`w-16 h-16 rounded-full ${shimmerClass}`} />
        <div className="space-y-2">
          <div className={`h-5 w-32 ${shimmerClass}`} />
          <div className={`h-4 w-24 ${shimmerClass}`} />
        </div>
      </div>
    );
  }

  if (variant === 'table-row') {
    return (
      <div className={`space-y-2 ${className}`}>
        {items.map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-50">
            <div className={`h-4 w-1/6 ${shimmerClass}`} />
            <div className={`h-4 w-1/6 ${shimmerClass}`} />
            <div className={`h-4 w-1/4 ${shimmerClass}`} />
            <div className={`h-4 w-1/6 ${shimmerClass}`} />
            <div className={`h-6 w-16 rounded-full ${shimmerClass}`} />
            <div className={`h-4 w-1/6 ${shimmerClass}`} />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
