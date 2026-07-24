import React, { useState, useEffect } from 'react';
import { Sliders, Zap } from 'lucide-react';

export const ThomsonSim: React.FC = () => {
  const [electricField, setElectricField] = useState<number>(0); // -10 to +10
  const [magneticField, setMagneticField] = useState<boolean>(false);
  const [animOffset, setAnimOffset] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimOffset((prev) => (prev + 3) % 100);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  // Calculate beam bend path Y offset
  const bendY = electricField * 3.5 + (magneticField ? -15 : 0);

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
            Simulador de Thomson: Tubo de Crookes e Raios Catódicos
          </h3>
          <p className="text-xs text-slate-400">
            Ajuste a voltagem das placas metálicas (+ e -) para observar a deflexão dos elétrons descobertos por Thomson.
          </p>
        </div>
      </div>

      {/* Cathode Tube Stage */}
      <div className="relative h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between p-4">
        {/* Placa Superior (+) */}
        <div className="flex justify-center items-center">
          <div className={`px-12 py-1.5 rounded text-xs font-bold font-mono transition-all ${
            electricField > 0 ? 'bg-red-600 text-white shadow-lg shadow-red-500/50' : 'bg-slate-800 text-slate-400'
          }`}>
            Placa Anódica Superior ({electricField > 0 ? `+${electricField}V` : electricField < 0 ? `${electricField}V` : '0V'})
          </div>
        </div>

        {/* Tube Interior Canvas SVG */}
        <svg className="w-full h-32 overflow-visible">
          {/* Glass tube outline */}
          <path
            d="M 20 20 L 120 20 C 200 20 250 10 380 10 L 380 110 C 250 110 200 100 120 100 L 20 100 Z"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Cátodo (-) emissor */}
          <rect x="25" y="40" width="8" height="40" fill="#94a3b8" rx="2" />
          <text x="12" y="65" fill="#94a3b8" fontSize="10" fontWeight="bold">-</text>

          {/* Ânodo (+) colimador */}
          <rect x="100" y="30" width="6" height="25" fill="#64748b" />
          <rect x="100" y="65" width="6" height="25" fill="#64748b" />

          {/* Electron Beam Path */}
          <path
            d={`M 33 60 L 100 60 Q 240 60, 375 ${60 - bendY}`}
            fill="none"
            stroke="#a855f7"
            strokeWidth="4"
            strokeDasharray="6 2"
            className="animate-pulse"
          />

          {/* STREAM OF ANIMATED FLYING ELECTRONS (e-) */}
          {[0, 20, 40, 60, 80].map((offsetIndex) => {
            const posPct = ((animOffset + offsetIndex) % 100) / 100;
            const px = 33 + posPct * (375 - 33);
            const py = 60 - Math.pow(posPct, 1.8) * bendY;
            return (
              <g key={offsetIndex}>
                <circle cx={px} cy={py} r="4" fill="#c084fc" filter="drop-shadow(0 0 6px #c084fc)" />
                <text x={px} y={py + 3} fill="#020617" fontSize="7" fontWeight="bold" textAnchor="middle">-</text>
              </g>
            );
          })}

          {/* Phosphor Glow screen at the end */}
          <circle cx="378" cy={60 - bendY} r="8" fill="#c084fc" className="animate-ping" />
        </svg>

        {/* Placa Inferior (-) */}
        <div className="flex justify-center items-center">
          <div className={`px-12 py-1.5 rounded text-xs font-bold font-mono transition-all ${
            electricField < 0 ? 'bg-red-600 text-white shadow-lg shadow-red-500/50' : 'bg-slate-800 text-slate-400'
          }`}>
            Placa Cátodica Inferior ({electricField < 0 ? `+${Math.abs(electricField)}V` : electricField > 0 ? `-${electricField}V` : '0V'})
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-purple-400" /> Campo Elétrico Placa (+ / -)</span>
            <span className="font-mono text-purple-400">{electricField} V</span>
          </label>
          <input
            type="range"
            min="-10"
            max="10"
            value={electricField}
            onChange={(e) => setElectricField(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Ímã de Campo Magnético Externo
            </div>
            <div className="text-[11px] text-slate-500">Força magnética Lorentz</div>
          </div>
          <button
            onClick={() => setMagneticField(!magneticField)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              magneticField ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {magneticField ? 'ÍMÃ ATIVADO' : 'Ímã Desligado'}
          </button>
        </div>
      </div>

      <div className="mt-3 p-3 bg-purple-950/40 border border-purple-900/50 rounded-xl text-xs text-purple-200">
        <strong>Conclusão Epistemológica de Thomson:</strong> Como o raio sofre atração rumo à placa POSITIVA e repele a negativa, ele é composto de corpúsculos de carga negativa (os <em>Elétrons</em>) extraídos de dentro do próprio átomo.
      </div>
    </div>
  );
};
