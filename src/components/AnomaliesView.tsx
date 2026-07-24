import React, { useState } from 'react';
import { ANOMALY_CHALLENGES, ATOMIC_MODELS } from '../data/modelsData';
import { AnomalyChallenge } from '../types';
import { ShieldAlert, CheckCircle, Lightbulb, ArrowRight, Award } from 'lucide-react';

interface AnomaliesViewProps {
  unlockedModels: string[];
  onUnlockNextModel: (nextModelId: 'thomson' | 'rutherford' | 'bohr' | 'quantum') => void;
}

export const AnomaliesView: React.FC<AnomaliesViewProps> = ({ unlockedModels, onUnlockNextModel }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<AnomalyChallenge>(ANOMALY_CHALLENGES[0]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [resolved, setResolved] = useState<boolean>(false);

  const handleResolve = () => {
    setResolved(true);
    onUnlockNextModel(selectedChallenge.nextModelUnlocked);
  };

  const handleSelectChallenge = (c: AnomalyChallenge) => {
    setSelectedChallenge(c);
    setShowHint(false);
    setResolved(unlockedModels.includes(c.nextModelUnlocked));
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Jornada de Investigação: Rupturas Epistemológicas</h2>
            <p className="text-xs text-slate-400">
              A ciência não progride em linha reta, mas pela superação de contradições experimentais. Resolva os enigmas históricos para desbloquear o próximo modelo!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Anomaly selector sidebar */}
        <div className="lg:col-span-4 space-y-3">
          {ANOMALY_CHALLENGES.map((c, index) => {
            const isUnlocked = index === 0 || unlockedModels.includes(c.modelId);
            const isSolved = unlockedModels.includes(c.nextModelUnlocked);
            const isSelected = selectedChallenge.id === c.id;

            return (
              <button
                key={c.id}
                disabled={!isUnlocked}
                onClick={() => handleSelectChallenge(c)}
                className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3 ${
                  isSelected
                    ? 'bg-slate-800 border-amber-500/80 shadow-lg'
                    : isUnlocked
                    ? 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/50'
                    : 'bg-slate-950/40 border-slate-900 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className={`p-2 rounded-lg font-mono text-xs font-bold ${
                  isSolved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{c.title}</span>
                    {isSolved && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Conflito no {ATOMIC_MODELS.find(m => m.id === c.modelId)?.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Anomaly Details */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-semibold border border-amber-500/20">
                Desafio Histórico
              </span>
              <h3 className="text-lg font-bold text-slate-100 mt-2">{selectedChallenge.title}</h3>
            </div>
            {unlockedModels.includes(selectedChallenge.nextModelUnlocked) && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-800 px-3 py-1.5 rounded-xl">
                <Award className="w-4 h-4" /> Ruptura Compreendida!
              </span>
            )}
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Contexto Histórico do Experimento:
              </h4>
              <p className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed text-xs">
                {selectedChallenge.historicalContext}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                O Fato Experimental Inesperado (Anomalia):
              </h4>
              <p className="bg-amber-950/20 p-3.5 rounded-xl border border-amber-900/40 text-amber-200 leading-relaxed text-xs font-medium">
                {selectedChallenge.experimentalFact}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-slate-100">
                A Pergunta Epistemológica:
              </h4>
              <p className="text-xs text-slate-300 italic font-serif text-base">
                "{selectedChallenge.question}"
              </p>

              {/* Hint button */}
              {!showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-amber-400 flex items-center gap-1.5 hover:underline font-medium"
                >
                  <Lightbulb className="w-3.5 h-3.5" /> Ver Dica do Investigador
                </button>
              )}

              {showHint && (
                <div className="p-3 bg-slate-900 border border-amber-500/30 rounded-lg text-xs text-amber-200/90 animate-fade-in">
                  <strong>Dica:</strong> {selectedChallenge.hint}
                </div>
              )}
            </div>

            {/* Resolution Section */}
            {unlockedModels.includes(selectedChallenge.nextModelUnlocked) || resolved ? (
              <div className="p-4 bg-emerald-950/30 border border-emerald-900/50 rounded-xl space-y-2 animate-fade-in">
                <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Solução da Ruptura Epistemológica:
                </h4>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  {selectedChallenge.solutionExplanation}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <ArrowRight className="w-4 h-4" /> Próximo Modelo Desbloqueado:{' '}
                  {ATOMIC_MODELS.find(m => m.id === selectedChallenge.nextModelUnlocked)?.name}
                </div>
              </div>
            ) : (
              <button
                onClick={handleResolve}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20"
              >
                Compreendi a Ruptura & Desbloquear Próximo Modelo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
