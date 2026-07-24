import React, { useState, useEffect } from 'react';
import { Zap, Sparkles } from 'lucide-react';

interface ElementFlame {
  name: string;
  symbol: string;
  colorName: string;
  hexColor: string;
  wavelength: string;
  jumpDescription: string;
}

const ELEMENTS: ElementFlame[] = [
  { name: 'Sódio', symbol: 'Na', colorName: 'Amarelo Vivo', hexColor: '#eab308', wavelength: '589 nm', jumpDescription: 'Salto do nível n=3 para n=2' },
  { name: 'Cobre', symbol: 'Cu', colorName: 'Verde Azulado', hexColor: '#10b981', wavelength: '510 nm', jumpDescription: 'Salto do nível n=4 para n=2' },
  { name: 'Lítio', symbol: 'Li', colorName: 'Vermelho Carmim', hexColor: '#ef4444', wavelength: '670 nm', jumpDescription: 'Salto do nível n=2 para n=1' },
  { name: 'Potássio', symbol: 'K', colorName: 'Violeta / Lilás', hexColor: '#a855f7', wavelength: '404 nm', jumpDescription: 'Salto do nível n=5 para n=1' },
];

export const BohrSim: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElementFlame>(ELEMENTS[0]);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [isExcited, setIsExcited] = useState<boolean>(false);
  const [emittingPhoton, setEmittingPhoton] = useState<boolean>(false);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);

  // Orbit rotation animation ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setOrbitAngle((prev) => (prev + 0.05) % (Math.PI * 2));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const handleExciteElectron = () => {
    if (isExcited) return;
    setIsExcited(true);
    setCurrentLevel(3);

    // After 1.2s, electron relaxes back to n=1 emitting photon
    setTimeout(() => {
      setEmittingPhoton(true);
      setCurrentLevel(1);
      setTimeout(() => {
        setIsExcited(false);
        setEmittingPhoton(false);
      }, 1000);
    }, 1200);
  };

  const radius = currentLevel === 1 ? 35 : currentLevel === 2 ? 60 : 90;
  const electronX = 160 + Math.cos(orbitAngle) * radius;
  const electronY = 128 + Math.sin(orbitAngle) * radius;

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            Simulador de Bohr: Saltos Quânticos e Teste de Chama (Fogos de Artifício)
          </h3>
          <p className="text-xs text-slate-400">
            Forneça energia térmica para excitar o elétron de nível e assista ao salto quântico emitindo luz colorida!
          </p>
        </div>
      </div>

      {/* Select Chemical Element */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {ELEMENTS.map((elem) => (
          <button
            key={elem.symbol}
            onClick={() => {
              setSelectedElement(elem);
              setCurrentLevel(1);
              setIsExcited(false);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
              selectedElement.symbol === elem.symbol
                ? 'bg-slate-800 border-emerald-500 text-white shadow-lg'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: elem.hexColor }}
            />
            {elem.name} ({elem.symbol})
          </button>
        ))}
      </div>

      {/* Bohr Atom Canvas Stage */}
      <div className="relative h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
        <svg className="w-80 h-64">
          {/* Nucleus Cluster (Protons + Neutrons) */}
          <circle cx="160" cy="128" r="16" fill="#ef4444" filter="drop-shadow(0 0 10px #ef4444)" />
          <text x="160" y="132" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">+N</text>

          {/* Energy Shells / Orbitals (n=1, n=2, n=3) */}
          <circle cx="160" cy="128" r="35" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="160" y="88" fill="#64748b" fontSize="9" textAnchor="middle">n=1</text>

          <circle cx="160" cy="128" r="60" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="160" y="63" fill="#64748b" fontSize="9" textAnchor="middle">n=2</text>

          <circle cx="160" cy="128" r="90" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="160" y="33" fill="#64748b" fontSize="9" textAnchor="middle">n=3 (Excitado)</text>

          {/* Orbiting Electron Sub-Particle with Glow Trail */}
          <circle cx={electronX} cy={electronY} r="7" fill="#38bdf8" filter="drop-shadow(0 0 8px #38bdf8)" />
          <text x={electronX} y={electronY + 3} fill="#020617" fontSize="8" fontWeight="bold" textAnchor="middle">e-</text>

          {/* Photon Wave Particle Emission Animation when emitting */}
          {emittingPhoton && (
            <g className="animate-ping">
              <path
                d={`M ${electronX} ${electronY} Q ${electronX + 20} ${electronY - 20}, ${electronX + 40} ${electronY}`}
                fill="none"
                stroke={selectedElement.hexColor}
                strokeWidth="3"
              />
              <circle cx={electronX + 45} cy={electronY} r="8" fill={selectedElement.hexColor} filter="drop-shadow(0 0 12px currentColor)" />
              <text x={electronX + 45} y={electronY + 3} fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">hν</text>
            </g>
          )}
        </svg>

        {/* Flame Graphic Overlay */}
        <div className="absolute right-4 bottom-4 bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
          <div
            className="w-8 h-12 rounded-full blur-xs animate-bounce"
            style={{ backgroundColor: selectedElement.hexColor, boxShadow: `0 0 20px ${selectedElement.hexColor}` }}
          />
          <div>
            <div className="text-xs font-bold text-slate-200">Cor da Chama: {selectedElement.colorName}</div>
            <div className="text-[10px] text-slate-400 font-mono">Comprimento de onda: {selectedElement.wavelength}</div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handleExciteElectron}
          disabled={isExcited}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
            isExcited
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-lg shadow-emerald-600/30'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          {isExcited ? 'Excitação em Andamento...' : `Aquecer Amostra de ${selectedElement.name}`}
        </button>

        <div className="text-xs text-slate-400 font-mono">
          {selectedElement.jumpDescription}
        </div>
      </div>

      <div className="mt-3 p-3 bg-emerald-950/40 border border-emerald-900/50 rounded-xl text-xs text-emerald-200">
        <strong>Conceito de Bohr:</strong> O elétron absorve um "fóton" de energia e salta para uma camada mais externa. Ao voltar ao estado fundamental, devolve exatamente a mesma quantidade de energia sob a forma de luz visível (cor característica do elemento).
      </div>
    </div>
  );
};
