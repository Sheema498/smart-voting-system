import React from 'react';

export const Skeleton = ({ className = '', rounded = 'rounded-lg' }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 ${rounded} ${className}`}
      aria-hidden="true"
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-9 w-24 rounded-xl" />
    </div>
  </div>
);

export const CandidateSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center text-center space-y-4">
    <Skeleton className="w-20 h-20 rounded-full" />
    <Skeleton className="h-5 w-32" />
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-9 w-full rounded-xl mt-2" />
  </div>
);
