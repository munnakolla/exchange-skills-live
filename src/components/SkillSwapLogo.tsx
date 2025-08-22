import React from 'react';

interface SkillSwapLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'white' | 'dark';
}

const SkillSwapLogo: React.FC<SkillSwapLogoProps> = ({ 
  size = 40, 
  className = '', 
  showText = true,
  variant = 'default'
}) => {
  const logoSize = size;
  const textSize = size * 0.6;

  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          primary: '#ffffff',
          secondary: '#f0f0f0',
          accent: '#e0e0e0',
          text: '#ffffff'
        };
      case 'dark':
        return {
          primary: '#1a1a1a',
          secondary: '#333333',
          accent: '#4a4a4a',
          text: '#1a1a1a'
        };
      default:
        return {
          primary: '#3b82f6', // Blue
          secondary: '#8b5cf6', // Purple
          accent: '#06b6d4', // Cyan
          text: '#1e293b'
        };
    }
  };

  const colors = getColors();

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        <svg
          width={logoSize}
          height={logoSize}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Modern Geometric Background */}
          <rect
            x="10"
            y="10"
            width="100"
            height="100"
            rx="25"
            fill="url(#modernGradient)"
            opacity="0.1"
          />
          
          {/* Bidirectional Skill Exchange Representation */}
          {/* Left Skill Node - Teaching */}
          <g transform="translate(25, 40)">
            <circle
              cx="0"
              cy="0"
              r="15"
              fill="url(#teachingGradient)"
              stroke={colors.primary}
              strokeWidth="2.5"
            />
            {/* Book/Knowledge Symbol */}
            <rect x="-6" y="-4" width="12" height="8" rx="1" fill="white" opacity="0.9" />
            <line x1="-4" y1="-1" x2="4" y2="-1" stroke={colors.primary} strokeWidth="0.8" />
            <line x1="-4" y1="1" x2="4" y2="1" stroke={colors.primary} strokeWidth="0.8" />
          </g>
          
          {/* Right Skill Node - Learning */}
          <g transform="translate(95, 80)">
            <circle
              cx="0"
              cy="0"
              r="15"
              fill="url(#learningGradient)"
              stroke={colors.secondary}
              strokeWidth="2.5"
            />
            {/* Lightbulb/Idea Symbol */}
            <circle cx="0" cy="-2" r="4" fill="white" opacity="0.9" />
            <path d="M-2 2 L2 2" stroke={colors.secondary} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M-1 4 L1 4" stroke={colors.secondary} strokeWidth="1" strokeLinecap="round" />
          </g>
          
          {/* Central Connection Hub */}
          <circle
            cx="60"
            cy="60"
            r="18"
            fill="url(#hubGradient)"
            stroke="url(#connectionStroke)"
            strokeWidth="3"
          />
          
          {/* Network Connection Lines */}
          <g opacity="0.8">
            {/* Curved bidirectional flow */}
            <path
              d="M40 40 Q60 30 95 80"
              stroke="url(#flowGradient1)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M95 80 Q60 90 25 40"
              stroke="url(#flowGradient2)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Flow Direction Arrows */}
            <polygon
              points="85,75 90,78 85,81"
              fill={colors.primary}
              opacity="0.8"
            />
            <polygon
              points="35,45 30,42 35,39"
              fill={colors.secondary}
              opacity="0.8"
            />
          </g>
          
          {/* Skill Nodes - representing different expertise areas */}
          <circle cx="30" cy="25" r="3" fill={colors.primary} opacity="0.7" />
          <circle cx="90" cy="25" r="3" fill={colors.accent} opacity="0.7" />
          <circle cx="105" cy="60" r="3" fill={colors.secondary} opacity="0.7" />
          <circle cx="90" cy="95" r="3" fill={colors.primary} opacity="0.7" />
          <circle cx="30" cy="95" r="3" fill={colors.accent} opacity="0.7" />
          <circle cx="15" cy="60" r="3" fill={colors.secondary} opacity="0.7" />
          
          {/* Central Logo Symbol - Interconnected Growth */}
          <g transform="translate(60, 60)">
            {/* Core exchange symbol */}
            <path
              d="M-8,-8 L8,8 M8,-8 L-8,8"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <circle cx="0" cy="0" r="3" fill="white" opacity="0.9" />
          </g>
          
          {/* Gradient Definitions */}
          <defs>
            <radialGradient id="modernGradient" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </radialGradient>
            
            <radialGradient id="teachingGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
              <stop offset="100%" stopColor={colors.primary} stopOpacity="0.5" />
            </radialGradient>
            
            <radialGradient id="learningGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor={colors.secondary} stopOpacity="0.9" />
              <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.5" />
            </radialGradient>
            
            <radialGradient id="hubGradient" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor={colors.accent} stopOpacity="0.3" />
              <stop offset="50%" stopColor={colors.primary} stopOpacity="0.6" />
              <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.8" />
            </radialGradient>
            
            <linearGradient id="connectionStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="50%" stopColor={colors.accent} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            
            <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
              <stop offset="100%" stopColor={colors.accent} stopOpacity="0.4" />
            </linearGradient>
            
            <linearGradient id="flowGradient2" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={colors.secondary} stopOpacity="0.8" />
              <stop offset="100%" stopColor={colors.accent} stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Text Logo */}
      {showText && (
        <div className="flex flex-col">
          <span 
            className="font-bold leading-none tracking-tight"
            style={{ 
              fontSize: `${textSize}px`,
              background: variant === 'default' 
                ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 50%, ${colors.secondary} 100%)` 
                : 'transparent',
              WebkitBackgroundClip: variant === 'default' ? 'text' : 'unset',
              WebkitTextFillColor: variant === 'default' ? 'transparent' : colors.text,
              color: variant !== 'default' ? colors.text : 'transparent',
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
            }}
          >
            SkillSwap
          </span>
          {size >= 40 && (
            <span 
              className="text-xs font-medium opacity-75 leading-none tracking-wide"
              style={{ 
                color: colors.text, 
                fontSize: `${textSize * 0.32}px`,
                letterSpacing: '0.5px',
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Exchange Skills • Build Community
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillSwapLogo;
