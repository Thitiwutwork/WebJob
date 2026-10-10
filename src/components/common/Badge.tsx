import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'purple' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  const variantStyles = {
    primary: 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/50',
    purple: 'bg-purple-950/80 text-purple-300 border border-purple-700/50',
    success: 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50',
    warning: 'bg-amber-950/80 text-amber-300 border border-amber-700/50',
    info: 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/50',
    slate: 'bg-slate-800/80 text-slate-300 border border-slate-700/60',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
