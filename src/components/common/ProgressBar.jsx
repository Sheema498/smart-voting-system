import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  valueText,
  color = 'brand',
  size = 'md',
  showPercentage = false,
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));

  const colors = {
    brand: 'bg-brand-600',
    emerald: 'bg-trust-500',
    civic: 'bg-civic-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-600',
    rose: 'bg-rose-500'
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || valueText || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1.5">
          {label && <span>{label}</span>}
          <span>{valueText || (showPercentage ? `${percentage.toFixed(1)}%` : `${value} / ${max}`)}</span>
        </div>
      )}

      <div
        className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizes[size] || sizes.md}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colors[color] || colors.brand}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
