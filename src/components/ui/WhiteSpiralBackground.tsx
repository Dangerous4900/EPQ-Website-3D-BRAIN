import React from 'react';

export function WhiteSpiralBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">
      {/* Slow-breathing organic ambient neural light fields with icy and indigo hues */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1200px] max-h-[1200px] rounded-full bg-gradient-to-tr from-white/[0.05] via-blue-500/[0.03] to-indigo-500/[0.04] blur-[120px] animate-gradient-pulse" />
      
      <div 
        className="absolute top-1/3 left-1/3 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-indigo-500/[0.02] via-white/[0.03] to-transparent blur-[140px] animate-gradient-pulse"
        style={{ animationDelay: '-4s', animationDuration: '22s' }}
      />

      <div 
        className="absolute top-2/3 left-2/3 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tl from-emerald-500/[0.015] via-white/[0.02] to-transparent blur-[110px] animate-gradient-pulse"
        style={{ animationDelay: '-9s', animationDuration: '19s' }}
      />
      
      {/* Animated mathematically accurate white spiral vector */}
      <div className="absolute top-1/2 left-1/2 w-[220%] h-[220%] max-w-[2000px] max-h-[2000px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-60">
        <svg 
          viewBox="0 0 1000 1000" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          <defs>
            {/* Smooth linear gradient mapping for concentric white thread fade */}
            <radialGradient id="spiralGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="80%" stopColor="#ffffff" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Archimedean / Fibonacci-style smooth concentric paths */}
          {Array.from({ length: 48 }).map((_, index) => {
            const rot = (index * 360) / 48;
            return (
              <path
                key={index}
                d="M 500 500 Q 530 450, 560 500 T 640 500 T 780 500 T 980 500"
                stroke="url(#spiralGrad)"
                strokeWidth="1.2"
                strokeLinecap="round"
                transform={`rotate(${rot} 500 500)`}
                className="transition-all duration-1000"
              />
            );
          })}

          {/* Connective neural nodes mapping onto spiral intersection curves */}
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 30;
            const radius = 120 + i * 11;
            const cx = 500 + Math.cos(angle + i * 0.1) * radius;
            const cy = 500 + Math.sin(angle + i * 0.1) * radius;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={1.5 + (i % 3) * 0.5}
                fill="white"
                fillOpacity={0.12 + (i % 5) * 0.05}
                className="animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            );
          })}
        </svg>
      </div>

      {/* Grid pattern overlay representing computational overlay lines */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
