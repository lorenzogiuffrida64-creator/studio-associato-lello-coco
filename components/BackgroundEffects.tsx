
import React from 'react';

interface Props {
  mousePos: { x: number; y: number };
}

const BackgroundEffects: React.FC<Props> = ({ mousePos }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Dynamic Animated Gradient Background */}
      <div className="absolute inset-0 bg-[#050505]"></div>
      
      {/* Particle Drift (Simulated with static SVG patterns and subtle CSS animation) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <pattern
          id="dotPattern"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>

      {/* Grid Shimmer Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      ></div>

      {/* Large Slow Parallax Floating Blobs */}
      <div 
        className="absolute top-[10%] left-[5%] w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[160px] animate-pulse"
        style={{
          transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
        }}
      ></div>
      <div 
        className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[160px] animate-pulse"
        style={{
          transform: `translate(${mousePos.x * -0.015}px, ${mousePos.y * -0.015}px)`
        }}
      ></div>

      {/* Light Field / Beam Texture (Moving subtle line) */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
    </div>
  );
};

export default BackgroundEffects;
