import React, { useState } from 'react';
import { RefreshCw, Play } from 'lucide-react';

export const DaltonSim: React.FC = () => {
  const [reactionState, setReactionState] = useState<'initial' | 'reacting' | 'finished'>('initial');

  const handleStartReaction = () => {
    setReactionState('reacting');
    setTimeout(() => {
      setReactionState('finished');
    }, 2000);
  };

  const handleReset = () => {
    setReactionState('initial');
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-blue-400 flex items-center gap-2">
            Simulador de Dalton: Conservação de Massa e Átomos Maciços
          </h3>
          <p className="text-xs text-slate-400">
            Reação de síntese da água (2H₂ + O₂ → 2H₂O). Os átomos de Dalton são esferas indivisíveis de massa fixa.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition shrink-0 ml-2"
          title="Reiniciar"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative min-h-[260px] bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col md:flex-row items-center justify-around gap-6">
        {/* Reagentes */}
        <div className="flex flex-col items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Reagentes (Antes da Reação)
          </span>
          <div className="flex gap-4 sm:gap-6 items-center bg-slate-900/80 p-3.5 sm:p-4 rounded-xl border border-slate-800/80 min-w-[180px] justify-center">
            {/* 2x H2 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-blue-500 shadow-md shadow-blue-500/50 flex items-center justify-center text-[10px] font-bold">H</div>
                <div className="w-6 h-6 rounded-full bg-blue-500 shadow-md shadow-blue-500/50 flex items-center justify-center text-[10px] font-bold">H</div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-blue-500 shadow-md shadow-blue-500/50 flex items-center justify-center text-[10px] font-bold">H</div>
                <div className="w-6 h-6 rounded-full bg-blue-500 shadow-md shadow-blue-500/50 flex items-center justify-center text-[10px] font-bold">H</div>
              </div>
            </div>
            <span className="text-xl font-bold text-slate-500">+</span>
            {/* 1x O2 */}
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-500 shadow-md shadow-red-500/50 flex items-center justify-center text-xs font-bold">O</div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-500 shadow-md shadow-red-500/50 flex items-center justify-center text-xs font-bold">O</div>
            </div>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            4 H (4u) + 2 O (32u) = <strong className="text-blue-300">36u</strong>
          </div>
        </div>

        {/* Action arrow */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleStartReaction}
            disabled={reactionState !== 'initial'}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-lg ${
              reactionState === 'initial'
                ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-blue-600/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            {reactionState === 'reacting' ? 'Reagindo...' : 'Reagir Átomos'}
          </button>
        </div>

        {/* Produtos */}
        <div className="flex flex-col items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Produtos (Depois da Reação)
          </span>
          <div className="flex gap-4 items-center bg-slate-900/80 p-3.5 sm:p-4 rounded-xl border border-slate-800/80 min-w-[180px] justify-center min-h-[92px]">
            {reactionState === 'finished' ? (
              <div className="flex gap-6 animate-fade-in">
                {/* 2x H2O */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-500 shadow-md shadow-red-500/50 flex items-center justify-center text-xs font-bold relative">
                    O
                    <div className="absolute -top-2 -left-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500 text-[9px] flex items-center justify-center">H</div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500 text-[9px] flex items-center justify-center">H</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-500 shadow-md shadow-red-500/50 flex items-center justify-center text-xs font-bold relative">
                    O
                    <div className="absolute -top-2 -left-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500 text-[9px] flex items-center justify-center">H</div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500 text-[9px] flex items-center justify-center">H</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-600 italic">
                {reactionState === 'reacting' ? 'Rearranjando esferas...' : 'Aguardando reação...'}
              </div>
            )}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            2 H₂O = <strong className="text-emerald-400">36u (Massa mantida!)</strong>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-950/40 border border-blue-900/50 rounded-xl text-xs text-blue-200">
        <strong>Conceito Científico de Dalton:</strong> Nenhuma esfera atômica é destruída ou dividida. Apenas a organização espacial muda!
      </div>
    </div>
  );
};
