import React, { useEffect, useState } from 'react';

export default function Visualizer({ active }) {
  const [heights, setHeights] = useState(Array(15).fill(10));

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        setHeights(prev => prev.map(() => 20 + Math.random() * 80));
      }, 100);
    } else {
      setHeights(Array(15).fill(10)); // return to idle
    }
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-end gap-1.5 p-4 h-16 w-64 justify-center pointer-events-none transition-opacity duration-500">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1.5 bg-gradient-to-t from-neon-blue to-neon-cyan rounded-t-full shadow-glow-cyan transition-all duration-100 ease-out"
          style={{ height: `${h}%`, opacity: active ? 0.8 : 0.3 }}
        />
      ))}
    </div>
  );
}
