import React from 'react';

export default function Logo({ className = "h-10 w-auto" }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 420 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* Icon Mark: Shield with Growth Line */}
      <g transform="translate(15, 12)">
        <path 
          d="M 50 10 L 85 25 C 85 60 50 85 50 85 C 50 85 15 60 15 25 Z" 
          fill="url(#shieldGrad)" 
        />
        <path 
          d="M 32 55 L 44 43 L 54 50 L 68 32" 
          stroke="#FFFFFF" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <circle cx="68" cy="32" r="3.5" fill="#10B981" />
      </g>

      {/* Typography */}
      <text 
        x="115" 
        y="58" 
        fontFamily="Inter, system-ui, sans-serif" 
        fontWeight="800" 
        fontSize="30" 
        fill="#1E293B"
      >
        VYAPAR<tspan fill="#2563EB">MITRA</tspan>
      </text>
      <text 
        x="116" 
        y="78" 
        fontFamily="Inter, system-ui, sans-serif" 
        fontWeight="700" 
        fontSize="10" 
        fill="#3B82F6" 
        letterSpacing="2.5"
      >
        INTELLIGENT DECISION ENGINE
      </text>
    </svg>
  );
}