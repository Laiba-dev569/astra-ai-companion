import React from 'react';

export default function LeftPanel({ mood }) {
  let statusText = 'Online';
  let glowColor = 'glow-text-cyan';
  let gradientTo = 'to-neon-blue';
  
  if (mood === 'thinking') {
    statusText = 'Processing...';
    glowColor = 'glow-text-purple';
    gradientTo = 'to-neon-purple';
  } else if (mood === 'alert') {
    statusText = 'Securing Memory...';
    glowColor = 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]';
    gradientTo = 'to-amber-500';
  }

  return (
    <div className="glass-panel w-80 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan ${gradientTo} shadow-glow-cyan relative overflow-hidden avatar-spin transition-colors duration-500`}></div>
        <div>
          <h2 className="font-outfit text-2xl font-extrabold tracking-wide">Astra.AI</h2>
          <p className="text-sm text-slate-400">
            Status: <span className={`${glowColor} transition-colors duration-500`}>{statusText}</span>
          </p>
        </div>
      </div>
      
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden relative">
        <div className={`w-[85%] h-full bg-gradient-to-r from-neon-blue ${gradientTo} shadow-glow-cyan relative energy-pulse transition-colors duration-500`}></div>
      </div>
      
      <div className="flex justify-between text-sm text-slate-300">
        <div><span className="text-slate-500">Core Temp:</span> 34°C</div>
        <div><span className="text-slate-500">Sync Rate:</span> 98.4%</div>
      </div>
    </div>
  );
}
