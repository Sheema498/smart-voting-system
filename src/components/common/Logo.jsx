import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'md', to = '/', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const Content = (
    <div className="inline-flex items-center gap-2.5 group focus-visible:outline-none select-none">
      {/* Custom Ballot + Checkmark SVG Mark */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-civic-500 shadow-md shadow-brand-500/20 text-white transition-transform group-hover:scale-105 duration-200 ${iconSizes[size]}`}>
        <svg viewBox="0 0 24 24" className="w-5/6 h-5/6 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round" aria-hidden="true">
          {/* Ballot box outline */}
          <rect x="3" y="6" width="18" height="15" rx="3" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
          {/* Ballot slot */}
          <path d="M7 6h10" />
          {/* Incoming checkmark badge */}
          <circle cx="16" cy="15" r="4.5" className="fill-trust-500 stroke-white stroke-1" />
          <path d="M14.5 15l1 1 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-bold tracking-tight text-slate-900 leading-none ${textSizes[size]}`}>
          Vote<span className="text-brand-600">Sphere</span>
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
            Verified Democracy
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center no-underline focus-visible:rounded-lg" aria-label="VoteSphere Home">
        {Content}
      </Link>
    );
  }

  return Content;
};
