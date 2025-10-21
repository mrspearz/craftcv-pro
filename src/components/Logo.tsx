import React from 'react';
import { Briefcase, Crown, FileText } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark';
  showText?: boolean;
  className?: string;
  animate?: boolean;
}

const sizeClasses = {
  sm: 'w-9 h-9',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14'
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl'
};

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'default', 
  showText = true,
  className = '',
  animate = false
}) => {
  const logoIcon = (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center group`}>
      <div className={`relative w-full h-full bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 rounded-2xl shadow-2xl flex items-center justify-center group-hover:shadow-violet-500/30 transition-all duration-500 group-hover:scale-105 ${animate ? 'animate-float' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-50"></div>
        <Briefcase className={`${
          size === 'sm' ? 'w-4 h-4' :
          size === 'md' ? 'w-5 h-5' :
          size === 'lg' ? 'w-6 h-6' :
          'w-7 h-7'
        } text-white group-hover:scale-110 transition-transform duration-500 relative z-10 ${animate ? 'animate-float' : ''}`} />
        
        {/* Premium accent crown */}
        <Crown className={`absolute -top-1 -right-1 w-3 h-3 text-violet-200 ${animate ? 'animate-pulse' : ''}`} />
        
        {/* Floating orbs - only animate if animate prop is true */}
        {animate && (
          <>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-gradient-to-r from-violet-300 to-purple-300 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-gradient-to-r from-indigo-300 to-violet-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </>
        )}
      </div>
    </div>
  );

  if (!showText) {
    return <div className={className}>{logoIcon}</div>;
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {logoIcon}
      <div className="flex flex-col">
        <span className={`${textSizeClasses[size]} font-bold tracking-tight leading-none ${
          variant === 'white' ? 'text-white' : 
          variant === 'dark' ? 'text-gray-900' :
          'bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent'
        }`}>
          ResumePilot
        </span>
      </div>
    </div>
  );
};

// Simplified version for favicons or small spaces
export const LogoMark: React.FC<{ size?: number; className?: string }> = ({ 
  size = 32, 
  className = '' 
}) => (
  <div 
    className={`relative flex items-center justify-center ${className}`}
    style={{ width: size, height: size }}
  >
    <div className="relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-lg shadow-lg flex items-center justify-center">
      <FileText className="w-1/2 h-1/2 text-white" />
      <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
    </div>
  </div>
);
