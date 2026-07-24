import React, { useState } from 'react';
import { X, Sliders, Settings2, ShieldAlert, Sparkles, CheckCircle2, RefreshCw, Layers, Brain, Zap, AlertCircle } from 'lucide-react';

export interface TeacherSettings {
  progressionMode: 'socratic' | 'unlocked';
  crookesVoltage: number; // 1, 5, 10 kV
  goldFoilThickness: number; // 100, 500, 2000 nm
  tutorMode: 'socratic_strict' | 'direct_support';
  showConceptualHints: boolean;
}

interface TeacherControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TeacherSettings;
  onUpdateSettings: (newSettings: Partial<TeacherSettings>) => void;
  onUnlockAllModels: () => void;
  onResetProgression: () => void;
}

export const TeacherControlModal: React.FC<TeacherControlModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onUnlockAllModels,
  onResetProgression
}) => {
  if (!isOpen) return null;

  // Calculate simulated pedagogical impacts based on settings
  const isSocratic = settings.progressionMode === 'socratic';
  const cognitiveLoad = isSocratic ? 'Equilibrada (Zone of Proximal Dev)' : 'Baixa (Modo Expositivo)';
  const retentionEstimate = isSocratic
    ? Math.min(95, 75 + Math.round((settings.crookesVoltage / 10) * 10) + (settings.showConceptualHints ? 10 : 0))
    : 48;
  const conceptualErrorResistance = isSocratic ? 'Alta (Anomalia força superação)' : 'Baixa (Pode gerar memorização passiva)';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Modo Professor: Painel de Controle de Parâmetros & Impactos
              </h3>
              <p className="text-xs text-slate-400">
                Ajuste variáveis pedagógicas e físicas das anomalias para observar os impactos no aprendizado do aluno em tempo real.
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
          {/* Section 1: Progression Mode */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
              <Settings2 className="w-4 h-4" /> 1. Modo de Liberdade Curricular & Progressão
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onUpdateSettings({ progressionMode: 'socratic' });
                  onResetProgression();
                }}
                className={`p-3.5 rounded-xl border text-left transition ${
                  settings.progressionMode === 'socratic'
                    ? 'bg-purple-950/80 border-purple-500 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs">Sequencial Socrático (Recomendado)</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Exige que o estudante encare as anomalias para destravar cada modelo sucessivo.
                </div>
              </button>

              <button
                onClick={() => {
                  onUpdateSettings({ progressionMode: 'unlocked' });
                  onUnlockAllModels();
                }}
                className={`p-3.5 rounded-xl border text-left transition ${
                  settings.progressionMode === 'unlocked'
                    ? 'bg-purple-950/80 border-purple-500 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs">Modo Livre / Expositivo (Todos Desbloqueados)</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Abre todos os 5 modelos atômicos instantaneamente para uso em aulas demonstrativas.
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Physical Experiment Sensitivity Variables */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" /> 2. Ajuste de Sensibilidade Física das Anomalias Experimentais
            </h4>

            {/* Variable A: Crookes Voltage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-bold">Voltagem da Ampola de Crookes (Thomson):</span>
                <span className="font-mono text-amber-400 font-bold">{settings.crookesVoltage} kV</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={settings.crookesVoltage}
                onChange={(e) => onUpdateSettings({ crookesVoltage: Number(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 italic">
                Impacto Físico: Voltagens maiores aumentam a velocidade dos raios catódicos, acentuando o desvio elétrico e comprovando a massa negligenciável dos elétrons.
              </p>
            </div>

            {/* Variable B: Gold Foil Thickness */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-bold">Espessura da Lâmina de Ouro (Rutherford):</span>
                <span className="font-mono text-blue-400 font-bold">{settings.goldFoilThickness} nm</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={settings.goldFoilThickness}
                onChange={(e) => onUpdateSettings({ goldFoilThickness: Number(e.target.value) })}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 italic">
                Impacto Físico: Lâminas muito espessas causam colisões múltiplas, enquanto lâminas finas (100nm) provam que o átomo é quase totalmente espaço vazio.
              </p>
            </div>
          </div>

          {/* Section 3: AI Pedagogical Tutor Settings */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Brain className="w-4 h-4" /> 3. Configuração do Tutor Socrático de Inteligência Artificial
            </h4>

            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div>
                <div className="text-xs font-bold text-slate-200">Exibir Dicas Conceituais Automáticas no Quiz</div>
                <div className="text-[11px] text-slate-400">Auxilia os alunos com provocações socráticas ao errarem uma pergunta.</div>
              </div>
              <button
                onClick={() => onUpdateSettings({ showConceptualHints: !settings.showConceptualHints })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  settings.showConceptualHints
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {settings.showConceptualHints ? 'Ativado' : 'Desativado'}
              </button>
            </div>
          </div>

          {/* Section 4: Real-time Pedagogical Impact Dashboard */}
          <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-800/60 p-4 sm:p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Impactos Pedagógicos Estimados em Tempo Real:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">Carga Cognitiva:</span>
                <span className="font-bold text-blue-300 block">{cognitiveLoad}</span>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">Retenção Estimada:</span>
                <span className="font-bold text-emerald-400 text-sm font-mono block">{retentionEstimate}%</span>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">Resistência ao Erro:</span>
                <span className="font-bold text-amber-300 block">{conceptualErrorResistance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
