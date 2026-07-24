import React, { useState, useEffect } from 'react';
import {
  X,
  Swords,
  Trophy,
  Zap,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Sparkles,
  Users,
  Bot,
  RotateCcw,
  Flame,
  Award,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { ATOMIC_MODELS } from '../data/modelsData';

interface ModelDuelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DuelChallenge {
  id: string;
  title: string;
  anomalyDescription: string;
  category: string;
  correctModelId: string;
  correctExplanation: string;
  modelFlaws: Record<string, string>;
}

const DUEL_CHALLENGES: DuelChallenge[] = [
  {
    id: 'c1',
    title: 'Desafio 1: O Enigma da Chama Amarela do Sódio',
    category: 'Espectroscopia de Emissão',
    anomalyDescription: 'Ao queimar sal de Sódio na chama de um bico de Bunsen, o gás emite estritamente fótons amarelos (λ = 589nm) com linhas discretas de cor, e não um arco-íris contínuo.',
    correctModelId: 'bohr',
    correctExplanation: 'O Modelo de Bohr explica perfeitamente: o calor excita o elétron para órbitas quantizadas mais distantes. Ao retornar para seu nível fundamental, o elétron liberta a energia exata sob a forma de um fóton de cor específica (ΔE = hν).',
    modelFlaws: {
      dalton: 'O modelo de Dalton trata o átomo como esfera maciça sem elétrons ou níveis de energia, sendo incapaz de explicar luz emitida.',
      thomson: 'Thomson supunha elétrons numa massa positiva fluida sem níveis de energia discretos; previa radiação contínua indefinida.',
      rutherford: 'Rutherford previa elétrons girando em qualquer raio; pela física clássica de Maxwell, emitiriam energia continuamente até cair no núcleo.',
      bohr: 'Explica com exatidão a quantização e os saltos quânticos para átomos hidrogenóides!',
      quantum: 'Modelo ainda mais avançado com orbitais tridimensionais, mas Bohr já resolve a anomalia das linhas espectrais quantizadas.'
    }
  },
  {
    id: 'c2',
    title: 'Desafio 2: O Ricochete Inesperado de Partículas Alfa',
    category: 'Espalhamento de Radiação',
    anomalyDescription: 'Ao bombardear uma lâmina ultra-fina de Ouro com partículas Alfa (+2), 99,9% atravessam direto, mas 1 em cada 20.000 ricocheteia com ângulos superiores a 90°!',
    correctModelId: 'rutherford',
    correctExplanation: 'Rutherford comprovou que a matéria é um imenso vácuo e a carga positiva está concentrada num núcleo hiperdenso minúsculo. A repulsão coulombiana só ocorre quando a partícula alfa passa extremamente próxima a esse núcleo.',
    modelFlaws: {
      dalton: 'Se a matéria fosse uma bola maciça densa de Dalton, NENHUMA partícula alfa conseguiria atravessar a lâmina de ouro.',
      thomson: 'No Pudim de Passas de Thomson, a carga positiva estava espalhada de forma muito tênue; previa que TODAS as partículas sofreriam pequenos desvios leves.',
      rutherford: 'Explica perfeitamente o átomo nuclear com grande espaço vazio e repulsão pontual!',
      bohr: 'Bohr utiliza a descoberta do núcleo de Rutherford para posteriormente quantizar as órbitas dos elétrons.',
      quantum: 'Herda o núcleo hiperdenso descoberto por Rutherford e substitui apenas as órbitas por orbitais.'
    }
  },
  {
    id: 'c3',
    title: 'Desafio 3: O Desvio dos Raios Catódicos',
    category: 'Eletromagnetismo Subatômico',
    anomalyDescription: 'Em um tubo de alto vácuo de Crookes, um feixe invisível de raios provém do catodo (-) e sofre desvio na direção da placa elétrica positiva (+).',
    correctModelId: 'thomson',
    correctExplanation: 'Thomson descobriu a primeira partícula subatômica: o elétron! Como o feixe é atraído pelo polo positivo, ele provou que todos os átomos contêm corpúsculos com carga elétrica negativa.',
    modelFlaws: {
      dalton: 'Para Dalton, o átomo era indivisível e neutro por inteiro, não contendo cargas ou partículas menores no seu interior.',
      thomson: 'Identifica o elétron e demonstra a divisibilidade da matéria e a razão e/m!',
      rutherford: 'Avança ao agrupar os elétrons fora do núcleo, mas a descoberta inicial foi feita por Thomson no tubo de Crookes.',
      bohr: 'Modelou as órbitas eletrônicas após os experimentos de Thomson e Rutherford.',
      quantum: 'Mapeia a densidade de probabilidade eletrônica, mas a descoberta histórica da carga do elétron foi no modelo de Thomson.'
    }
  },
  {
    id: 'c4',
    title: 'Desafio 4: A Conservação de Massa na Reação de Queima',
    category: 'Leis Ponderais',
    anomalyDescription: 'A massa total do metano e oxigênio antes da combustão em recipiente selado é rigorosamente igual à massa do gás carbônico e água resultantes.',
    correctModelId: 'dalton',
    correctExplanation: 'Dalton fundamentou a Lei de Lavoisier: reações químicas não criam nem destroem átomos, apenas rearranjam esferas indivisíveis de diferentes elementos em novas proporções.',
    modelFlaws: {
      dalton: 'Explica perfeitamente a conservação de massas e as proporções fixas de reagentes e produtos!',
      thomson: 'Modelo mais focado em eletricidade e elétrons do que em estequiometria clássica.',
      rutherford: 'Focado na estrutura nuclear e eletrosfera.',
      bohr: 'Focado nos espectros de luz e quantização de energia.',
      quantum: 'Aborda a mecânica quântica e orbitais eletrônicos.'
    }
  },
  {
    id: 'c5',
    title: 'Desafio 5: O Princípio da Incerteza da Posição Eletrônica',
    category: 'Mecânica Quântica',
    anomalyDescription: 'É impossível determinar simultaneamente, com precisão absoluta, a posição exata e a velocidade (momento) de um elétron ao redor do núcleo.',
    correctModelId: 'quantum',
    correctExplanation: 'Schrödinger e Heisenberg provaram que o elétron comporta-se como onda de probabilidade. Substitui-se a trajetória circular definida por uma nuvem tridimensional de probabilidade |Ψ|² (orbital).',
    modelFlaws: {
      dalton: 'Desconhecia a existência do elétron.',
      thomson: 'Elétrons fixos em geléia positiva sem mecânica ondulatória.',
      rutherford: 'Tratava o elétron como uma partícula clássica girando numa pista.',
      bohr: 'Definia órbitas circulares com raio r e velocidade exatos, violando o Princípio de Heisenberg.',
      quantum: 'Modelo atômico moderno que adota a dualidade onda-partícula e os orbitais de probabilidade!'
    }
  }
];

export const ModelDuelModal: React.FC<ModelDuelModalProps> = ({ isOpen, onClose }) => {
  const [vsMode, setVsMode] = useState<'pvp' | 'pve'>('pve'); // Player vs Player or Player vs AI
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [p1Score, setP1Score] = useState<number>(0);
  const [p2Score, setP2Score] = useState<number>(0);

  const [p1SelectedModel, setP1SelectedModel] = useState<string | null>(null);
  const [p2SelectedModel, setP2SelectedModel] = useState<string | null>(null);

  const [duelState, setDuelState] = useState<'selection' | 'clash' | 'results'>('selection');
  const [winnerMessage, setWinnerMessage] = useState<string>('');

  if (!isOpen) return null;

  const challenge = DUEL_CHALLENGES[currentRound];

  const handleP1Select = (modelId: string) => {
    if (duelState !== 'selection') return;
    setP1SelectedModel(modelId);

    // If PVE, AI selects automatically after a short delay or immediately
    if (vsMode === 'pve') {
      const models = ['dalton', 'thomson', 'rutherford', 'bohr', 'quantum'];
      // AI has 60% chance to select correct or 40% random
      const isSmartAI = Math.random() < 0.6;
      let aiChoice = challenge.correctModelId;
      if (!isSmartAI) {
        const wrongModels = models.filter((m) => m !== challenge.correctModelId);
        aiChoice = wrongModels[Math.floor(Math.random() * wrongModels.length)];
      }
      setP2SelectedModel(aiChoice);
    }
  };

  const handleStartClash = () => {
    if (!p1SelectedModel || !p2SelectedModel) return;
    setDuelState('clash');

    setTimeout(() => {
      // Calculate round winner
      const p1Correct = p1SelectedModel === challenge.correctModelId;
      const p2Correct = p2SelectedModel === challenge.correctModelId;

      let p1Points = p1Correct ? 100 : 0;
      let p2Points = p2Correct ? 100 : 0;

      setP1Score((prev) => prev + p1Points);
      setP2Score((prev) => prev + p2Points);

      if (p1Correct && !p2Correct) {
        setWinnerMessage('Vitória do Jogador 1! Escolheu o modelo correto e desbancou o oponente!');
      } else if (!p1Correct && p2Correct) {
        setWinnerMessage(vsMode === 'pve' ? 'A IA (Rival) venceu este duelo!' : 'Vitória do Jogador 2!');
      } else if (p1Correct && p2Correct) {
        setWinnerMessage('Empate Técnico! Ambos os jogadores escolheram o modelo correto!');
      } else {
        setWinnerMessage('Ambos os modelos falharam diante da anomalia experimental!');
      }

      setDuelState('results');
    }, 1200);
  };

  const handleNextRound = () => {
    if (currentRound < DUEL_CHALLENGES.length - 1) {
      setCurrentRound((prev) => prev + 1);
      setP1SelectedModel(null);
      setP2SelectedModel(null);
      setDuelState('selection');
    } else {
      setDuelState('results');
    }
  };

  const handleRestartDuel = () => {
    setCurrentRound(0);
    setP1Score(0);
    setP2Score(0);
    setP1SelectedModel(null);
    setP2SelectedModel(null);
    setDuelState('selection');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-red-950/40 via-slate-900 to-blue-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
              <Swords className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-100 flex items-center gap-2">
                  Duelo de Modelos Atômicos
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/20">
                  Modo Competitivo Gamificado
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Escolha o modelo atômico com maior poder explicativo para superar a anomalia científica!
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

        {/* Duel Mode Selector & Scoreboard */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setVsMode('pve'); handleRestartDuel(); }}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                vsMode === 'pve' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" /> 1vs1 Contra IA
            </button>
            <button
              onClick={() => { setVsMode('pvp'); handleRestartDuel(); }}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                vsMode === 'pvp' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" /> 2 Jogadores (Local)
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-400 font-bold">Rodada {currentRound + 1} de {DUEL_CHALLENGES.length}</span>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1">
                <span className="font-bold text-red-400">P1:</span>
                <span className="font-mono font-black text-slate-100">{p1Score} pts</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-blue-400">{vsMode === 'pve' ? 'IA:' : 'P2:'}</span>
                <span className="font-mono font-black text-slate-100">{p2Score} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Duel Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
          {/* Anomaly Challenge Box */}
          <div className="p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-mono text-[11px] font-bold border border-amber-500/20">
                {challenge.category}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Anomalia Histórica #{currentRound + 1}
              </span>
            </div>
            <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              {challenge.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
              {challenge.anomalyDescription}
            </p>
          </div>

          {/* Player Selection Stage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player 1 Selection Card */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> JOGADOR 1 (Sua Escolha)
                </span>
                {p1SelectedModel && (
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Selecionado
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2">
                {ATOMIC_MODELS.map((m) => {
                  const isSelected = p1SelectedModel === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleP1Select(m.id)}
                      disabled={duelState !== 'selection'}
                      className={`p-3 rounded-xl text-left transition flex items-center justify-between border ${
                        isSelected
                          ? 'bg-red-950/50 border-red-500 text-white shadow-lg shadow-red-950/50'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{m.name} ({m.year})</div>
                        <div className="text-[10px] text-slate-400">{m.popularName}</div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {m.id.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Player 2 or AI Selection Card */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {vsMode === 'pve' ? 'OPONENTE (IA Bot)' : 'JOGADOR 2'}
                </span>
                {p2SelectedModel && (
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Selecionado
                  </span>
                )}
              </div>

              {vsMode === 'pve' ? (
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center text-center space-y-3 min-h-[260px]">
                  <Bot className="w-12 h-12 text-blue-400 animate-bounce" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {p2SelectedModel ? 'IA escolheu seu modelo!' : 'Aguardando escolha do Jogador 1...'}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {p2SelectedModel ? 'A IA analisou os dados históricos e apostou no modelo rival!' : 'Assim que você escolher, a IA fará a jogada dela.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {ATOMIC_MODELS.map((m) => {
                    const isSelected = p2SelectedModel === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setP2SelectedModel(m.id)}
                        disabled={duelState !== 'selection'}
                        className={`p-3 rounded-xl text-left transition flex items-center justify-between border ${
                          isSelected
                            ? 'bg-blue-950/50 border-blue-500 text-white shadow-lg shadow-blue-950/50'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold">{m.name} ({m.year})</div>
                          <div className="text-[10px] text-slate-400">{m.popularName}</div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                          {m.id.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Duel Action Button */}
          {duelState === 'selection' && (
            <div className="flex justify-center pt-2">
              <button
                onClick={handleStartClash}
                disabled={!p1SelectedModel || !p2SelectedModel}
                className="px-8 py-3.5 bg-gradient-to-r from-red-600 via-amber-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-black rounded-2xl text-sm shadow-xl shadow-amber-500/20 flex items-center gap-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Swords className="w-5 h-5 animate-spin-slow" /> INICIAR DUELO EPISTEMOLÓGICO
              </button>
            </div>
          )}

          {/* Clash Animation */}
          {duelState === 'clash' && (
            <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <Swords className="w-16 h-16 text-amber-400 animate-pulse" />
                <Sparkles className="w-6 h-6 text-red-400 absolute -top-2 -left-2 animate-ping" />
                <Sparkles className="w-6 h-6 text-blue-400 absolute -bottom-2 -right-2 animate-ping" />
              </div>
              <h4 className="text-lg font-black text-amber-300 uppercase tracking-widest animate-pulse">
                Confrontando Modelos com os Fatos Experimentais...
              </h4>
              <p className="text-xs text-slate-400">
                Testando a resistência teórica e os limites epistemológicos!
              </p>
            </div>
          )}

          {/* Results Stage */}
          {duelState === 'results' && (
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-5 animate-fade-in">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-extrabold border border-amber-500/20">
                  Resultado do Duelo
                </span>
                <h3 className="text-base font-extrabold text-slate-100">{winnerMessage}</h3>
              </div>

              {/* Explanatory Breakdown */}
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Explicação Científica Vencedora:
                </h4>
                <p className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-emerald-200 leading-relaxed">
                  {challenge.correctExplanation}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                    <span className="font-bold text-red-400">Análise do Jogador 1 ({p1SelectedModel}):</span>
                    <p className="text-slate-300 text-[11px]">
                      {p1SelectedModel ? challenge.modelFlaws[p1SelectedModel] : ''}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                    <span className="font-bold text-blue-400">Análise do {vsMode === 'pve' ? 'Rival IA' : 'Jogador 2'} ({p2SelectedModel}):</span>
                    <p className="text-slate-300 text-[11px]">
                      {p2SelectedModel ? challenge.modelFlaws[p2SelectedModel] : ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={handleRestartDuel}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-2 transition"
                >
                  <RotateCcw className="w-4 h-4" /> Reiniciar Placar
                </button>

                {currentRound < DUEL_CHALLENGES.length - 1 ? (
                  <button
                    onClick={handleNextRound}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-emerald-600/20"
                  >
                    Próxima Anomalia <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-bold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" /> Duelo Finalizado! Placar Final: J1 {p1Score} - {p2Score} {vsMode === 'pve' ? 'IA' : 'J2'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
