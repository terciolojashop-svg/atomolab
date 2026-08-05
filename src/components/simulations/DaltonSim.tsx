import React, { useState } from 'react';
import { RefreshCw, Play, CheckCircle2, Beaker, Flame, Sparkles, Scale, Info, Plus, Minus, Layers, AlertCircle, BookOpen } from 'lucide-react';

interface ElementInfo {
  name: string;
  symbol: string;
  daltonSymbol1808: string; // Unicode or custom SVG style representation
  massPerAtom: number;
  color: string;
  daltonPatternBg: string;
}

const ELEMENTS_DB: Record<string, ElementInfo> = {
  H: { name: 'Hidrogênio', symbol: 'H', daltonSymbol1808: '☉', massPerAtom: 1, color: 'bg-blue-500', daltonPatternBg: 'bg-sky-400 text-slate-950 font-black' },
  O: { name: 'Oxigênio', symbol: 'O', daltonSymbol1808: '◯', massPerAtom: 16, color: 'bg-red-500', daltonPatternBg: 'bg-rose-500 text-white font-black' },
  C: { name: 'Carbono', symbol: 'C', daltonSymbol1808: '●', massPerAtom: 12, color: 'bg-emerald-600', daltonPatternBg: 'bg-emerald-900 text-white font-black' },
  N: { name: 'Nitrogênio', symbol: 'N', daltonSymbol1808: '⊘', massPerAtom: 14, color: 'bg-purple-600', daltonPatternBg: 'bg-purple-800 text-white font-black' },
  Cl: { name: 'Cloro', symbol: 'Cl', daltonSymbol1808: '⊗', massPerAtom: 35.5, color: 'bg-amber-500', daltonPatternBg: 'bg-amber-600 text-slate-950 font-black' },
  Fe: { name: 'Ferro', symbol: 'Fe', daltonSymbol1808: 'Ⓘ', massPerAtom: 56, color: 'bg-orange-600', daltonPatternBg: 'bg-orange-700 text-white font-black' },
};

interface ReactionConfig {
  id: string;
  name: string;
  category: string;
  equation: string;
  description: string;
  reagentA: { symbol: string; name: string; coeffBase: number; atomsPerMolecule: number; label: string };
  reagentB: { symbol: string; name: string; coeffBase: number; atomsPerMolecule: number; label: string };
  productA: { name: string; formula: string; composition: { symbol: string; count: number }[]; coeffBase: number };
  productB?: { name: string; formula: string; composition: { symbol: string; count: number }[]; coeffBase: number };
  daltonInsight: string;
}

const REACTIONS: ReactionConfig[] = [
  {
    id: 'water',
    name: '1. Síntese da Água',
    category: 'Síntese',
    equation: '2H₂ + O₂ → 2H₂O',
    description: 'Reação fundamental entre gás Hidrogênio e Oxigênio. Requer proporção estequiométrica de 2 moléculas de H₂ para 1 de O₂.',
    reagentA: { symbol: 'H', name: 'Hidrogênio', coeffBase: 2, atomsPerMolecule: 2, label: 'H₂' },
    reagentB: { symbol: 'O', name: 'Oxigênio', coeffBase: 1, atomsPerMolecule: 2, label: 'O₂' },
    productA: { name: 'Água', formula: 'H₂O', composition: [{ symbol: 'H', count: 2 }, { symbol: 'O', count: 1 }], coeffBase: 2 },
    daltonInsight: 'Átomos de H (massa 1u) e O (massa 16u) combinam-se na proporção exata de 2:1 para formar cada molécula de água.'
  },
  {
    id: 'methane',
    name: '2. Combustão do Metano',
    category: 'Combustão',
    equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    description: 'A queima de metano (gás natural). Requer 1 CH₄ para 2 O₂ produzindo dióxido de carbono e água.',
    reagentA: { symbol: 'C', name: 'Metano (CH₄)', coeffBase: 1, atomsPerMolecule: 5, label: 'CH₄' }, // 1 C + 4 H
    reagentB: { symbol: 'O', name: 'Oxigênio', coeffBase: 2, atomsPerMolecule: 2, label: 'O₂' },
    productA: { name: 'Gás Carbônico', formula: 'CO₂', composition: [{ symbol: 'C', count: 1 }, { symbol: 'O', count: 2 }], coeffBase: 1 },
    productB: { name: 'Água', formula: 'H₂O', composition: [{ symbol: 'H', count: 2 }, { symbol: 'O', count: 1 }], coeffBase: 2 },
    daltonInsight: '1 átomo de C e 4 de H libertam-se do metano para unir-se a 4 átomos de O do oxigênio atmosférico.'
  },
  {
    id: 'ammonia',
    name: '3. Síntese da Amônia',
    category: 'Síntese',
    equation: 'N₂ + 3H₂ → 2NH₃',
    description: 'Reação de Haber-Bosch. Requer 1 molécula de N₂ para 3 de H₂ para produzir 2 de NH₃.',
    reagentA: { symbol: 'N', name: 'Nitrogênio', coeffBase: 1, atomsPerMolecule: 2, label: 'N₂' },
    reagentB: { symbol: 'H', name: 'Hidrogênio', coeffBase: 3, atomsPerMolecule: 2, label: 'H₂' },
    productA: { name: 'Amônia', formula: 'NH₃', composition: [{ symbol: 'N', count: 1 }, { symbol: 'H', count: 3 }], coeffBase: 2 },
    daltonInsight: '2 átomos de N (roxos) atraem 6 átomos de H (azuis) formando 2 moléculas piramidais rígidas de amônia.'
  },
  {
    id: 'hcl',
    name: '4. Formação do Ácido Clorídrico',
    category: 'Síntese',
    equation: 'H₂ + Cl₂ → 2HCl',
    description: 'Combinação direta entre H₂ e Cl₂ na proporção de 1:1 produzindo 2 moléculas de HCl.',
    reagentA: { symbol: 'H', name: 'Hidrogênio', coeffBase: 1, atomsPerMolecule: 2, label: 'H₂' },
    reagentB: { symbol: 'Cl', name: 'Cloro', coeffBase: 1, atomsPerMolecule: 2, label: 'Cl₂' },
    productA: { name: 'Gás Clorídrico', formula: 'HCl', composition: [{ symbol: 'H', count: 1 }, { symbol: 'Cl', count: 1 }], coeffBase: 2 },
    daltonInsight: 'Cada esfera de H troca metade da sua ligação com uma esfera pesada de Cl (35.5u).'
  },
  {
    id: 'co2',
    name: '5. Combustão do Carvão',
    category: 'Combustão',
    equation: 'C + O₂ → CO₂',
    description: 'Combustão direta do carvão vegetal sólido com oxigênio na proporção de 1:1.',
    reagentA: { symbol: 'C', name: 'Carbono', coeffBase: 1, atomsPerMolecule: 1, label: 'C' },
    reagentB: { symbol: 'O', name: 'Oxigênio', coeffBase: 1, atomsPerMolecule: 2, label: 'O₂' },
    productA: { name: 'Dióxido de Carbono', formula: 'CO₂', composition: [{ symbol: 'C', count: 1 }, { symbol: 'O', count: 2 }], coeffBase: 1 },
    daltonInsight: 'Uma esfera de Carbono sólido atrai duas esferas de Oxigênio gasoso formando CO₂ linear.'
  },
  {
    id: 'rust',
    name: '6. Oxidação do Ferro',
    category: 'Oxidação',
    equation: '4Fe + 3O₂ → 2Fe₂O₃',
    description: 'Oxidação lenta do ferro metálico para formar a ferrugem (óxido de ferro III). Proporção 4 Fe : 3 O₂.',
    reagentA: { symbol: 'Fe', name: 'Ferro', coeffBase: 4, atomsPerMolecule: 1, label: 'Fe' },
    reagentB: { symbol: 'O', name: 'Oxigênio', coeffBase: 3, atomsPerMolecule: 2, label: 'O₂' },
    productA: { name: 'Ferrugem', formula: 'Fe₂O₃', composition: [{ symbol: 'Fe', count: 2 }, { symbol: 'O', count: 3 }], coeffBase: 2 },
    daltonInsight: '4 esferas de Ferro e 6 esferas de Oxigênio unem-se em 2 unidades da rede cristalina Fe₂O₃.'
  }
];

export const DaltonSim: React.FC = () => {
  const [selectedReactionId, setSelectedReactionId] = useState<string>('water');
  const [multiplierA, setMultiplierA] = useState<number>(2); // Reagent A molecule count multiplier
  const [multiplierB, setMultiplierB] = useState<number>(1); // Reagent B molecule count multiplier
  const [useDalton1808Symbols, setUseDalton1808Symbols] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<'cold' | 'normal' | 'hot'>('normal');
  const [reactionStage, setReactionStage] = useState<'initial' | 'mixing' | 'reacted'>('initial');
  const [activeTab, setActiveTab] = useState<'lab' | 'proust' | 'postulates'>('lab');

  const currentRx = REACTIONS.find((r) => r.id === selectedReactionId) || REACTIONS[0];

  // Calculate Stoichiometry based on current multiplier inputs
  // For 'water' (2 H2 + 1 O2 -> 2 H2O): base is 2 H2 : 1 O2
  const ratioA = currentRx.reagentA.coeffBase;
  const ratioB = currentRx.reagentB.coeffBase;

  // Determine how many full reaction sets can occur
  const rxSets = Math.min(
    Math.floor(multiplierA / ratioA),
    Math.floor(multiplierB / ratioB)
  );

  const excessA = multiplierA - rxSets * ratioA;
  const excessB = multiplierB - rxSets * ratioB;

  // Mass calculations
  const getReagentAMass = () => {
    if (currentRx.id === 'methane') {
      // CH4 = 1 C (12) + 4 H (4) = 16u
      return multiplierA * 16;
    }
    const elem = ELEMENTS_DB[currentRx.reagentA.symbol] || ELEMENTS_DB['H'];
    return multiplierA * currentRx.reagentA.atomsPerMolecule * elem.massPerAtom;
  };

  const getReagentBMass = () => {
    const elem = ELEMENTS_DB[currentRx.reagentB.symbol] || ELEMENTS_DB['O'];
    return multiplierB * currentRx.reagentB.atomsPerMolecule * elem.massPerAtom;
  };

  const totalReagentMass = getReagentAMass() + getReagentBMass();

  // Products Mass
  const getProductAMass = () => {
    let singleProdMass = 0;
    currentRx.productA.composition.forEach((item) => {
      const el = ELEMENTS_DB[item.symbol] || ELEMENTS_DB['H'];
      singleProdMass += item.count * el.massPerAtom;
    });
    return rxSets * currentRx.productA.coeffBase * singleProdMass;
  };

  const getProductBMass = () => {
    if (!currentRx.productB) return 0;
    let singleProdMass = 0;
    currentRx.productB.composition.forEach((item) => {
      const el = ELEMENTS_DB[item.symbol] || ELEMENTS_DB['H'];
      singleProdMass += item.count * el.massPerAtom;
    });
    return rxSets * currentRx.productB.coeffBase * singleProdMass;
  };

  const excessAMass = () => {
    if (currentRx.id === 'methane') return excessA * 16;
    const elem = ELEMENTS_DB[currentRx.reagentA.symbol] || ELEMENTS_DB['H'];
    return excessA * currentRx.reagentA.atomsPerMolecule * elem.massPerAtom;
  };

  const excessBMass = () => {
    const elem = ELEMENTS_DB[currentRx.reagentB.symbol] || ELEMENTS_DB['O'];
    return excessB * currentRx.reagentB.atomsPerMolecule * elem.massPerAtom;
  };

  const totalProductMass = getProductAMass() + getProductBMass() + excessAMass() + excessBMass();

  const handleRunReaction = () => {
    setReactionStage('mixing');
    setTimeout(() => {
      setReactionStage('reacted');
    }, 1600);
  };

  const handleReset = () => {
    setReactionStage('initial');
  };

  const handleSelectReaction = (id: string) => {
    setSelectedReactionId(id);
    const newRx = REACTIONS.find((r) => r.id === id) || REACTIONS[0];
    setMultiplierA(newRx.reagentA.coeffBase);
    setMultiplierB(newRx.reagentB.coeffBase);
    setReactionStage('initial');
  };

  // Render an individual atomic sphere
  const renderAtomSphere = (symbol: string, sizeClass = 'w-7 h-7 text-xs') => {
    const el = ELEMENTS_DB[symbol] || ELEMENTS_DB['H'];
    if (useDalton1808Symbols) {
      return (
        <div
          className={`${sizeClass} rounded-full ${el.daltonPatternBg} border border-slate-900 shadow-md flex items-center justify-center transition-all duration-300 transform hover:scale-110`}
          title={`Esfera de Dalton (1808): ${el.name}`}
        >
          {el.daltonSymbol1808}
        </div>
      );
    }
    return (
      <div
        className={`${sizeClass} rounded-full ${el.color} shadow-md shadow-black/40 flex items-center justify-center font-bold text-white transition-all duration-300 transform hover:scale-110`}
        title={`Átomo de ${el.name} (${symbol}) - Massa: ${el.massPerAtom}u`}
      >
        {symbol}
      </div>
    );
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-5">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-emerald-400 shrink-0" />
            <h3 className="text-base sm:text-lg font-extrabold text-blue-400">
              Laboratório Epistemológico de Dalton & Lavoisier
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explore a conservação das massas, o rearranjo de esferas atômicas e a Lei das Proporções Definidas de Proust.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 self-start lg:self-auto">
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'lab'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Beaker className="w-3.5 h-3.5" />
            <span>Simulador de Reações</span>
          </button>
          <button
            onClick={() => setActiveTab('proust')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'proust'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Proporções (Proust)</span>
          </button>
          <button
            onClick={() => setActiveTab('postulates')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'postulates'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Postulados de 1808</span>
          </button>
        </div>
      </div>

      {/* Mode Controls & Reaction Picker */}
      <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Beaker className="w-3.5 h-3.5 text-blue-400" />
            Selecione o Experimento Químico:
          </label>

          {/* Historical Notation Toggle & Temperature Slider */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setUseDalton1808Symbols(!useDalton1808Symbols)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${
                useDalton1808Symbols
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Alternar entre símbolos modernos da IUPAC e símbolos alfanuméricos/alquímicos desenhados por John Dalton em 1808"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{useDalton1808Symbols ? 'Símbolos Dalton 1808 (☉ ◯ ●)' : 'Símbolos IUPAC Modernos'}</span>
            </button>

            {/* Temperature State Button */}
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-slate-400 px-1.5 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> Temp:
              </span>
              <button
                onClick={() => setTemperature('cold')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${temperature === 'cold' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
              >
                Frio
              </button>
              <button
                onClick={() => setTemperature('normal')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${temperature === 'normal' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
              >
                25°C
              </button>
              <button
                onClick={() => setTemperature('hot')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${temperature === 'hot' ? 'bg-rose-600 text-white animate-pulse' : 'text-slate-400'}`}
              >
                Chama 🔥
              </button>
            </div>
          </div>
        </div>

        {/* Reaction Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {REACTIONS.map((r) => {
            const isSelected = r.id === selectedReactionId;
            return (
              <button
                key={r.id}
                onClick={() => handleSelectReaction(r.id)}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between min-h-[60px] ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500 text-blue-200 shadow-md shadow-blue-500/10'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-[11px] font-bold leading-tight line-clamp-1">{r.name}</div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">{r.equation}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: MAIN SIMULATION & BALANCE */}
      {activeTab === 'lab' && (
        <div className="space-y-5">
          {/* Reagent Quantity Adjusters (Proust / Stoichiometry Controls) */}
          <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              {/* Reagent A Control */}
              <div className="flex items-center gap-3 bg-slate-900 p-2.5 rounded-xl border border-slate-800 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs font-bold text-slate-300">
                  {currentRx.reagentA.label}:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMultiplierA(Math.max(1, multiplierA - 1))}
                    disabled={reactionStage !== 'initial'}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-sm disabled:opacity-40"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-sm text-blue-400">
                    {multiplierA}x
                  </span>
                  <button
                    onClick={() => setMultiplierA(multiplierA + 1)}
                    disabled={reactionStage !== 'initial'}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-sm disabled:opacity-40"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <span className="text-lg font-bold text-slate-600 hidden sm:inline">+</span>

              {/* Reagent B Control */}
              <div className="flex items-center gap-3 bg-slate-900 p-2.5 rounded-xl border border-slate-800 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs font-bold text-slate-300">
                  {currentRx.reagentB.label}:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMultiplierB(Math.max(1, multiplierB - 1))}
                    disabled={reactionStage !== 'initial'}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-sm disabled:opacity-40"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-sm text-red-400">
                    {multiplierB}x
                  </span>
                  <button
                    onClick={() => setMultiplierB(multiplierB + 1)}
                    disabled={reactionStage !== 'initial'}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-sm disabled:opacity-40"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Excess Warning or Stoichiometry Status */}
            <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 text-xs w-full md:w-auto justify-center">
              {rxSets > 0 ? (
                excessA > 0 || excessB > 0 ? (
                  <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    Reagente em excesso ({excessA > 0 ? `${excessA}x ${currentRx.reagentA.label}` : `${excessB}x ${currentRx.reagentB.label}`})
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    Proporção Estequiométrica Perfeita ({rxSets}x reações completas)!
                  </span>
                )
              ) : (
                <span className="text-red-400 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  Quantidade insuficiente para reageir! Aumente os reagentes.
                </span>
              )}
            </div>
          </div>

          {/* REAL-TIME LAVOISIER BALANCE SCALE (BALANÇA DE DOIS PRATOS) */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner flex flex-col items-center gap-4 relative overflow-hidden">
            <div className="w-full flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-800/80 pb-2">
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-400" />
                Balança de Conservação da Massa de Lavoisier
              </span>
              <span className="font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Δ Massa = {Math.abs(totalReagentMass - totalProductMass)}u (Equilíbrio Zero)
              </span>
            </div>

            {/* Visual Balance Structure */}
            <div className="w-full max-w-2xl py-4 flex flex-col items-center relative">
              {/* Central Pivot & Pillar */}
              <div className="w-4 h-24 bg-gradient-to-b from-slate-700 to-slate-900 border border-slate-600 rounded-t-lg shadow-lg relative z-10 flex flex-col items-center justify-start pt-1">
                <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-md flex items-center justify-center text-[9px] font-black text-slate-950">
                  0
                </div>
              </div>

              {/* Balance Beam (Lever) */}
              <div className="w-full h-3 bg-gradient-to-r from-slate-700 via-emerald-600 to-slate-700 rounded-full border border-slate-600 -mt-20 shadow-md relative z-0 flex items-center justify-between px-4">
                {/* Left Pan Cable */}
                <div className="w-0.5 h-16 bg-slate-500 absolute left-8 top-3 shadow" />
                {/* Right Pan Cable */}
                <div className="w-0.5 h-16 bg-slate-500 absolute right-8 top-3 shadow" />
              </div>

              {/* Two Scale Pans */}
              <div className="w-full flex justify-between px-2 pt-12 relative z-10">
                {/* Left Pan - Reagents */}
                <div className="w-1/2 pr-3 flex flex-col items-center">
                  <div className="w-full bg-slate-900/95 border-2 border-blue-500/50 p-3.5 rounded-2xl shadow-xl flex flex-col items-center gap-2 min-h-[140px] justify-between">
                    <div className="text-[11px] font-extrabold uppercase text-blue-400 tracking-wider">
                      Prato Esquerdo: Reagentes
                    </div>

                    {/* Reagents Atomic Spheres */}
                    <div className="flex flex-wrap items-center justify-center gap-2 my-auto">
                      {Array.from({ length: multiplierA }).map((_, idx) => (
                        <div key={`reagA-${idx}`} className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shadow-sm">
                          {Array.from({ length: currentRx.reagentA.atomsPerMolecule }).map((_, aIdx) => (
                            <React.Fragment key={aIdx}>
                              {renderAtomSphere(currentRx.reagentA.symbol)}
                            </React.Fragment>
                          ))}
                        </div>
                      ))}

                      {multiplierB > 0 && <span className="text-lg font-bold text-slate-500">+</span>}

                      {Array.from({ length: multiplierB }).map((_, idx) => (
                        <div key={`reagB-${idx}`} className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shadow-sm">
                          {Array.from({ length: currentRx.reagentB.atomsPerMolecule }).map((_, bIdx) => (
                            <React.Fragment key={bIdx}>
                              {renderAtomSphere(currentRx.reagentB.symbol)}
                            </React.Fragment>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div className="text-xs font-mono bg-blue-950/80 border border-blue-800 text-blue-300 px-3 py-1 rounded-lg font-bold">
                      Massa Inicial: {totalReagentMass}u
                    </div>
                  </div>
                </div>

                {/* Right Pan - Products */}
                <div className="w-1/2 pl-3 flex flex-col items-center">
                  <div className="w-full bg-slate-900/95 border-2 border-emerald-500/50 p-3.5 rounded-2xl shadow-xl flex flex-col items-center gap-2 min-h-[140px] justify-between">
                    <div className="text-[11px] font-extrabold uppercase text-emerald-400 tracking-wider">
                      Prato Direito: Produtos
                    </div>

                    {/* Products Visual */}
                    <div className="flex flex-wrap items-center justify-center gap-2 my-auto">
                      {reactionStage === 'reacted' ? (
                        <>
                          {/* Produced Molecules A */}
                          {Array.from({ length: rxSets * currentRx.productA.coeffBase }).map((_, idx) => (
                            <div key={`prodA-${idx}`} className="flex items-center gap-0.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shadow-sm">
                              {currentRx.productA.composition.map((comp) =>
                                Array.from({ length: comp.count }).map((_, cIdx) => (
                                  <React.Fragment key={`${comp.symbol}-${cIdx}`}>
                                    {renderAtomSphere(comp.symbol, 'w-6 h-6 text-[10px]')}
                                  </React.Fragment>
                                ))
                              )}
                            </div>
                          ))}

                          {/* Produced Molecules B if present */}
                          {currentRx.productB &&
                            Array.from({ length: rxSets * currentRx.productB.coeffBase }).map((_, idx) => (
                              <div key={`prodB-${idx}`} className="flex items-center gap-0.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shadow-sm">
                                {currentRx.productB!.composition.map((comp) =>
                                  Array.from({ length: comp.count }).map((_, cIdx) => (
                                    <React.Fragment key={`${comp.symbol}-${cIdx}`}>
                                      {renderAtomSphere(comp.symbol, 'w-6 h-6 text-[10px]')}
                                    </React.Fragment>
                                  ))
                                )}
                              </div>
                            ))}

                          {/* Excess Reagent A left over */}
                          {excessA > 0 && (
                            <div className="flex items-center gap-1 bg-amber-950/60 p-1.5 rounded-xl border border-amber-800/80" title="Reagente em Excesso (Sobra sem reagir)">
                              <span className="text-[9px] font-bold text-amber-400">Excesso:</span>
                              {Array.from({ length: excessA * currentRx.reagentA.atomsPerMolecule }).map((_, eIdx) => (
                                <React.Fragment key={`exA-${eIdx}`}>
                                  {renderAtomSphere(currentRx.reagentA.symbol, 'w-5 h-5 text-[9px]')}
                                </React.Fragment>
                              ))}
                            </div>
                          )}

                          {/* Excess Reagent B left over */}
                          {excessB > 0 && (
                            <div className="flex items-center gap-1 bg-amber-950/60 p-1.5 rounded-xl border border-amber-800/80" title="Reagente em Excesso (Sobra sem reagir)">
                              <span className="text-[9px] font-bold text-amber-400">Excesso:</span>
                              {Array.from({ length: excessB * currentRx.reagentB.atomsPerMolecule }).map((_, eIdx) => (
                                <React.Fragment key={`exB-${eIdx}`}>
                                  {renderAtomSphere(currentRx.reagentB.symbol, 'w-5 h-5 text-[9px]')}
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-xs text-slate-500 italic p-3 text-center">
                          {reactionStage === 'mixing' ? (
                            <span className="text-amber-400 font-bold animate-pulse flex items-center justify-center gap-1">
                              <Sparkles className="w-4 h-4" /> Rearranjando esferas atômicas...
                            </span>
                          ) : (
                            'Clique em "Iniciar Reação" abaixo'
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-xs font-mono bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-3 py-1 rounded-lg font-bold">
                      Massa Final: {reactionStage === 'reacted' ? `${totalProductMass}u` : '---'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reaction Trigger Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
              <button
                onClick={handleRunReaction}
                disabled={reactionStage !== 'initial' || rxSets === 0}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 transition shadow-xl ${
                  reactionStage === 'initial' && rxSets > 0
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white cursor-pointer shadow-blue-500/20 scale-105'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                {reactionStage === 'mixing' ? 'Quebrando Ligações...' : 'Iniciar Reação Atômica'}
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reiniciar Reagentes</span>
              </button>
            </div>
          </div>

          {/* Atom Balance & Conservation Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Lei da Conservação das Massas (Lavoisier, 1789)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                "Na natureza nada se cria, nada se perde, tudo se transforma." A soma das massas dos reagentes (
                <strong className="text-blue-300">{totalReagentMass}u</strong>) é rigorosamente igual à soma das massas dos produtos obtidos (
                <strong className="text-emerald-300">{totalProductMass}u</strong>).
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Teoria Atômica de Dalton (1808)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {currentRx.daltonInsight} Os átomos de Dalton são esferas maciças, indivisíveis e de massa invariável para cada elemento químico.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROUST'S LAW & STOICHIOMETRY EXPLORER */}
      {activeTab === 'proust' && (
        <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-bold text-slate-200">
              Lei das Proporções Definidas (Proust, 1799) & Reagente em Excesso
            </h4>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Joseph Louis Proust demonstrou que duas ou mais substâncias ao reagirem para formar um composto o fazem sempre numa proporção em massa constante e definida. Se adicionarmos reagente em excesso, a quantidade excedente não reage!
          </p>

          {/* Interactive Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse border border-slate-800">
              <thead>
                <tr className="bg-slate-900 text-slate-300">
                  <th className="p-3 border border-slate-800">Parâmetro Estequiométrico</th>
                  <th className="p-3 border border-slate-800 text-blue-400">Reagente A ({currentRx.reagentA.label})</th>
                  <th className="p-3 border border-slate-800 text-red-400">Reagente B ({currentRx.reagentB.label})</th>
                  <th className="p-3 border border-slate-800 text-emerald-400">Produtos Formados</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3 font-bold bg-slate-900/50">Proporção Mínima Fixa</td>
                  <td className="p-3">{currentRx.reagentA.coeffBase} molécula(s)</td>
                  <td className="p-3">{currentRx.reagentB.coeffBase} molécula(s)</td>
                  <td className="p-3">{currentRx.productA.coeffBase} x {currentRx.productA.formula}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-slate-900/50">Quantidade no Experimento Atual</td>
                  <td className="p-3 text-blue-300 font-bold">{multiplierA}x moléculas ({getReagentAMass()}u)</td>
                  <td className="p-3 text-red-300 font-bold">{multiplierB}x moléculas ({getReagentBMass()}u)</td>
                  <td className="p-3 text-emerald-300 font-bold">{rxSets * currentRx.productA.coeffBase} x {currentRx.productA.formula} ({getProductAMass()}u)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-slate-900/50">Reagente Limitante / Excesso</td>
                  <td className="p-3">
                    {excessA > 0 ? (
                      <span className="text-amber-400 font-bold">EM EXCESSO (+{excessA} moléc.)</span>
                    ) : (
                      <span className="text-emerald-400 font-bold">Consumido Totalmente</span>
                    )}
                  </td>
                  <td className="p-3">
                    {excessB > 0 ? (
                      <span className="text-amber-400 font-bold">EM EXCESSO (+{excessB} moléc.)</span>
                    ) : (
                      <span className="text-emerald-400 font-bold">Consumido Totalmente</span>
                    )}
                  </td>
                  <td className="p-3 text-amber-300">
                    Sobra sem reagir: {excessA > 0 ? `${excessA}x ${currentRx.reagentA.label}` : excessB > 0 ? `${excessB}x ${currentRx.reagentB.label}` : 'Nenhum (0u)'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-xs text-emerald-300 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            <div>
              <strong>Conclusão Epistemológica:</strong> A lei das proporções definidas de Proust foi a principal evidência experimental utilizada por John Dalton para deduzir que a matéria é composta por esferas indivisíveis de pesos fixos.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DALTON'S 1808 POSTULATES */}
      {activeTab === 'postulates' && (
        <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h4 className="text-sm font-bold text-slate-200">
              Os 4 Postulados Fundamentais da Teoria Atômica de Dalton (1808)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-[10px] text-purple-300">1</span>
                Indivisibilidade e Indestrutibilidade
              </div>
              <p className="text-slate-400 leading-relaxed">
                Toda a matéria é composta por partículas extremamente pequenas e indivisíveis chamadas átomos, que não podem ser criados nem destruídos em transformações químicas.
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-[10px] text-purple-300">2</span>
                Identidade dos Elementos
              </div>
              <p className="text-slate-400 leading-relaxed">
                Todos os átomos de um mesmo elemento químico são idênticos em massa, tamanho e propriedades químicas. Átomos de elementos diferentes possuem massas distintas.
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-[10px] text-purple-300">3</span>
                Combinação em Proporções Inteiras
              </div>
              <p className="text-slate-400 leading-relaxed">
                Os compostos químicos são formados pela união de átomos de diferentes elementos em proporções numéricas fixas e inteiras (ex: 1:1, 2:1, 1:2, 2:3).
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-[10px] text-purple-300">4</span>
                Rearranjo Atômico
              </div>
              <p className="text-slate-400 leading-relaxed">
                Uma reação química consiste apenas na separação, união ou rearranjo de átomos. Os átomos em si permanecem inalterados.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
