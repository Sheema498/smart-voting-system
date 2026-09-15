import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'p-6',
  onClick,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      onClick={onClick}
      className={`
        bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden
        transition-all duration-200
        ${hover ? 'hover:shadow-elevated hover:border-slate-300 hover:-translate-y-0.5 cursor-pointer' : ''}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`border-b border-slate-100 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`border-t border-slate-100 pt-4 mt-4 ${className}`}>
    {children}
  </div>
);
