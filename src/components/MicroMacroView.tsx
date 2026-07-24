import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Eye, Layers, Zap, Flame, Radio, Cpu, Sparkles, Play, RefreshCw, Trophy, CheckCircle2, XCircle } from 'lucide-react';

interface PhenomenaCard {
  id: 'static' | 'fireworks' | 'neon' | 'semiconductor' | 'radioactivity';
  title: string;
  macroView: string;
  microExplanation: string;
  atomicModelUsed: string;
  icon: any;
  category: string;
}

const PHENOMENA: PhenomenaCard[] = [
  {
    id: 'static',
    title: 'Eletrização por Atrito (Pente no Cabelo)',
    macroView: 'Ao esfregar um pente de plástico no cabelo seco e aproximá-lo de pedacinhos de papel picado, o papel salta e gruda no pente.',
    microExplanation: 'O atrito mecânico arranca elétrons das camadas externas do cabelo e os transfere para o pente. O acúmulo de elétrons (-) atrai por indução as cargas nos papéis neutros.',
    atomicModelUsed: 'Modelo de Thomson (Cargas Subatômicas Movéis / Elétrons)',
    icon: Zap,
    category: 'Eletricidade'
  },
  {
    id: 'fireworks',
    title: 'Cores dos Fogos de Artifício',
    macroView: 'Explosões festivas no céu produzem cores vívidas: vermelho carmim (Estrôncio), verde (Cobre) e amarelo (Sódio).',
    microExplanation: 'A energia térmica da pólvora excita elétrons para níveis energéticos externos. Ao retornarem ao nível fundamental, liberam energia exata como luz (fóton).',
    atomicModelUsed: 'Modelo de Bohr (Saltos Quânticos e Níveis Fixos de Energia)',
    icon: Flame,
    category: 'Espectroscopia'
  },
  {
    id: 'neon',
    title: 'Lâmpadas de Neon e Placas Luminosas',
    macroView: 'Tubos de vidro contendo gás neon brilham com uma luz alaranjada intensa quando conectados à eletricidade.',
    microExplanation: 'A alta voltagem dispara um fluxo contínuo de elétrons que colidem com os átomos de gás, excitando seus elétrons e gerando luminescência constante.',
    atomicModelUsed: 'Modelo de Bohr / Transições de Nível de Energia',
    icon: Eye,
    category: 'Luz e Energia'
  },
  {
    id: 'semiconductor',
    title: 'Chips de Celular e Processadores',
    macroView: 'Microprocessadores de silício alternam bilhões de vezes por segundo entre ligados (1) e desligados (0).',
    microExplanation: 'A condutividade é controlada ajustando o campo elétrico para sobrepor orbitais de valência e permitir o fluxo quântico de elétrons.',
    atomicModelUsed: 'Modelo Quântico (Orbitais e Mecânica Ondulatória de Schrödinger)',
    icon: Cpu,
    category: 'Tecnologia'
  },
  {
    id: 'radioactivity',
    title: 'Decaimento Radioativo Nuclear',
    macroView: 'Elementos pesados como o Urânio e Rádio emitem radiação contínua e calor por milhares de anos.',
    microExplanation: 'A repulsão entre prótons no núcleo hiperdenso supera a força forte, ejetando fragmentos (partículas Alfa α de 2 prótons e 2 nêutrons).',
    atomicModelUsed: 'Modelo de Rutherford (Separação entre Núcleo Denso e Eletrosfera)',
    icon: Radio,
    category: 'Física Nuclear'
  }
];

export const MicroMacroView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'explorador' | 'game'>('explorador');
  const [activeTab, setActiveTab] = useState<PhenomenaCard>(PHENOMENA[0]);

  // States for Static Electricity Anim
  const [rubCount, setRubCount] = useState<number>(0);
  const [combCharged, setCombCharged] = useState<boolean>(false);
  const [paperAttracted, setPaperAttracted] = useState<boolean>(false);

  // States for Fireworks Anim
  const [fireworkColor, setFireworkColor] = useState<{ name: string; hex: string }>({ name: 'Sódio', hex: '#eab308' });
  const [isExploding, setIsExploding] = useState<boolean>(false);

  // States for Neon Anim
  const [isNeonOn, setIsNeonOn] = useState<boolean>(false);

  // States for Semiconductor Anim
  const [gateVoltage, setGateVoltage] = useState<number>(0);

  // States for Radioactivity Anim
  const [isDecaying, setIsDecaying] = useState<boolean>(false);

  // Gamification Challenge States
  const [gameMatches, setGameMatches] = useState<Record<string, string>>({});
  const [selectedMacro, setSelectedMacro] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const handleRubComb = () => {
    if (combCharged) return;
    const nextCount = rubCount + 1;
    setRubCount(nextCount);
    if (nextCount >= 3) {
      setCombCharged(true);
      setTimeout(() => setPaperAttracted(true), 600);
    }
  };

  const handleResetComb = () => {
    setRubCount(0);
    setCombCharged(false);
    setPaperAttracted(false);
  };

  const handleLaunchFirework = (colorName: string, hex: string) => {
    setFireworkColor({ name: colorName, hex });
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 1500);
  };

  const handleTriggerDecay = () => {
    setIsDecaying(true);
    setTimeout(() => setIsDecaying(false), 2000);
  };

  // Matching game handler
  const handleGameSelectMacro = (id: string) => {
    if (gameFinished) return;
    setSelectedMacro(id);
  };

  const handleGameMatchMicro = (modelUsed: string) => {
    if (!selectedMacro || gameFinished) return;
    const targetPhenomenon = PHENOMENA.find(p => p.id === selectedMacro);
    if (targetPhenomenon) {
      const isCorrect = targetPhenomenon.atomicModelUsed === modelUsed;
      setGameMatches(prev => ({ ...prev, [selectedMacro]: modelUsed }));
      if (isCorrect) {
        setGameScore(s => s + 10);
      }
      setSelectedMacro(null);

      // Check if all matched
      if (Object.keys(gameMatches).length + 1 >= PHENOMENA.length) {
        setGameFinished(true);
      }
    }
  };

  const handleResetGame = () => {
    setGameMatches({});
    setSelectedMacro(null);
    setGameScore(0);
    setGameFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl shrink-0">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-100">Tradutor Micro-Macro Interativo</h2>
            <p className="text-xs text-slate-400">
              Visualização animada e conectora entre o mundo macroscópico visível e o arranjo atômico invisível.
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('explorador')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              viewMode === 'explorador'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Laboratório Visual
          </button>
          <button
            onClick={() => setViewMode('game')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              viewMode === 'game'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-300" /> Desafio de Conexão
          </button>
        </div>
      </div>

      {viewMode === 'explorador' ? (
        <>
          {/* Select Phenomenon Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PHENOMENA.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item)}
                  className={`p-3 sm:p-3.5 rounded-xl border text-left transition flex flex-col justify-between gap-2 min-h-[90px] ${
                    isSelected
                      ? 'bg-blue-950/80 border-blue-500 text-white shadow-lg ring-1 ring-blue-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">{item.category}</span>
                    <div className="text-xs font-bold leading-tight mt-0.5 line-clamp-2">{item.title}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Animated Simulation Stage */}
          <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Simulação Animada em Tempo Real: {activeTab.title}
              </span>
              <span className="text-[11px] font-semibold text-blue-400 bg-blue-950/60 border border-blue-900 px-2.5 py-1 rounded-lg">
                {activeTab.atomicModelUsed}
              </span>
            </div>

            {/* Animation Canvas Container */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-6 min-h-[220px] flex items-center justify-center relative overflow-hidden">
              {/* 1. Static Electricity Animation */}
              {activeTab.id === 'static' && (
                <div className="w-full flex flex-col items-center gap-4">
                  <div className="relative w-full max-w-md h-36 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-around p-2">
                    {/* Hair */}
                    <div className="flex flex-col items-center">
                      <div className="text-[10px] text-slate-400 mb-1">Cabelo Seco</div>
                      <div className="w-12 h-16 bg-amber-900/40 border border-amber-700/50 rounded-t-full flex items-center justify-center relative">
                        <span className="text-xs font-bold text-amber-300">👤</span>
                        {/* Positive ions created */}
                        {combCharged && (
                          <div className="absolute -top-2 flex gap-1 animate-bounce">
                            <span className="text-[10px] font-bold text-red-400 bg-red-950/80 px-1 rounded">+</span>
                            <span className="text-[10px] font-bold text-red-400 bg-red-950/80 px-1 rounded">+</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Comb */}
                    <div className={`transition-all duration-500 p-2 rounded-lg border flex flex-col items-center ${
                      combCharged ? 'bg-blue-900/60 border-blue-400 shadow-lg shadow-blue-500/30' : 'bg-slate-800 border-slate-700'
                    }`}>
                      <div className="text-xs font-bold text-slate-200">Pente de Plástico</div>
                      <div className="text-[10px] text-slate-400">
                        {combCharged ? 'Carregado de Elétrons (-)' : `Atrite: ${rubCount}/3`}
                      </div>
                      {combCharged && (
                        <div className="flex gap-1 mt-1">
                          <span className="text-[10px] bg-blue-500 text-white font-bold px-1 rounded">-</span>
                          <span className="text-[10px] bg-blue-500 text-white font-bold px-1 rounded">-</span>
                          <span className="text-[10px] bg-blue-500 text-white font-bold px-1 rounded">-</span>
                        </div>
                      )}
                    </div>

                    {/* Paper Bits */}
                    <div className="flex flex-col items-center">
                      <div className="text-[10px] text-slate-400 mb-1">Papéis na Mesa</div>
                      <div className="flex gap-1">
                        <div className={`w-3 h-3 bg-slate-200 rounded transition-all duration-700 ${
                          paperAttracted ? '-translate-x-12 -translate-y-4 rotate-12 bg-blue-200' : ''
                        }`} />
                        <div className={`w-3 h-3 bg-slate-200 rounded transition-all duration-700 ${
                          paperAttracted ? '-translate-x-10 -translate-y-2 -rotate-12 bg-blue-200' : ''
                        }`} />
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRubComb}
                      disabled={combCharged}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                        combCharged
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      {combCharged ? 'Pente Carregado com Sucesso!' : `Esfregar Pente no Cabelo (${rubCount}/3)`}
                    </button>

                    <button
                      onClick={handleResetComb}
                      className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                      title="Reiniciar"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Fireworks Animation */}
              {activeTab.id === 'fireworks' && (
                <div className="w-full flex flex-col items-center gap-4">
                  <div className="relative w-full max-w-md h-40 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
                    {/* Sky / Explosion */}
                    {isExploding ? (
                      <div className="relative flex items-center justify-center animate-ping">
                        <div
                          className="w-20 h-20 rounded-full blur-sm"
                          style={{ backgroundColor: fireworkColor.hex, boxShadow: `0 0 40px ${fireworkColor.hex}` }}
                        />
                        <span className="absolute text-xs font-black text-slate-950 font-mono">
                          Salto Quântico!
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Flame className="w-8 h-8 text-amber-500 mx-auto mb-1 animate-pulse" />
                        <div className="text-xs text-slate-400">Escolha o Sabor do Sal Inorgânico:</div>
                      </div>
                    )}
                  </div>

                  {/* Select Salt */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      { name: 'Sódio (Amarelo)', hex: '#eab308' },
                      { name: 'Cobre (Verde)', hex: '#10b981' },
                      { name: 'Estrôncio (Vermelho)', hex: '#ef4444' },
                      { name: 'Potássio (Lilás)', hex: '#a855f7' },
                    ].map((s) => (
                      <button
                        key={s.name}
                        onClick={() => handleLaunchFirework(s.name, s.hex)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.hex }} />
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Neon Lamp Animation */}
              {activeTab.id === 'neon' && (
                <div className="w-full flex flex-col items-center gap-4">
                  <div className={`w-full max-w-md h-28 rounded-2xl border-2 flex items-center justify-center transition-all duration-700 ${
                    isNeonOn
                      ? 'bg-amber-950/60 border-amber-500 shadow-[0_0_35px_rgba(245,158,11,0.5)]'
                      : 'bg-slate-900 border-slate-800'
                  }`}>
                    <span className={`text-2xl font-black font-mono tracking-widest ${
                      isNeonOn ? 'text-amber-300 animate-pulse' : 'text-slate-700'
                    }`}>
                      ÁTOMO-LAB NEON
                    </span>
                  </div>

                  <button
                    onClick={() => setIsNeonOn(!isNeonOn)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                      isNeonOn ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {isNeonOn ? 'DESLIGAR VOLTAGEM' : 'LIGAR CORRENTE ELÉTRICA'}
                  </button>
                </div>
              )}

              {/* 4. Semiconductor Animation */}
              {activeTab.id === 'semiconductor' && (
                <div className="w-full flex flex-col items-center gap-4">
                  <div className="w-full max-w-md h-32 bg-slate-900 rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-bold">Canal de Silício (Orbital Quântico)</span>
                      <span className="font-mono text-emerald-400 font-bold">{gateVoltage}V</span>
                    </div>

                    {/* Electron stream animation depending on voltage */}
                    <div className="h-10 bg-slate-950 rounded-lg border border-slate-800 flex items-center px-4 overflow-hidden relative">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          gateVoltage > 2 ? 'bg-emerald-400 w-full animate-pulse shadow-lg shadow-emerald-500/50' : 'bg-slate-800 w-2'
                        }`}
                      />
                      <span className="absolute right-3 text-[10px] text-slate-500 font-mono">
                        {gateVoltage > 2 ? 'FLUXO ELETRÔNICO ATIVO (1)' : 'BLOQUEADO (0)'}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={gateVoltage}
                      onChange={(e) => setGateVoltage(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* 5. Radioactivity Animation */}
              {activeTab.id === 'radioactivity' && (
                <div className="w-full flex flex-col items-center gap-4">
                  <div className="relative w-full max-w-md h-36 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs text-white shadow-xl ${
                      isDecaying ? 'animate-bounce border-2 border-amber-300' : ''
                    }`}>
                      Urânio-238
                    </div>

                    {isDecaying && (
                      <div className="absolute right-12 animate-ping text-xs font-bold text-amber-400 bg-amber-950/90 px-2 py-1 rounded border border-amber-500">
                        Partícula α ejetada!
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleTriggerDecay}
                    disabled={isDecaying}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-lg"
                  >
                    Disparar Decaimento Radioativo
                  </button>
                </div>
              )}
            </div>

            {/* Explanation Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] font-bold text-amber-400 uppercase">Visão Macroscópica</div>
                <p className="text-xs text-slate-300 leading-relaxed">{activeTab.macroView}</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] font-bold text-emerald-400 uppercase">Mecanismo Atômico Invisível</div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">{activeTab.microExplanation}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Gamified Matching Challenge */
        <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Desafio de Aprendizagem Gamificado
              </span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">Conecte o Fenômeno ao Modelo Atômico Correto</h3>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Pontuação Gamificada</div>
              <div className="text-xl font-bold text-amber-400 font-mono">{gameScore} pts</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Macroscopic Cards */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                1. Selecione um Fenômeno do Dia a Dia (Macro):
              </h4>
              {PHENOMENA.map((item) => {
                const isSelected = selectedMacro === item.id;
                const matchedModel = gameMatches[item.id];
                const isMatched = !!matchedModel;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleGameSelectMacro(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-950 border-blue-500 shadow-lg'
                        : isMatched
                        ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{item.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{item.macroView}</div>
                    </div>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Micro Model Mechanics */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                2. Associe ao Modelo Atômico/Mecanismo (Micro):
              </h4>
              {[
                'Modelo de Thomson (Cargas Subatômicas Movéis / Elétrons)',
                'Modelo de Bohr (Saltos Quânticos e Níveis Fixos de Energia)',
                'Modelo de Bohr / Transições de Nível de Energia',
                'Modelo Quântico (Orbitais e Mecânica Ondulatória de Schrödinger)',
                'Modelo de Rutherford (Separação entre Núcleo Denso e Eletrosfera)',
              ].map((modelName, idx) => (
                <button
                  key={idx}
                  disabled={!selectedMacro}
                  onClick={() => handleGameMatchMicro(modelName)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition ${
                    selectedMacro
                      ? 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-emerald-950 hover:border-emerald-500 cursor-pointer'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  {modelName}
                </button>
              ))}
            </div>
          </div>

          {gameFinished && (
            <div className="p-4 bg-emerald-950/50 border border-emerald-800 rounded-xl text-center space-y-2 animate-fade-in">
              <Trophy className="w-8 h-8 text-amber-400 mx-auto" />
              <h4 className="text-base font-bold text-emerald-200">Parabéns! Todas as conexões foram concluídas!</h4>
              <p className="text-xs text-emerald-300">
                Você demonstrou capacidade de conectar o mundo macroscópico com o invisível subatômico.
              </p>
              <button
                onClick={handleResetGame}
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Jogar Novamente
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
