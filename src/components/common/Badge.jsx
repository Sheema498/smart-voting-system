import React from 'react';

export const Badge = ({
  children,
  variant = 'brand',
  status,
  size = 'md',
  dot = false,
  className = ''
}) => {
  // Map specific status types if provided
  let activeVariant = variant;
  let label = children;

  if (status) {
    switch (status.toLowerCase()) {
      case 'active':
        activeVariant = 'emerald';
        label = children || 'Active';
        break;
      case 'upcoming':
        activeVariant = 'amber';
        label = children || 'Upcoming';
        break;
      case 'completed':
        activeVariant = 'slate';
        label = children || 'Completed';
        break;
      case 'voted':
        activeVariant = 'emerald';
        label = children || 'Voted';
        break;
      case 'pending':
        activeVariant = 'amber';
        label = children || 'Pending';
        break;
      case 'verified':
        activeVariant = 'brand';
        label = children || 'Verified';
        break;
      default:
        activeVariant = variant;
        label = children || status;
    }
  }

  const variants = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200/80',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/80',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/80',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    sky: 'bg-sky-50 text-sky-700 border-sky-200/80',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/80'
  };

  const dotColors = {
    brand: 'bg-brand-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    slate: 'bg-slate-400',
    sky: 'bg-sky-500',
    purple: 'bg-purple-500'
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold'
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border
        ${variants[activeVariant] || variants.brand}
        ${sizes[size] || sizes.md}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColors[activeVariant] || dotColors.brand}`}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
};
