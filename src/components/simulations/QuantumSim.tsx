import React, { useState, useEffect } from 'react';
import { Atom, Sparkles } from 'lucide-react';

interface CloudDot {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  opacity: number;
}

export const QuantumSim: React.FC = () => {
  const [orbitalType, setOrbitalType] = useState<'s' | 'px' | 'py' | 'd'>('s');
  const [cloudDots, setCloudDots] = useState<CloudDot[]>([]);

  // Generate sparkling quantum probability dots based on active orbital shape
  useEffect(() => {
    const dots: CloudDot[] = [];
    const count = 120;

    for (let i = 0; i < count; i++) {
      let x = 160;
      let y = 128;
      let color = '#ec4899';

      if (orbitalType === 's') {
        const r = Math.random() * 55;
        const angle = Math.random() * Math.PI * 2;
        x = 160 + Math.cos(angle) * r;
        y = 128 + Math.sin(angle) * r;
      } else if (orbitalType === 'px') {
        const side = Math.random() > 0.5 ? 1 : -1;
        const r = Math.random() * 45;
        color = side > 0 ? '#3b82f6' : '#ec4899';
        x = 160 + side * (15 + r);
        y = 128 + (Math.random() - 0.5) * 35;
      } else if (orbitalType === 'py') {
        const side = Math.random() > 0.5 ? 1 : -1;
        const r = Math.random() * 45;
        color = side > 0 ? '#3b82f6' : '#ec4899';
        x = 160 + (Math.random() - 0.5) * 35;
        y = 128 + side * (15 + r);
      } else {
        // d orbital
        const quadrant = Math.floor(Math.random() * 4);
        const r = 15 + Math.random() * 40;
        const angle = (quadrant * Math.PI) / 2 + Math.PI / 4 + (Math.random() - 0.5) * 0.5;
        color = quadrant % 2 === 0 ? '#ec4899' : '#3b82f6';
        x = 160 + Math.cos(angle) * r;
        y = 128 + Math.sin(angle) * r;
      }

      dots.push({
        id: i,
        x,
        y,
        color,
        size: 1.5 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.8,
      });
    }

    setCloudDots(dots);

    // Sparkling animation interval
    const timer = setInterval(() => {
      setCloudDots((prev) =>
        prev.map((d) => ({
          ...d,
          opacity: 0.1 + Math.random() * 0.9,
        }))
      );
    }, 100);

    return () => clearInterval(timer);
  }, [orbitalType]);

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-pink-400 flex items-center gap-2">
            Simulador Quântico: Nuvem de Probabilidade Eletrônica e Orbitais
          </h3>
          <p className="text-xs text-slate-400">
            Substituição da trajetória circular por "Orbitais Tridimensionais" (regiões de ≥ 90% de probabilidade de encontrar o elétron).
          </p>
        </div>
      </div>

      {/* Select Orbital */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {[
          { id: 's', label: 'Orbital 1s (Esférico)' },
          { id: 'px', label: 'Orbital 2p_x (Haltere X)' },
          { id: 'py', label: 'Orbital 2p_y (Haltere Y)' },
          { id: 'd', label: 'Orbital 3d (Trevo 4 Lóbulos)' },
        ].map((orb) => (
          <button
            key={orb.id}
            onClick={() => setOrbitalType(orb.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              orbitalType === orb.id
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {orb.label}
          </button>
        ))}
      </div>

      {/* Stage */}
      <div className="relative h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
        <svg className="w-80 h-64">
          {/* Axis lines */}
          <line x1="20" y1="128" x2="300" y2="128" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="160" y1="10" x2="160" y2="246" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
          <text x="290" y="120" fill="#64748b" fontSize="10">X</text>
          <text x="168" y="20" fill="#64748b" fontSize="10">Y</text>

          {/* Nucleus */}
          <circle cx="160" cy="128" r="5" fill="#38bdf8" filter="drop-shadow(0 0 8px #38bdf8)" />

          {/* Orbital S (Sphere) */}
          {orbitalType === 's' && (
            <g>
              <circle cx="160" cy="128" r="55" fill="url(#sGradient)" opacity="0.8" />
              <circle cx="160" cy="128" r="75" fill="none" stroke="#ec4899" strokeWidth="1" strokeDasharray="4 4" />
            </g>
          )}

          {/* Orbital Px */}
          {orbitalType === 'px' && (
            <g>
              <ellipse cx="110" cy="128" rx="45" ry="25" fill="#ec4899" opacity="0.5" />
              <ellipse cx="210" cy="128" rx="45" ry="25" fill="#3b82f6" opacity="0.5" />
            </g>
          )}

          {/* Orbital Py */}
          {orbitalType === 'py' && (
            <g>
              <ellipse cx="160" cy="78" rx="25" ry="45" fill="#ec4899" opacity="0.5" />
              <ellipse cx="160" cy="178" rx="25" ry="45" fill="#3b82f6" opacity="0.5" />
            </g>
          )}

          {/* Orbital D */}
          {orbitalType === 'd' && (
            <g>
              <ellipse cx="120" cy="88" rx="30" ry="20" fill="#ec4899" opacity="0.5" transform="rotate(-45 120 88)" />
              <ellipse cx="200" cy="168" rx="30" ry="20" fill="#ec4899" opacity="0.5" transform="rotate(-45 200 168)" />
              <ellipse cx="200" cy="88" rx="30" ry="20" fill="#3b82f6" opacity="0.5" transform="rotate(45 200 88)" />
              <ellipse cx="120" cy="168" rx="30" ry="20" fill="#3b82f6" opacity="0.5" transform="rotate(45 120 168)" />
            </g>
          )}

          {/* SPARKLING QUANTUM PROBABILITY PARTICLES */}
          {cloudDots.map((dot) => (
            <circle
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              r={dot.size}
              fill={dot.color}
              opacity={dot.opacity}
              filter="drop-shadow(0 0 3px currentColor)"
            />
          ))}

          {/* Gradient Definition */}
          <defs>
            <radialGradient id="sGradient">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#ec4899" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        <div className="absolute left-4 bottom-4 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-[11px] text-slate-300">
          <div><strong className="text-pink-400">Densidade de Nuvem:</strong> Os pontos cintilantes representam a densidade de probabilidade |Ψ|² de encontrar o elétron.</div>
        </div>
      </div>

      <div className="mt-3 p-3 bg-pink-950/40 border border-pink-900/50 rounded-xl text-xs text-pink-200">
        <strong>Conceito Quântico (Schrödinger):</strong> O elétron não é uma bolinha girando numa pista de atletismo. Ele possui comportamento ondulatório e ocupa uma nuvem tridimensional de probabilidades descrita pela Equação de Schrödinger.
      </div>
    </div>
  );
};
