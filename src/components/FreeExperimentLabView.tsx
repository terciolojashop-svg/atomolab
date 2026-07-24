import React, { useState, useEffect } from 'react';
import {
  Beaker,
  Sparkles,
  RefreshCw,
  Play,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap,
  Atom,
  Eye,
  Flame,
  Radio,
  Gauge,
  Activity,
  Plus,
  Trash2,
  Move,
  Info
} from 'lucide-react';

interface ComponentOption {
  id: string;
  name: string;
  modelOrigin: string;
  description: string;
}

const MASS_OPTIONS: ComponentOption[] = [
  { id: 'solid_sphere', name: 'Esfera Maciça Indivisível', modelOrigin: 'Dalton (1803)', description: 'Massa atômica uniforme e contínua, sem vácuo interno.' },
  { id: 'positive_fluid', name: 'Fluido Positivo Difuso', modelOrigin: 'Thomson (1897)', description: 'Massa positiva espalhada suavemente em toda a esfera.' },
  { id: 'dense_nucleus', name: 'Núcleo Central Hiperdenso', modelOrigin: 'Rutherford (1911)', description: '99,9% da massa concentrada num ponto central minúsculo.' },
];

const CHARGE_OPTIONS: ComponentOption[] = [
  { id: 'no_subparticles', name: 'Sem Cargas Subatômicas', modelOrigin: 'Dalton (1803)', description: 'Átomo eletricamente neutro por natureza, sem partes.' },
  { id: 'embedded_electrons', name: 'Elétrons Incrustados (Pudim)', modelOrigin: 'Thomson (1897)', description: 'Cargas negativas fixas imersas no fluido positivo.' },
  { id: 'external_electrosphere', name: 'Eletrosfera Separada Externa', modelOrigin: 'Rutherford/Bohr', description: 'Elétrons negativos em órbita fora do núcleo no vácuo.' },
];

const BEHAVIOR_OPTIONS: ComponentOption[] = [
  { id: 'static_position', name: 'Estático no Ponto Fixo', modelOrigin: 'Dalton/Thomson', description: 'Sem movimento orbital ordenado.' },
  { id: 'classical_orbit', name: 'Órbita Planetária Clássica', modelOrigin: 'Rutherford (1911)', description: 'Trajetória circular simples por atração elétrica.' },
  { id: 'quantized_levels', name: 'Níveis de Energia Quantizados', modelOrigin: 'Bohr (1913)', description: 'Camadas fixas (K,L,M); saltos liberam fótons de luz.' },
  { id: 'wave_cloud', name: 'Nuvem de Probabilidade (Orbital)', modelOrigin: 'Quântico (1926)', description: 'Densidade de probabilidade da função de onda |Ψ|².' },
];

const STIMULUS_OPTIONS: ComponentOption[] = [
  { id: 'alpha_particles', name: 'Canhão de Partículas Alfa (α)', modelOrigin: 'Exp. da Lâmina de Ouro', description: 'Dispara núcleos pesados de Hélio (2p+2n) positivos a alta velocidade.' },
  { id: 'electric_friction', name: 'Raios Catódicos (Alta Voltagem)', modelOrigin: 'Ampola de Crookes', description: 'Feixe de elétrons sob campo elétrico de 5.000 Volts.' },
  { id: 'thermal_heat', name: 'Calor Térmico Extremo (Chama)', modelOrigin: 'Teste de Espectroscopia', description: 'Excita os elétrons injetando energia térmica (fótons).' },
];

interface FlyingParticle {
  id: number;
  type: 'proton' | 'electron' | 'neutron' | 'alpha' | 'photon';
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number; // 0 to 1
  color: string;
  label: string;
}

interface ParticleSpark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

interface TestedHypothesis {
  id: string;
  name: string;
  mass: string;
  charge: string;
  behavior: string;
  stimulus: string;
  score: number;
  verdict: string;
  explanation: string;
  timestamp: string;
}

export const FreeExperimentLabView: React.FC = () => {
  const [selectedMass, setSelectedMass] = useState<ComponentOption>(MASS_OPTIONS[2]); // Dense nucleus
  const [selectedCharge, setSelectedCharge] = useState<ComponentOption>(CHARGE_OPTIONS[2]); // External
  const [selectedBehavior, setSelectedBehavior] = useState<ComponentOption>(BEHAVIOR_OPTIONS[2]); // Quantized
  const [selectedStimulus, setSelectedStimulus] = useState<ComponentOption>(STIMULUS_OPTIONS[0]); // Alpha particles

  // Dynamic particle counts assembled by student
  const [protonsCount, setProtonsCount] = useState<number>(2);
  const [neutronsCount, setNeutronsCount] = useState<number>(2);
  const [electronsCount, setElectronsCount] = useState<number>(2);

  // Animated particles and impact sparks
  const [flyingParticles, setFlyingParticles] = useState<FlyingParticle[]>([]);
  const [impactSparks, setImpactSparks] = useState<ParticleSpark[]>([]);

  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [currentTestResult, setCurrentTestResult] = useState<TestedHypothesis | null>(null);
  const [hypothesisHistory, setHypothesisHistory] = useState<TestedHypothesis[]>([]);
  const [creativityScoreTotal, setCreativityScoreTotal] = useState<number>(0);

  // Simulation animation ticker
  const [animStep, setAnimStep] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      setAnimStep((prev) => (prev + 1) % 100);

      // Update flying particles
      setFlyingParticles((prev) =>
        prev
          .map((p) => {
            const newProgress = p.progress + 0.08;
            if (newProgress >= 1) {
              // Trigger burst sparks upon landing at target
              triggerImpactSparks(p.targetX, p.targetY, p.color);
            }
            return { ...p, progress: newProgress };
          })
          .filter((p) => p.progress < 1)
      );

      // Update impact sparks fading out
      setImpactSparks((prev) =>
        prev
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            opacity: s.opacity - 0.05,
          }))
          .filter((s) => s.opacity > 0)
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const triggerImpactSparks = (x: number, y: number, color: string) => {
    const sparks: ParticleSpark[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = 2 + Math.random() * 4;
      sparks.push({
        id: Date.now() + Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3,
        color,
        opacity: 1,
      });
    }
    setImpactSparks((prev) => [...prev, ...sparks]);
  };

  const handleInjectParticle = (type: 'proton' | 'electron' | 'neutron' | 'alpha' | 'photon', event?: React.MouseEvent) => {
    // Determine start click position or default top dock
    const startX = event ? Math.min(Math.max(event.clientX - 200, 50), 750) : 100;
    const startY = 30;

    let targetX = 400;
    let targetY = 140;
    let color = '#ef4444';
    let label = 'p+';

    if (type === 'proton') {
      setProtonsCount((c) => c + 1);
      color = '#ef4444';
      label = 'p+';
      targetX = 400 + (Math.random() * 20 - 10);
      targetY = 140 + (Math.random() * 20 - 10);
    } else if (type === 'neutron') {
      setNeutronsCount((c) => c + 1);
      color = '#38bdf8';
      label = 'n0';
      targetX = 400 + (Math.random() * 20 - 10);
      targetY = 140 + (Math.random() * 20 - 10);
    } else if (type === 'electron') {
      setElectronsCount((c) => c + 1);
      color = '#c084fc';
      label = 'e-';
      targetX = 400 + (Math.random() * 120 - 60);
      targetY = 140 + (Math.random() * 120 - 60);
    } else if (type === 'alpha') {
      setProtonsCount((c) => c + 2);
      setNeutronsCount((c) => c + 2);
      color = '#fbbf24';
      label = 'α²⁺';
    } else if (type === 'photon') {
      color = '#10b981';
      label = 'γ (fóton)';
    }

    // Add flying animation instance
    setFlyingParticles((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        type,
        startX,
        startY,
        targetX,
        targetY,
        progress: 0,
        color,
        label,
      },
    ]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropParticle = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('particleType') as 'proton' | 'electron' | 'neutron' | 'alpha' | 'photon';
    if (type) {
      handleInjectParticle(type);
    }
  };

  const handleRunHybridExperiment = () => {
    setIsTesting(true);

    setTimeout(() => {
      let score = 50;
      let verdict = '';
      let explanation = '';

      const isDaltonPure = selectedMass.id === 'solid_sphere' && selectedCharge.id === 'no_subparticles';
      const isThomsonPure = selectedMass.id === 'positive_fluid' && selectedCharge.id === 'embedded_electrons';
      const isRutherfordPure = selectedMass.id === 'dense_nucleus' && selectedBehavior.id === 'classical_orbit';
      const isBohrPure = selectedMass.id === 'dense_nucleus' && selectedBehavior.id === 'quantized_levels';
      const isQuantumPure = selectedMass.id === 'dense_nucleus' && selectedBehavior.id === 'wave_cloud';

      if (selectedStimulus.id === 'alpha_particles') {
        if (selectedMass.id === 'solid_sphere') {
          score = 70;
          verdict = 'Anomalia de Ricochete Total!';
          explanation = 'Como a massa é 100% maciça (Dalton), as partículas Alfa pesadas não conseguem atravessar. Elas colidem e ricocheteiam 100% de volta! Isso contradiz a experiência da Lâmina de Ouro, onde a maioria atravessou.';
        } else if (selectedMass.id === 'positive_fluid') {
          score = 75;
          verdict = 'Penetração Direta Sem Desvio Significativo';
          explanation = 'Como a massa positiva é difusa e espalhada (Thomson), as partículas Alfa passam direto sem sofrer repulsão concentrada. Faltou um núcleo denso para explicar os raros desvios violentos (>90°)!';
        } else {
          score = 95;
          verdict = 'Comportamento Rutherfordiano Confirmado!';
          explanation = 'Perfeito! O núcleo hiperdenso concentrado faz com que 99,9% das partículas Alfa atravessem o vácuo da eletrosfera sem tocar em nada, enquanto 0,1% atinge o núcleo e sofre um desvio extremo!';
        }
      } else if (selectedStimulus.id === 'electric_friction') {
        if (selectedCharge.id === 'no_subparticles') {
          score = 65;
          verdict = 'Incapacidade de Explicar Cargas Elétricas';
          explanation = 'Sem partículas negativas subatômicas (Dalton), o átomo não consegue emitir feixe elétrico nem sofrer atração por placas positivas na Ampola de Crookes.';
        } else {
          score = 90;
          verdict = 'Desvio do Feixe por Campo Elétrico Confirmado!';
          explanation = 'A presença de elétrons negativos permite que o feixe seja atraído pela placa positiva (+). Isso prova concretamente a existência da carga elétrica negativa subatômica!';
        }
      } else if (selectedStimulus.id === 'thermal_heat') {
        if (selectedBehavior.id === 'quantized_levels' || selectedBehavior.id === 'wave_cloud') {
          score = 98;
          verdict = 'Emissão Espectral e Saltos Quânticos (Luz Visível)!';
          explanation = 'Fenomenal! Ao receber energia térmica, os elétrons absorvem um "quantum", saltam para uma órbita mais externa (estado excitado) e, ao retornarem, emitem um fóton de luz colorida discreta!';
        } else {
          score = 72;
          verdict = 'Ausência de Níveis Discretos de Luz';
          explanation = 'Como os elétrons são estáticos ou em órbitas contínuas clássicas, o calor não produz linhas de emissão espectral bem definidas (cores puras de fogos de artifício ou lâmpadas neon).';
        }
      }

      const newHypothesis: TestedHypothesis = {
        id: Date.now().toString(),
        name: `Átomo Híbrido ${hypothesisHistory.length + 1}`,
        mass: selectedMass.name,
        charge: selectedCharge.name,
        behavior: selectedBehavior.name,
        stimulus: selectedStimulus.name,
        score,
        verdict,
        explanation,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setCurrentTestResult(newHypothesis);
      setHypothesisHistory((prev) => [newHypothesis, ...prev]);
      setCreativityScoreTotal((prev) => Math.max(prev, score + hypothesisHistory.length * 5));
      setIsTesting(false);
    }, 1500);
  };

  // Derive Isotope values
  const atomicNumberZ = protonsCount;
  const massNumberA = protonsCount + neutronsCount;
  const netChargeQ = protonsCount - electronsCount;

  // Determine Chemical Element Name & Symbol
  const elementSymbols: { [key: number]: { name: string; symbol: string } } = {
    0: { name: 'Nêutron Livre', symbol: 'n⁰' },
    1: { name: 'Hidrogênio', symbol: 'H' },
    2: { name: 'Hélio', symbol: 'He' },
    3: { name: 'Lítio', symbol: 'Li' },
    4: { name: 'Berílio', symbol: 'Be' },
    5: { name: 'Boro', symbol: 'B' },
    6: { name: 'Carbono', symbol: 'C' },
    7: { name: 'Nitrogênio', symbol: 'N' },
    8: { name: 'Oxigênio', symbol: 'O' },
  };

  const currentElement = elementSymbols[atomicNumberZ] || { name: `Elemento Z=${atomicNumberZ}`, symbol: `El-${atomicNumberZ}` };

  const isSolid = selectedMass.id === 'solid_sphere';
  const isFluid = selectedMass.id === 'positive_fluid';
  const isNucleus = selectedMass.id === 'dense_nucleus';

  const isAlpha = selectedStimulus.id === 'alpha_particles';
  const isElectric = selectedStimulus.id === 'electric_friction';
  const isHeat = selectedStimulus.id === 'thermal_heat';

  const transmissionRate = isSolid ? '0%' : isFluid ? '100%' : '99.9%';
  const deflectionAngle = isSolid ? '180° (Ricochete)' : isFluid ? '< 1° (Insignificante)' : '0.1% a > 90° (Colisão Nuclear)';
  const macroscopicEffect = isAlpha
    ? (isSolid ? 'Tela de detecção 100% escura' : 'Brilho de cintilação na tela ZnS')
    : isElectric
    ? 'Feixe luminoso no tubo curvando-se para o anodo (+)'
    : (selectedBehavior.id === 'quantized_levels' ? 'Emissão de Chama Colorida (Luz Espectral)' : 'Aquecimento sem espectro definido');

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-amber-500/20 via-emerald-500/20 to-blue-500/20 border border-amber-500/30 text-amber-400 rounded-xl shrink-0">
            <Beaker className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                Laboratório Sandbox: Experimentos Livres & Animação Interativa de Partículas
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Arraste & Injete Sub-partículas
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Monte um átomo livremente injetando prótons, nêutrons e elétrons para ver o surgimento de novos elementos e testar hipóteses de física quântica.
            </p>
          </div>
        </div>

        {/* Creativity Score Badge */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3 w-full sm:w-auto justify-between shrink-0">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Pontuação de Criatividade</div>
            <div className="text-xl font-black text-amber-400 font-mono">{creativityScoreTotal} pts</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* NEW: INTERACTIVE SUB-PARTICLE DOCK / PALETTE BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-amber-400 flex items-center gap-2 uppercase tracking-wider">
            <Move className="w-4 h-4 text-amber-400 animate-bounce" />
            Bancada de Injeção de Sub-partículas (Arraste ou Clique para Injetar):
          </span>
          <button
            onClick={() => {
              setProtonsCount(0);
              setNeutronsCount(0);
              setElectronsCount(0);
            }}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" /> Limpar Partículas
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Próton */}
          <button
            draggable
            onDragStart={(e) => e.dataTransfer.setData('particleType', 'proton')}
            onClick={(e) => handleInjectParticle('proton', e)}
            className="p-3 bg-red-950/40 border border-red-500/30 hover:border-red-400 rounded-xl text-left transition hover:scale-105 cursor-grab active:cursor-grabbing group shadow-lg shadow-red-950/20"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-red-500 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-red-500/50 group-hover:animate-ping">
                +
              </span>
              <span className="text-[10px] font-mono text-red-400 font-bold">+1 e</span>
            </div>
            <div className="text-xs font-bold text-slate-100 mt-2">Próton (p⁺)</div>
            <div className="text-[9px] text-slate-400">Massa: 1.007 u</div>
          </button>

          {/* Nêutron */}
          <button
            draggable
            onDragStart={(e) => e.dataTransfer.setData('particleType', 'neutron')}
            onClick={(e) => handleInjectParticle('neutron', e)}
            className="p-3 bg-sky-950/40 border border-sky-500/30 hover:border-sky-400 rounded-xl text-left transition hover:scale-105 cursor-grab active:cursor-grabbing group shadow-lg shadow-sky-950/20"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-sky-500 text-slate-950 font-bold flex items-center justify-center text-xs shadow-md shadow-sky-500/50 group-hover:animate-ping">
                0
              </span>
              <span className="text-[10px] font-mono text-sky-400 font-bold">0 e</span>
            </div>
            <div className="text-xs font-bold text-slate-100 mt-2">Nêutron (n⁰)</div>
            <div className="text-[9px] text-slate-400">Massa: 1.008 u</div>
          </button>

          {/* Elétron */}
          <button
            draggable
            onDragStart={(e) => e.dataTransfer.setData('particleType', 'electron')}
            onClick={(e) => handleInjectParticle('electron', e)}
            className="p-3 bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 rounded-xl text-left transition hover:scale-105 cursor-grab active:cursor-grabbing group shadow-lg shadow-purple-950/20"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-purple-400 text-slate-950 font-bold flex items-center justify-center text-xs shadow-md shadow-purple-400/50 group-hover:animate-ping">
                -
              </span>
              <span className="text-[10px] font-mono text-purple-300 font-bold">-1 e</span>
            </div>
            <div className="text-xs font-bold text-slate-100 mt-2">Elétron (e⁻)</div>
            <div className="text-[9px] text-slate-400">Massa: 0.00055 u</div>
          </button>

          {/* Partícula Alfa */}
          <button
            draggable
            onDragStart={(e) => e.dataTransfer.setData('particleType', 'alpha')}
            onClick={(e) => handleInjectParticle('alpha', e)}
            className="p-3 bg-amber-950/40 border border-amber-500/30 hover:border-amber-400 rounded-xl text-left transition hover:scale-105 cursor-grab active:cursor-grabbing group shadow-lg shadow-amber-950/20"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-[10px] shadow-md shadow-amber-500/50 group-hover:animate-ping">
                α²⁺
              </span>
              <span className="text-[10px] font-mono text-amber-300 font-bold">+2 e</span>
            </div>
            <div className="text-xs font-bold text-slate-100 mt-2">Partícula Alfa (α)</div>
            <div className="text-[9px] text-slate-400">2 Prótons + 2 Nêutrons</div>
          </button>

          {/* Fóton de Energia */}
          <button
            draggable
            onDragStart={(e) => e.dataTransfer.setData('particleType', 'photon')}
            onClick={(e) => handleInjectParticle('photon', e)}
            className="p-3 bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 rounded-xl text-left transition hover:scale-105 cursor-grab active:cursor-grabbing group shadow-lg shadow-emerald-950/20"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-emerald-400 text-slate-950 font-bold flex items-center justify-center text-xs shadow-md shadow-emerald-400/50 group-hover:animate-ping">
                γ
              </span>
              <span className="text-[10px] font-mono text-emerald-300 font-bold">h·ν</span>
            </div>
            <div className="text-xs font-bold text-slate-100 mt-2">Fóton de Luz (γ)</div>
            <div className="text-[9px] text-slate-400">Quantum de Energia</div>
          </button>
        </div>
      </div>

      {/* Component Picker Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Mass Structure */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
            1. Formato da Massa:
          </span>
          <div className="space-y-2">
            {MASS_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setSelectedMass(opt);
                  handleInjectParticle('proton');
                }}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition ${
                  selectedMass.id === opt.id
                    ? 'bg-blue-950/80 border-blue-500 text-white font-bold ring-1 ring-blue-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{opt.name}</span>
                  <span className="text-[9px] text-slate-500">{opt.modelOrigin}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal mt-0.5">{opt.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Charges */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
            2. Cargas Subatômicas:
          </span>
          <div className="space-y-2">
            {CHARGE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setSelectedCharge(opt);
                  handleInjectParticle('electron');
                }}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition ${
                  selectedCharge.id === opt.id
                    ? 'bg-purple-950/80 border-purple-500 text-white font-bold ring-1 ring-purple-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{opt.name}</span>
                  <span className="text-[9px] text-slate-500">{opt.modelOrigin}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal mt-0.5">{opt.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Electron Dynamics */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            3. Dinâmica do Elétron:
          </span>
          <div className="space-y-2">
            {BEHAVIOR_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setSelectedBehavior(opt);
                  handleInjectParticle('electron');
                }}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition ${
                  selectedBehavior.id === opt.id
                    ? 'bg-emerald-950/80 border-emerald-500 text-white font-bold ring-1 ring-emerald-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{opt.name}</span>
                  <span className="text-[9px] text-slate-500">{opt.modelOrigin}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal mt-0.5">{opt.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Applied Stimulus */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            4. Estímulo Experimental Aplicado:
          </span>
          <div className="space-y-2">
            {STIMULUS_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setSelectedStimulus(opt);
                  handleInjectParticle('photon');
                }}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition ${
                  selectedStimulus.id === opt.id
                    ? 'bg-amber-950/80 border-amber-500 text-white font-bold ring-1 ring-amber-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{opt.name}</span>
                  <span className="text-[9px] text-slate-500">{opt.modelOrigin}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal mt-0.5">{opt.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Simulation Stage SVG Chamber with Drag/Drop Area */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              Câmara de Simulação Subatômica Interativa
            </h3>
            <p className="text-xs text-slate-400">
              Solte sub-partículas diretamente na área abaixo para montar o núcleo e a eletrosfera.
            </p>
          </div>

          {/* Live Assembled Element Badge */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            <span className="text-lg font-black text-emerald-400 font-mono">
              {currentElement.symbol}
            </span>
            <div className="text-[10px]">
              <div className="font-bold text-slate-200">{currentElement.name}</div>
              <div className="text-slate-400 font-mono">
                Z={atomicNumberZ} | A={massNumberA} | Q={netChargeQ >= 0 ? `+${netChargeQ}` : netChargeQ}
              </div>
            </div>
          </div>

          <button
            onClick={handleRunHybridExperiment}
            disabled={isTesting}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-lg flex items-center gap-2 shrink-0"
          >
            {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {isTesting ? 'Bombardeando Átomo Híbrido...' : 'Disparar Experimento e Medir Impacto'}
          </button>
        </div>

        {/* High Precision SVG Interactive Graphic Simulation Canvas (Drag Target) */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDropParticle}
          className="bg-slate-950 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 transition rounded-2xl p-4 relative overflow-hidden min-h-[320px] flex flex-col justify-between"
        >
          <svg className="w-full h-[280px]" viewBox="0 0 800 280">
            {/* Background Grid Lines */}
            <defs>
              <pattern id="sandboxGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" opacity="0.4" />
              </pattern>
              <radialGradient id="atomicGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="800" height="280" fill="url(#sandboxGrid)" />

            {/* Drop Zone Watermark Label */}
            <text x="400" y="25" fill="#475569" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
              [ ÁREA DE SOLTURA DE SUB-PARTÍCULAS ]
            </text>

            {/* 1. LEFT STIMULUS EMITTER DEVICE */}
            <g transform="translate(40, 100)">
              <rect x="0" y="0" width="90" height="80" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <rect x="10" y="10" width="70" height="20" rx="4" fill="#0f172a" />
              <text x="45" y="24" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {isAlpha ? 'POLÔNIO α' : isElectric ? 'CATODO -' : 'FONTE TÉRMA'}
              </text>
              <rect x="90" y="25" width="30" height="30" fill="#475569" stroke="#64748b" strokeWidth="1.5" />
              <circle cx="45" cy="55" r="8" fill={isTesting ? '#10b981' : '#f59e0b'} className={isTesting ? 'animate-ping' : ''} />
            </g>

            {/* 2. FLYING PARTICLES IN TRANSIT ANIMATION */}
            {flyingParticles.map((fp) => {
              const currentX = fp.startX + (fp.targetX - fp.startX) * fp.progress;
              const currentY = fp.startY + (fp.targetY - fp.startY) * fp.progress;
              return (
                <g key={fp.id}>
                  {/* Glowing Trail line */}
                  <line x1={fp.startX} y1={fp.startY} x2={currentX} y2={currentY} stroke={fp.color} strokeWidth="2" opacity="0.6" strokeDasharray="3,3" />
                  {/* Moving Particle Sphere */}
                  <circle cx={currentX} cy={currentY} r="7" fill={fp.color} filter="drop-shadow(0 0 8px currentColor)" />
                  <text x={currentX} y={currentY + 3} fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle">
                    {fp.label}
                  </text>
                </g>
              );
            })}

            {/* 3. IMPACT SPARKS BURST EFFECT */}
            {impactSparks.map((spark) => (
              <circle key={spark.id} cx={spark.x} cy={spark.y} r={spark.size} fill={spark.color} opacity={spark.opacity} />
            ))}

            {/* 4. STIMULUS BEAM ANIMATION (Left to Center x=400) */}
            {isTesting && (
              <>
                {isAlpha && (
                  <>
                    <circle cx={160 + (animStep * 2.2) % 220} cy="140" r="5" fill="#fbbf24" filter="drop-shadow(0 0 6px #f59e0b)" />
                    <circle cx={120 + (animStep * 2.2) % 220} cy="130" r="5" fill="#fbbf24" filter="drop-shadow(0 0 6px #f59e0b)" />
                    <circle cx={140 + (animStep * 2.2) % 220} cy="150" r="5" fill="#fbbf24" filter="drop-shadow(0 0 6px #f59e0b)" />
                    <text x="220" y="115" fill="#fbbf24" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                      Partículas Alfa (2p+2n) → 15.000 km/s
                    </text>
                  </>
                )}

                {isElectric && (
                  <>
                    <line x1="120" y1="140" x2="380" y2="140" stroke="#34d399" strokeWidth="6" strokeDasharray="8,4" className="animate-pulse" />
                    <text x="210" y="115" fill="#34d399" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                      Feixe de Elétrons (Raios Catódicos)
                    </text>
                  </>
                )}

                {isHeat && (
                  <>
                    <path d={`M 380 230 Q 390 ${190 - (animStep % 20)} 400 150`} fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="4,4" />
                    <path d={`M 420 230 Q 410 ${190 - (animStep % 20)} 400 150`} fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4,4" />
                    <text x="360" y="260" fill="#f59e0b" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                      🔥 Calor Térmico (Fótons Incidentes)
                    </text>
                  </>
                )}
              </>
            )}

            {/* 5. CENTER TARGET ATOM STRUCTURE (X=400, Y=140) */}
            <g transform="translate(400, 140)">
              {/* Solid Sphere (Dalton) */}
              {isSolid && (
                <>
                  <circle cx="0" cy="0" r="65" fill="#2563eb" fillOpacity="0.85" stroke="#60a5fa" strokeWidth="3" />
                  <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Massa Maciça ({protonsCount + neutronsCount}u)
                  </text>
                </>
              )}

              {/* Positive Fluid (Thomson) */}
              {isFluid && (
                <>
                  <circle cx="0" cy="0" r="75" fill="#9333ea" fillOpacity="0.3" stroke="#c084fc" strokeWidth="2" strokeDasharray="4,2" />
                  <text x="0" y="-55" fill="#c084fc" fontSize="10" textAnchor="middle">
                    Fluido Positivo Difuso
                  </text>
                  {/* Render assembled electrons inside fluid */}
                  {Array.from({ length: Math.max(electronsCount, 2) }).map((_, i) => {
                    const angle = (Math.PI * 2 * i) / Math.max(electronsCount, 2);
                    const r = 35;
                    const ex = Math.cos(angle) * r;
                    const ey = Math.sin(angle) * r;
                    return (
                      <g key={i}>
                        <circle cx={ex} cy={ey} r="6" fill="#facc15" />
                        <text x={ex} y={ey + 3} fill="#000" fontSize="9" textAnchor="middle" fontWeight="bold">-</text>
                      </g>
                    );
                  })}
                </>
              )}

              {/* Dense Nucleus (Rutherford / Bohr / Quantum) */}
              {isNucleus && (
                <>
                  {/* Orbit boundary */}
                  <circle cx="0" cy="0" r="85" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />

                  {/* Concentric Bohr Rings */}
                  {selectedBehavior.id === 'quantized_levels' && (
                    <>
                      <circle cx="0" cy="0" r="35" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.6" />
                      <circle cx="0" cy="0" r="65" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.8" />
                      <circle cx="0" cy="0" r="85" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.9" />

                      {/* Orbiting assembled electrons */}
                      {Array.from({ length: Math.max(electronsCount, 1) }).map((_, i) => {
                        const radius = i % 2 === 0 ? 35 : 65;
                        const angle = (animStep * 0.05) + (i * Math.PI) / 2;
                        const ex = Math.cos(angle) * radius;
                        const ey = Math.sin(angle) * radius;
                        return (
                          <circle key={i} cx={ex} cy={ey} r="5" fill="#34d399" filter="drop-shadow(0 0 6px #34d399)" />
                        );
                      })}
                    </>
                  )}

                  {/* Quantum Probability Cloud */}
                  {selectedBehavior.id === 'wave_cloud' && (
                    <circle cx="0" cy="0" r="80" fill="url(#atomicGlow)" />
                  )}

                  {/* Assembled Central Nucleus Cluster (Protons + Neutrons) */}
                  <g>
                    {/* Render Protons as red spheres */}
                    {Array.from({ length: Math.max(protonsCount, 1) }).map((_, i) => {
                      const ox = (i % 3) * 6 - 6;
                      const oy = Math.floor(i / 3) * 6 - 6;
                      return (
                        <circle key={`p-${i}`} cx={ox} cy={oy} r="7" fill="#ef4444" stroke="#f59e0b" strokeWidth="1.5" />
                      );
                    })}
                    {/* Render Neutrons as blue spheres */}
                    {Array.from({ length: neutronsCount }).map((_, i) => {
                      const ox = (i % 3) * 6 - 3;
                      const oy = Math.floor(i / 3) * 6 + 3;
                      return (
                        <circle key={`n-${i}`} cx={ox} cy={oy} r="6.5" fill="#38bdf8" stroke="#1e293b" strokeWidth="1" />
                      );
                    })}
                  </g>
                </>
              )}
            </g>

            {/* 6. REACTION TRAJECTORY AFTER IMPACT */}
            {isTesting && (
              <>
                {isSolid && isAlpha && (
                  <path d="M 335 140 Q 250 80 100 60" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,3" className="animate-pulse">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.8s" repeatCount="indefinite" />
                  </path>
                )}

                {isFluid && isAlpha && (
                  <line x1="400" y1="140" x2="720" y2="140" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4,4" />
                )}

                {isNucleus && isAlpha && (
                  <>
                    <line x1="400" y1="140" x2="720" y2="140" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
                    <path d="M 400 140 L 680 30" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4,2" />
                    <circle cx="680" cy="30" r="8" fill="#f59e0b" className="animate-ping" />
                  </>
                )}

                {isHeat && (selectedBehavior.id === 'quantized_levels' || selectedBehavior.id === 'wave_cloud') && (
                  <g transform="translate(465, 100)">
                    <path d="M 0 0 Q 20 -20 40 0 T 80 0" fill="none" stroke="#10b981" strokeWidth="3" />
                    <text x="90" y="4" fill="#10b981" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                      Fóton de Luz Emitido (λ = 520nm Verde)
                    </text>
                  </g>
                )}
              </>
            )}

            {/* 7. RIGHT PHOSPHOR DETECTOR SCREEN ARRAY */}
            <path d="M 720 30 C 750 100, 750 180, 720 250" fill="none" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
            <path d="M 720 30 C 750 100, 750 180, 720 250" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" opacity="0.6" />
            <text x="740" y="145" fill="#64748b" fontSize="9" fontFamily="sans-serif" writingMode="tb" textAnchor="middle">
              TELA DETECTORA (ZnS)
            </text>
          </svg>

          {/* Subatomic Live Gauges & Meter Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center gap-3">
              <Gauge className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Taxa de Transmissão:</span>
                <span className="text-sm font-mono font-bold text-blue-300">{transmissionRate}</span>
              </div>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center gap-3">
              <Activity className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Ângulo de Espalhamento θ:</span>
                <span className="text-xs font-mono font-bold text-amber-300">{deflectionAngle}</span>
              </div>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center gap-3">
              <Eye className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Efeito Macroscópico Visível:</span>
                <span className="text-[11px] font-bold text-emerald-300 truncate max-w-[180px] block" title={macroscopicEffect}>
                  {macroscopicEffect}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Test Result Verdict Box */}
        {currentTestResult && (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Veredito Epistemológico do Átomo Híbrido:
              </span>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                Criatividade: {currentTestResult.score} pts
              </span>
            </div>
            <h4 className="text-sm font-bold text-emerald-400">{currentTestResult.verdict}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{currentTestResult.explanation}</p>
          </div>
        )}
      </div>

      {/* History of Tested Hypotheses */}
      {hypothesisHistory.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Histórico de Hipóteses Criativas Testadas ({hypothesisHistory.length}):
          </h3>
          <div className="space-y-2">
            {hypothesisHistory.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="font-bold text-slate-200 flex items-center gap-2">
                    <span>{item.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({item.timestamp})</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {item.mass} • {item.charge} • {item.behavior} • <span className="text-amber-400 font-bold">{item.stimulus}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-amber-950/80 text-amber-300 border border-amber-800/80 rounded-lg font-mono font-bold text-xs shrink-0 self-start sm:self-center">
                  +{item.score} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
