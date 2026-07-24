import React from 'react';
import { X, Compass, Atom, ShieldAlert, ArrowLeftRight, HelpCircle, FileCheck, CheckCircle2, ArrowRight, Beaker } from 'lucide-react';

interface PlatformGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: 'simulations' | 'anomalies' | 'micromacro' | 'quiz' | 'analytics' | 'freelab') => void;
}

export const PlatformGuideModal: React.FC<PlatformGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  if (!isOpen) return null;

  const STEPS = [
    {
      number: '1',
      title: 'Explore os Modelos Atômicos',
      tab: 'simulations' as const,
      icon: Atom,
      color: 'border-blue-500/40 bg-blue-950/40 text-blue-400',
      description: 'Navegue pela Linha do Tempo e interaja com cada modelo (Dalton, Thomson, Rutherford, Bohr, Quântico). Veja suas hipóteses e representações físicas.',
      actionText: 'Ir para Simuladores'
    },
    {
      number: '2',
      title: 'Enfrente Anomalias & Provoque Rupturas',
      tab: 'anomalies' as const,
      icon: ShieldAlert,
      color: 'border-amber-500/40 bg-amber-950/40 text-amber-400',
      description: 'Execute experimentos reais (Ampola de Crookes, Lâmina de Ouro) que falham ao serem explicados pelo modelo atual. Essa falha desbloqueia o próximo modelo!',
      actionText: 'Ir para Anomalias'
    },
    {
      number: '3',
      title: 'Conecte o Micro ao Macro',
      tab: 'micromacro' as const,
      icon: ArrowLeftRight,
      color: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400',
      description: 'Veja como a eletrosfera invisível explica coisas do dia a dia: atrito do pente no cabelo, fogos de artifício coloridos, lâmpadas neon e chips de computador.',
      actionText: 'Ir para Tradutor Micro-Macro'
    },
    {
      number: '4',
      title: 'Avalie a Aprendizagem & Gerar Ficha',
      tab: 'quiz' as const,
      icon: HelpCircle,
      color: 'border-purple-500/40 bg-purple-950/40 text-purple-400',
      description: 'Responda aos desafios socráticos no Quiz, acompanhe seu nível de maestria por modelo e gere a Ficha Pedagógica de Campo para apresentar ao professor.',
      actionText: 'Ir para Quiz & Avaliação'
    },
    {
      number: '5',
      title: 'Laboratório de Experimentos Livres',
      tab: 'freelab' as const,
      icon: Beaker,
      color: 'border-pink-500/40 bg-pink-950/40 text-pink-400',
      description: 'Combine livremente massa, cargas, dinâmicas de elétron e estímulos de modelos diferentes para testar hipóteses híbridas e acumular pontos de criatividade!',
      actionText: 'Ir para Experimentos Livres'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Guia da Plataforma: Como Funciona o Caminho Pedagógico
              </h3>
              <p className="text-xs text-slate-400">
                Entenda a jornada científica de evolução dos modelos atômicos e como navegar pela plataforma.
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
          {/* Conceptual introduction */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2">
            <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Fundamentação Pedagógica (Gaston Bachelard & Thomas Kuhn)
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Diferente dos livros didáticos tradicionais que apresentam a química como uma lista estática de descobertas, esta plataforma foi projetada como uma <strong>Jornada Epistemológica de Rupturas</strong>. O conhecimento avança quando um modelo antigo entra em contradição com fatos experimentais.
            </p>
          </div>

          {/* Step by Step Roadmap */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Trilha Recomendada de Aprendizagem (Etapas 1 a 4):
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className={`p-4 rounded-xl border ${step.color} flex flex-col justify-between gap-3 relative transition hover:border-slate-600`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-200">
                          {step.number}
                        </span>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h5 className="text-sm font-bold text-slate-100">{step.title}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        onNavigateTab(step.tab);
                        onClose();
                      }}
                      className="mt-2 w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition"
                    >
                      <span>{step.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
