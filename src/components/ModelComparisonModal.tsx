import React, { useState } from 'react';
import { X, ArrowRightLeft, Sparkles, AlertCircle, Atom, Zap, Flame, Cpu } from 'lucide-react';
import { ATOMIC_MODELS } from '../data/modelsData';
import { AtomicModel } from '../types';

interface ModelComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelComparisonModal: React.FC<ModelComparisonModalProps> = ({ isOpen, onClose }) => {
  const [modelA, setModelA] = useState<AtomicModel>(ATOMIC_MODELS[0]); // Dalton
  const [modelB, setModelB] = useState<AtomicModel>(ATOMIC_MODELS[2]); // Rutherford

  if (!isOpen) return null;

  const renderVisualDiagram = (modelId: string) => {
    switch (modelId) {
      case 'dalton':
        return (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/40 flex items-center justify-center font-bold text-white text-xs text-center p-2 border-2 border-blue-400">
            Esfera Rígida & Maciça
          </div>
        );
      case 'thomson':
        return (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-500/40 flex items-center justify-center relative border-2 border-purple-400">
            <span className="text-[10px] text-purple-200 font-bold">Massa +</span>
            <span className="absolute top-3 left-4 bg-yellow-400 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow">-</span>
            <span className="absolute bottom-3 right-4 bg-yellow-400 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow">-</span>
            <span className="absolute top-10 right-3 bg-yellow-400 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow">-</span>
            <span className="absolute bottom-4 left-5 bg-yellow-400 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow">-</span>
          </div>
        );
      case 'rutherford':
        return (
          <div className="w-24 h-24 rounded-full border border-amber-500/40 flex items-center justify-center relative">
            <div className="w-5 h-5 rounded-full bg-amber-500 shadow-md shadow-amber-500/80 flex items-center justify-center text-[8px] font-bold text-slate-950">
              Núcleo
            </div>
            <div className="absolute w-20 h-20 rounded-full border border-dashed border-amber-400/60 animate-spin" />
            <div className="absolute top-1 right-2 w-2.5 h-2.5 rounded-full bg-blue-400 shadow" />
          </div>
        );
      case 'bohr':
        return (
          <div className="w-24 h-24 rounded-full border border-emerald-500/30 flex items-center justify-center relative">
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-md flex items-center justify-center text-[7px] font-bold text-white">
              +
            </div>
            <div className="absolute w-12 h-12 rounded-full border border-emerald-400/60" />
            <div className="absolute w-20 h-20 rounded-full border border-emerald-400/80" />
            <div className="absolute top-2 right-4 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        );
      case 'quantum':
        return (
          <div className="w-24 h-24 rounded-full bg-pink-900/40 border border-pink-500/50 flex items-center justify-center relative overflow-hidden">
            <div className="w-3 h-3 rounded-full bg-pink-400 shadow-lg animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/20 via-purple-500/10 to-transparent" />
            <span className="absolute bottom-1 text-[8px] text-pink-300 font-mono">Orbital Psi²</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Comparador Científico Lado a Lado
              </h3>
              <p className="text-xs text-slate-400">
                Análise comparativa das rupturas conceituais, partículas e limitações entre dois modelos atômicos.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Selector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model A Selector */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                Modelo 1 (Base Histórica):
              </label>
              <select
                value={modelA.id}
                onChange={(e) => {
                  const m = ATOMIC_MODELS.find(item => item.id === e.target.value);
                  if (m) setModelA(m);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-blue-500"
              >
                {ATOMIC_MODELS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.year}) - {m.popularName}
                  </option>
                ))}
              </select>
            </div>

            {/* Model B Selector */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Modelo 2 (Evolução Posterior):
              </label>
              <select
                value={modelB.id}
                onChange={(e) => {
                  const m = ATOMIC_MODELS.find(item => item.id === e.target.value);
                  if (m) setModelB(m);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {ATOMIC_MODELS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.year}) - {m.popularName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Side-by-Side Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Model A Card */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 sm:p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-900">
                    {modelA.year} • {modelA.scientist}
                  </span>
                  <h4 className="text-base font-bold text-slate-100 mt-1">{modelA.name}</h4>
                  <p className="text-xs text-slate-400">"{modelA.popularName}"</p>
                </div>
                {renderVisualDiagram(modelA.id)}
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Conceito Chave:</span>
                  <p className="text-slate-300 leading-relaxed mt-0.5">{modelA.concept}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Descoberta Fundamental:</span>
                  <p className="text-blue-300 leading-relaxed mt-0.5">{modelA.keyDiscovery}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Analogia do Cotidiano:</span>
                  <p className="text-slate-400 italic mt-0.5">{modelA.macroscopicAnalogy}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-red-400 uppercase block">Limitação que Causou Ruptura:</span>
                  <ul className="list-disc list-inside text-red-300/90 space-y-1 mt-1">
                    {modelA.limitations.map((lim, i) => (
                      <li key={i}>{lim}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Model B Card */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 sm:p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                    {modelB.year} • {modelB.scientist}
                  </span>
                  <h4 className="text-base font-bold text-slate-100 mt-1">{modelB.name}</h4>
                  <p className="text-xs text-slate-400">"{modelB.popularName}"</p>
                </div>
                {renderVisualDiagram(modelB.id)}
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Conceito Chave:</span>
                  <p className="text-slate-300 leading-relaxed mt-0.5">{modelB.concept}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Descoberta Fundamental:</span>
                  <p className="text-emerald-300 leading-relaxed mt-0.5">{modelB.keyDiscovery}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Analogia do Cotidiano:</span>
                  <p className="text-slate-400 italic mt-0.5">{modelB.macroscopicAnalogy}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-red-400 uppercase block">Limitação que Causou Ruptura:</span>
                  <ul className="list-disc list-inside text-red-300/90 space-y-1 mt-1">
                    {modelB.limitations.map((lim, i) => (
                      <li key={i}>{lim}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Synthesis comparison summary box */}
          <div className="p-4 bg-gradient-to-r from-blue-950/50 via-slate-900 to-emerald-950/50 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Síntese Epistemológica do Salto Científico:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              A transição entre <strong>{modelA.name}</strong> e <strong>{modelB.name}</strong> demonstra que a ciência não avança por mera acumulação de fatos, mas por <em>rupturas epistemológicas</em>. Experimentos anômalos forçaram a revisão completa das concepções anteriores sobre a matéria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
