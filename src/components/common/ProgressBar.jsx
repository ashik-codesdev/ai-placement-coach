import React from 'react';

export const ProgressBar = ({ progress = 0, color = 'indigo', showPercentage = false, className = '' }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const colors = {
    indigo: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    amber: 'bg-gradient-to-r from-amber-500 to-orange-400',
    sky: 'bg-gradient-to-r from-sky-500 to-indigo-500',
    rose: 'bg-gradient-to-r from-rose-500 to-pink-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1.5">
          <span>Progress</span>
          <span>{clampedProgress}%</span>
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colors[color]}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
