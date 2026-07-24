import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Zap } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  deflected: boolean;
  bounced: boolean;
  trail: { x: number; y: number }[];
}

export const RutherfordSim: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [passedCount, setPassedCount] = useState<number>(0);
  const [deflectedCount, setDeflectedCount] = useState<number>(0);
  const [bouncedCount, setBouncedCount] = useState<number>(0);

  // Nucleus position
  const NUCLEUS_X = 220;
  const NUCLEUS_Y = 120;

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        // Spawn a new alpha particle from left emitter
        const initialY = 20 + Math.random() * 200;
        setParticles((prev) => [
          ...prev.slice(-30), // keep max 30
          {
            id: Date.now() + Math.random(),
            x: 10,
            y: initialY,
            vx: 6,
            vy: 0,
            deflected: false,
            bounced: false,
            trail: [],
          },
        ]);
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    let frame: number;
    if (isRunning) {
      const update = () => {
        setParticles((prev) =>
          prev
            .map((p) => {
              // Calculate distance to nucleus
              const dx = NUCLEUS_X - p.x;
              const dy = NUCLEUS_Y - p.y;
              const distSq = dx * dx + dy * dy;

              let newVx = p.vx;
              let newVy = p.vy;
              let isDeflected = p.deflected;
              let isBounced = p.bounced;

              // Coulomb repulsion force (positive alpha & positive nucleus)
              if (distSq < 3000 && p.x < NUCLEUS_X + 40) {
                const force = 400 / Math.max(distSq, 100);
                newVx -= (dx / Math.sqrt(distSq)) * force;
                newVy -= (dy / Math.sqrt(distSq)) * force;

                if (Math.abs(newVy) > 1.5) isDeflected = true;
                if (newVx < 0) isBounced = true;
              }

              const newX = p.x + newVx;
              const newY = p.y + newVy;

              // Append trail history
              const newTrail = [...p.trail.slice(-5), { x: p.x, y: p.y }];

              // Count outcome when leaving right or left edge
              if (newX > 400 && !p.deflected && !p.bounced) {
                setPassedCount((c) => c + 1);
              } else if (newX > 400 && isDeflected) {
                setDeflectedCount((c) => c + 1);
              } else if (newX < 0 && isBounced) {
                setBouncedCount((c) => c + 1);
              }

              return {
                ...p,
                x: newX,
                y: newY,
                vx: newVx,
                vy: newVy,
                deflected: isDeflected,
                bounced: isBounced,
                trail: newTrail,
              };
            })
            .filter((p) => p.x >= 0 && p.x <= 420 && p.y >= 0 && p.y <= 240)
        );
        frame = requestAnimationFrame(update);
      };
      frame = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(frame);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setParticles([]);
    setPassedCount(0);
    setDeflectedCount(0);
    setBouncedCount(0);
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            Simulador de Rutherford: Disparo de Partículas Alfa na Lâmina de Ouro
          </h3>
          <p className="text-xs text-slate-400">
            Observe o comportamento de partículas alfa (α²⁺) repelidas pelo núcleo hiperdenso positivo.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              isRunning ? 'bg-amber-500 text-slate-950' : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Pausar Emissão' : 'Disparar Partículas α'}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Gold Foil Stage */}
      <div className="relative h-60 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        <svg className="w-full h-full">
          {/* Emitter box */}
          <rect x="5" y="80" width="30" height="80" fill="#334155" rx="4" />
          <text x="10" y="125" fill="#f59e0b" fontSize="10" fontWeight="bold">Fonte α</text>

          {/* Thin Gold Foil Line */}
          <line x1="220" y1="10" x2="220" y2="230" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 4" opacity="0.4" />
          <text x="225" y="25" fill="#f59e0b" fontSize="10" fontWeight="bold">Lâmina de Ouro (Au)</text>

          {/* Nucleus Gold (+ Charge) with Ripple */}
          <circle cx={NUCLEUS_X} cy={NUCLEUS_Y} r="10" fill="#f59e0b" className="animate-pulse" filter="drop-shadow(0 0 8px #f59e0b)" />
          <circle cx={NUCLEUS_X} cy={NUCLEUS_Y} r="22" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" className="animate-ping" opacity="0.4" />
          <text x={NUCLEUS_X - 6} y={NUCLEUS_Y + 4} fill="#020617" fontSize="12" fontWeight="bold">+</text>

          {/* Render particles with motion trails */}
          {particles.map((p) => {
            const color = p.bounced ? '#ef4444' : p.deflected ? '#f59e0b' : '#38bdf8';
            return (
              <g key={p.id}>
                {/* Motion Trail */}
                {p.trail.map((t, idx) => (
                  <circle
                    key={idx}
                    cx={t.x}
                    cy={t.y}
                    r={2 + idx * 0.3}
                    fill={color}
                    opacity={(idx + 1) / (p.trail.length + 1) * 0.5}
                  />
                ))}
                {/* Particle Sphere */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill={color}
                  filter="drop-shadow(0 0 6px currentColor)"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Live Statistics Counter */}
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-semibold">Passaram Direto (Espaço Vazio)</div>
          <div className="text-lg font-bold text-sky-400 font-mono">{passedCount}</div>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-semibold">Sofreram Desvio (Aproximação)</div>
          <div className="text-lg font-bold text-amber-400 font-mono">{deflectedCount}</div>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-semibold">Rebateram (Colisão Núcleo)</div>
          <div className="text-lg font-bold text-red-400 font-mono">{bouncedCount}</div>
        </div>
      </div>

      <div className="mt-3 p-3 bg-amber-950/40 border border-amber-900/50 rounded-xl text-xs text-amber-200">
        <strong>Estatística Histórica de Rutherford:</strong> Cerca de 99,9% das partículas passam direto. Apenas ~1 em 8.000 rebota. Isso prova que o átomo é quase 100% espaço vazio com um núcleo positivo hiperdenso no centro!
      </div>
    </div>
  );
};
