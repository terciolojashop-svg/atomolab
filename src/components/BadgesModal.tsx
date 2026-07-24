import React from 'react';
import { X, Award, CheckCircle2, Lock, Sparkles, Trophy, Star } from 'lucide-react';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedModels: string[];
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  isUnlocked: boolean;
  icon: string;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, onClose, unlockedModels }) => {
  if (!isOpen) return null;

  const BADGES: BadgeItem[] = [
    {
      id: 'dalton_pioneer',
      title: 'Pioneiro das Esferas Indivisíveis',
      description: 'Iniciou a jornada compreendendo a conservação de massa e os átomos maciços de Dalton.',
      category: 'História Científica',
      isUnlocked: unlockedModels.includes('dalton'),
      icon: '🔵'
    },
    {
      id: 'thomson_charge',
      title: 'Caçador de Elétrons',
      description: 'Superou o dogma da indivisibilidade e descobriu as partículas subatômicas negativas de Thomson.',
      category: 'Ruptura Teórica',
      isUnlocked: unlockedModels.includes('thomson'),
      icon: '⚡'
    },
    {
      id: 'rutherford_nucleus',
      title: 'Explorador do Vazio Nuclear',
      description: 'Lançou partículas Alfa em lâmina de ouro e provou que o átomo é predominantemente espaço vazio.',
      category: 'Física Experimental',
      isUnlocked: unlockedModels.includes('rutherford'),
      icon: '☢️'
    },
    {
      id: 'bohr_quantum_jump',
      title: 'Mestre dos Saltos Quânticos',
      description: 'Compreendeu os níveis fixos de energia e as emissões de luz do modelo de Bohr.',
      category: 'Espectroscopia',
      isUnlocked: unlockedModels.includes('bohr'),
      icon: '✨'
    },
    {
      id: 'quantum_cloud',
      title: 'Navegador de Orbitais',
      description: 'Alcançou o modelo atômico moderno de equações de onda e nuvem eletrônica de Schrödinger.',
      category: 'Física Moderna',
      isUnlocked: unlockedModels.includes('quantum'),
      icon: '⚛️'
    },
    {
      id: 'anomaly_master',
      title: 'Detetive Epistemológico',
      description: 'Analisou anomalias experimentais e superou obstáculos conceituais no laboratório.',
      category: 'Análise Crítica',
      isUnlocked: unlockedModels.length >= 3,
      icon: '🔍'
    },
    {
      id: 'micro_macro_translator',
      title: 'Tradutor Atômico do Cotidiano',
      description: 'Conectou fenômenos visíveis do dia a dia (fogos, neon, estática) ao arranjo invisível dos átomos.',
      category: 'Aplicação Real',
      isUnlocked: unlockedModels.length >= 4,
      icon: '💡'
    },
    {
      id: 'top_researcher',
      title: 'Pesquisador Epistemológico Sênior',
      description: 'Alcançou maestria máxima em todos os modelos e rupturas históricas da química.',
      category: 'Mestrado & TCC',
      isUnlocked: unlockedModels.length === 5,
      icon: '🏆'
    }
  ];

  const unlockedCount = BADGES.filter(b => b.isUnlocked).length;
  const progressPercent = Math.round((unlockedCount / BADGES.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Galeria de Badges & Conquistas Epistemológicas
              </h3>
              <p className="text-xs text-slate-400">
                Recompensas gamificadas por superar obstáculos e dominar os modelos atômicos.
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

        {/* Progress Banner */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              Progresso do Colecionador: {unlockedCount} de {BADGES.length} Conquistas
            </span>
            <span className="font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-500 transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Badges Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-xl border transition flex items-start gap-3 ${
                badge.isUnlocked
                  ? 'bg-slate-950 border-amber-500/30 shadow-md ring-1 ring-amber-500/10'
                  : 'bg-slate-950/40 border-slate-900 opacity-50'
              }`}
            >
              <div className="text-2xl p-2 bg-slate-900 rounded-xl border border-slate-800 shrink-0">
                {badge.icon}
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400/90 block truncate">
                    {badge.category}
                  </span>
                  {badge.isUnlocked ? (
                    <span className="text-[9px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3 h-3" /> Conquistado
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold bg-slate-900 text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0">
                      <Lock className="w-3 h-3" /> Bloqueado
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-100 truncate">{badge.title}</h4>
                <p className="text-[11px] text-slate-400 leading-tight line-clamp-2">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
