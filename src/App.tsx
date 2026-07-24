import React, { useState } from 'react';
import { ATOMIC_MODELS } from './data/modelsData';
import { AtomicModel } from './types';
import { DaltonSim } from './components/simulations/DaltonSim';
import { ThomsonSim } from './components/simulations/ThomsonSim';
import { RutherfordSim } from './components/simulations/RutherfordSim';
import { BohrSim } from './components/simulations/BohrSim';
import { QuantumSim } from './components/simulations/QuantumSim';
import { AnomaliesView } from './components/AnomaliesView';
import { MicroMacroView } from './components/MicroMacroView';
import { QuizView } from './components/QuizView';
import { ResearchAnalyticsView } from './components/ResearchAnalyticsView';
import { FreeExperimentLabView } from './components/FreeExperimentLabView';
import { AiTutorModal } from './components/AiTutorModal';
import { ModelComparisonModal } from './components/ModelComparisonModal';
import { BadgesModal } from './components/BadgesModal';
import { StudentReportModal } from './components/StudentReportModal';
import { PlatformGuideModal } from './components/PlatformGuideModal';
import { TeacherControlModal, TeacherSettings } from './components/TeacherControlModal';
import { TeacherDocumentationModal } from './components/TeacherDocumentationModal';
import { ModelDuelModal } from './components/ModelDuelModal';
import {
  Atom,
  FlaskConical,
  ShieldAlert,
  ArrowLeftRight,
  HelpCircle,
  BarChart3,
  Bot,
  Lock,
  Unlock,
  Sparkles,
  BookOpen,
  Award,
  ArrowRightLeft,
  Trophy,
  FileCheck,
  Compass,
  Sliders,
  Beaker,
  GraduationCap,
  Swords
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulations' | 'anomalies' | 'micromacro' | 'quiz' | 'analytics' | 'freelab' | 'duel'>('simulations');
  const [selectedModel, setSelectedModel] = useState<AtomicModel>(ATOMIC_MODELS[0]);
  const [unlockedModels, setUnlockedModels] = useState<string[]>(['dalton', 'thomson']);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState<boolean>(false);
  const [isDuelOpen, setIsDuelOpen] = useState<boolean>(false);

  // Teacher Controls State
  const [teacherSettings, setTeacherSettings] = useState<TeacherSettings>({
    progressionMode: 'socratic',
    crookesVoltage: 5,
    goldFoilThickness: 100,
    tutorMode: 'socratic_strict',
    showConceptualHints: true,
  });

  // Model mastery details for each atomic model
  const modelMasteryMap: Record<string, { percent: number; competence: string; color: string }> = {
    dalton: { percent: unlockedModels.includes('dalton') ? 100 : 0, competence: 'Conservação de Massa & Átomos Maciços', color: 'bg-blue-500' },
    thomson: { percent: unlockedModels.includes('thomson') ? 100 : 0, competence: 'Natureza Elétrica & Elétrons', color: 'bg-purple-500' },
    rutherford: { percent: unlockedModels.includes('rutherford') ? 100 : 0, competence: 'Núcleo Denso & Espaço Vazio', color: 'bg-amber-500' },
    bohr: { percent: unlockedModels.includes('bohr') ? 100 : 0, competence: 'Quantização de Energia & Saltos', color: 'bg-emerald-500' },
    quantum: { percent: unlockedModels.includes('quantum') ? 100 : 0, competence: 'Nuvem Eletrônica & Orbitais', color: 'bg-pink-500' },
  };

  const totalMastery = Math.round(
    Object.values(modelMasteryMap).reduce((acc, m) => acc + m.percent, 0) / ATOMIC_MODELS.length
  );

  const handleUnlockNextModel = (nextModelId: 'thomson' | 'rutherford' | 'bohr' | 'quantum') => {
    if (!unlockedModels.includes(nextModelId)) {
      setUnlockedModels((prev) => [...prev, nextModelId]);
    }
  };

  const renderActiveSimulation = () => {
    switch (selectedModel.id) {
      case 'dalton':
        return <DaltonSim />;
      case 'thomson':
        return <ThomsonSim />;
      case 'rutherford':
        return <RutherfordSim />;
      case 'bohr':
        return <BohrSim />;
      case 'quantum':
        return <QuantumSim />;
      default:
        return <DaltonSim />;
    }
  };

  const handleUnlockAllModels = () => {
    setUnlockedModels(['dalton', 'thomson', 'rutherford', 'bohr', 'quantum']);
  };

  const handleResetProgression = () => {
    setUnlockedModels(['dalton', 'thomson']);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Logo & Branding Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-emerald-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
              <Atom className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  ÁtomoLab Gamificado
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  TCC & Mestrado
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Epistemologia Histórica e Aprendizagem Gamificada de Química (9º Ano)
              </p>
            </div>
          </div>

          {/* Action Header Buttons - Responsive Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto py-1 no-scrollbar justify-start md:justify-end -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* Duelo de Modelos Button */}
            <button
              onClick={() => setIsDuelOpen(true)}
              className="px-3 py-2 bg-gradient-to-r from-red-600/20 via-amber-600/20 to-blue-600/20 hover:from-red-600/30 hover:to-blue-600/30 border border-red-500/40 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm shrink-0 whitespace-nowrap"
              title="Duelo Competitivo de Modelos Atômicos"
            >
              <Swords className="w-4 h-4 text-red-400 animate-pulse" />
              <span>Duelo</span>
            </button>

            {/* Guide Pathway Button */}
            <button
              onClick={() => setIsGuideOpen(true)}
              className="px-2.5 py-2 sm:px-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm shrink-0 whitespace-nowrap"
              title="Guia do Caminho Pedagógico"
            >
              <Compass className="w-4 h-4 text-emerald-400 animate-spin-slow" />
              <span className="hidden sm:inline">Guia</span>
            </button>

            {/* Teacher Control Panel Button */}
            <button
              onClick={() => setIsTeacherModalOpen(true)}
              className="px-2.5 py-2 sm:px-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 whitespace-nowrap"
              title="Modo Professor e Ajuste de Impacto"
            >
              <Sliders className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Professor</span>
            </button>

            {/* Scientific Documentation Button */}
            <button
              onClick={() => setIsDocModalOpen(true)}
              className="px-2.5 py-2 sm:px-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 whitespace-nowrap"
              title="Documentação Epistemológica e Bibliografia para o Professor"
            >
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span className="hidden md:inline">Doc</span>
            </button>

            {/* Badges Button */}
            <button
              onClick={() => setIsBadgesOpen(true)}
              className="px-2.5 py-2 sm:px-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 whitespace-nowrap"
              title="Ver Badges Conquistados"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Badges</span>
              <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {unlockedModels.length}
              </span>
            </button>

            {/* Comparison Tool Button */}
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="px-2.5 py-2 sm:px-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 whitespace-nowrap"
              title="Comparar Modelos Lado a Lado"
            >
              <ArrowRightLeft className="w-4 h-4 text-blue-400" />
              <span className="hidden lg:inline">Comparar</span>
            </button>

            {/* Ficha de Campo Button */}
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-2.5 py-2 sm:px-3 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 whitespace-nowrap"
              title="Ficha Pedagógica de Campo"
            >
              <FileCheck className="w-4 h-4 text-purple-400" />
              <span className="hidden lg:inline">Ficha</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md shrink-0 whitespace-nowrap"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Tutor IA</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Primary View Switcher Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2 overflow-x-auto py-2.5 text-xs font-bold border-t border-slate-800/80 no-scrollbar">
          {[
            { id: 'simulations', label: '1. Simuladores Históricos', icon: FlaskConical },
            { id: 'anomalies', label: '2. Rupturas Epistemológicas', icon: ShieldAlert },
            { id: 'micromacro', label: '3. Tradutor Micro-Macro', icon: ArrowLeftRight },
            { id: 'quiz', label: '4. Avaliação Diagnóstica', icon: HelpCircle },
            { id: 'analytics', label: '5. Painel do Pesquisador (TCC)', icon: BarChart3 },
            { id: 'freelab', label: '6. Experimentos Livres', icon: Beaker },
            { id: 'duel', label: '7. Duelo de Modelos', icon: Swords },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (tab.id === 'duel') setIsDuelOpen(true);
                }}
                className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Onboarding Pathway Guidance Banner */}
        <div className="p-4 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-blue-950/40 border border-emerald-800/40 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Caminho Guiado de Aprendizagem Epistemológica
                </span>
                {teacherSettings.progressionMode === 'unlocked' && (
                  <span className="text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded-md">
                    Modo Professor Ativo (Livre)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Como Funciona a Plataforma?</strong> Siga os 4 passos: <strong>1.</strong> Explore os Simuladores → <strong>2.</strong> Provoque Rupturas nas Anomalias → <strong>3.</strong> Traduza do Micro ao Macro → <strong>4.</strong> Responda ao Quiz & Gere a Ficha de Campo.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs transition"
            >
              Ver Guia Passo a Passo
            </button>
            <button
              onClick={() => setIsTeacherModalOpen(true)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 font-bold rounded-xl text-xs transition"
            >
              Ajustar Modo Professor
            </button>
          </div>
        </div>

        {activeTab === 'simulations' && (
          <div className="space-y-6">
            {/* Timeline Model Switcher */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Linha do Tempo Epistemológica dos Modelos Atômicos:</span>
                <span className="text-[11px] text-emerald-400">
                  {unlockedModels.length} de {ATOMIC_MODELS.length} Modelos Liberados
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {ATOMIC_MODELS.map((model) => {
                  const isUnlocked = unlockedModels.includes(model.id);
                  const isSelected = selectedModel.id === model.id;

                  return (
                    <button
                      key={model.id}
                      disabled={!isUnlocked}
                      onClick={() => setSelectedModel(model)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between h-24 ${
                        isSelected
                          ? 'bg-slate-800 border-emerald-500 text-white shadow-lg'
                          : isUnlocked
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/50'
                          : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {model.year}
                        </span>
                        {isUnlocked ? (
                          <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-slate-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold truncate">{model.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{model.popularName}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Visual Mastery Progress Bar Below Timeline */}
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-bold text-slate-200">
                      Nível de Maestria por Modelo Atômico Desbloqueado:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Progresso Geral:</span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-md">
                      {totalMastery}%
                    </span>
                  </div>
                </div>

                {/* Overall Master Progress Bar */}
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 via-amber-500 via-emerald-500 to-pink-500 transition-all duration-700 shadow-sm shadow-emerald-500/20"
                    style={{ width: `${totalMastery}%` }}
                  />
                </div>

                {/* Individual Model Mastery Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
                  {ATOMIC_MODELS.map((model) => {
                    const isUnlocked = unlockedModels.includes(model.id);
                    const isSelected = selectedModel.id === model.id;
                    const masteryInfo = modelMasteryMap[model.id] || { percent: 0, competence: '', color: 'bg-slate-700' };

                    return (
                      <div
                        key={model.id}
                        className={`p-2.5 rounded-xl border transition space-y-1.5 ${
                          isSelected
                            ? 'bg-slate-950 border-emerald-500/80 ring-1 ring-emerald-500/30 shadow-md'
                            : isUnlocked
                            ? 'bg-slate-950/60 border-slate-800/80'
                            : 'bg-slate-950/20 border-slate-900 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-300 truncate pr-1">
                            {model.name.replace('Modelo de ', '')}
                          </span>
                          <span className={`font-mono font-bold text-[10px] shrink-0 ${isUnlocked ? 'text-emerald-400' : 'text-slate-600'}`}>
                            {masteryInfo.percent}%
                          </span>
                        </div>

                        {/* Individual progress bar track */}
                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${masteryInfo.color}`}
                            style={{ width: `${masteryInfo.percent}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[9px] text-slate-400">
                          <span className="truncate text-slate-500" title={masteryInfo.competence}>
                            {masteryInfo.competence}
                          </span>
                          {isUnlocked ? (
                            <span className="text-emerald-400 font-bold shrink-0 ml-1">Dominado</span>
                          ) : (
                            <span className="text-slate-600 shrink-0 ml-1">Bloqueado</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Model Detailed Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Interactive Simulation Stage */}
              <div className="lg:col-span-8 space-y-6">
                {renderActiveSimulation()}

                {/* Epistemological Concept Card */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-base font-bold text-slate-100">
                        Fundamentação do {selectedModel.name} ({selectedModel.scientist}, {selectedModel.year})
                      </h3>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg">
                      {selectedModel.popularName}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="font-bold text-slate-400 uppercase text-[10px]">Conceito Central</div>
                      <p className="text-slate-300 leading-relaxed">{selectedModel.concept}</p>
                    </div>

                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="font-bold text-emerald-400 uppercase text-[10px]">Avanço Científico Key</div>
                      <p className="text-slate-300 leading-relaxed">{selectedModel.keyDiscovery}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl text-xs space-y-1">
                    <div className="font-bold text-amber-400 uppercase text-[10px]">
                      Obstáculo Epistemológico A Ser Superado (Bachelard):
                    </div>
                    <p className="text-amber-200/90 leading-relaxed">
                      {selectedModel.epistemologicalObstacle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Model Limitations & Analogies */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h4 className="text-sm font-bold text-slate-100 border-b border-slate-800 pb-2">
                    Analogia Macroscópica
                  </h4>
                  <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
                    "{selectedModel.macroscopicAnalogy}"
                  </p>

                  <h4 className="text-sm font-bold text-slate-100 border-b border-slate-800 pb-2 pt-2">
                    Limitações do Modelo (Incentivo à Ruptura)
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedModel.limitations.map((lim, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'anomalies' && (
          <AnomaliesView
            unlockedModels={unlockedModels}
            onUnlockNextModel={handleUnlockNextModel}
          />
        )}

        {activeTab === 'micromacro' && <MicroMacroView />}

        {activeTab === 'quiz' && <QuizView />}

        {activeTab === 'analytics' && <ResearchAnalyticsView />}

        {activeTab === 'freelab' && <FreeExperimentLabView />}

        {activeTab === 'duel' && (
          <div className="p-8 bg-gradient-to-br from-slate-900 via-red-950/20 to-slate-900 border border-slate-800 rounded-2xl text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto shadow-lg shadow-red-500/10">
              <Swords className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-xl font-black text-slate-100">Duelo de Modelos Atômicos</h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              Modo competitivo onde dois estudantes ou um estudante contra a IA testam qual modelo atômico possui maior poder explicativo contra anomalias históricas reais!
            </p>
            <button
              onClick={() => setIsDuelOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs transition shadow-xl shadow-red-600/20"
            >
              Abrir Arena do Duelo
            </button>
          </div>
        )}
      </main>

      {/* Subtle Project Footer with Credits */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-400">ÁtomoLab Gamificado</span>
            <span className="text-slate-600 hidden sm:inline">• Epistemologia das Ciências</span>
          </div>
          <div className="text-[11px] font-mono text-slate-600">
            2026 - Tércio Informática, Professor Wesclle Johnson
          </div>
        </div>
      </footer>

      {/* AI Tutor Modal */}
      <AiTutorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        activeModelName={selectedModel.name}
      />

      {/* Side-by-Side Model Comparison Modal */}
      <ModelComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

      {/* Gamified Badges Modal */}
      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        unlockedModels={unlockedModels}
      />

      {/* Student Field Notebook & Report Modal */}
      <StudentReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        unlockedModels={unlockedModels}
      />

      {/* Platform Onboarding Guide Modal */}
      <PlatformGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Teacher Control & Parameter Impact Modal */}
      <TeacherControlModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        settings={teacherSettings}
        onUpdateSettings={(newSettings) => setTeacherSettings((prev) => ({ ...prev, ...newSettings }))}
        onUnlockAllModels={handleUnlockAllModels}
        onResetProgression={handleResetProgression}
      />

      {/* Teacher Documentation & Scientific Reference Modal */}
      <TeacherDocumentationModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
      />

      {/* Model Duel Gamified Competition Modal */}
      <ModelDuelModal
        isOpen={isDuelOpen}
        onClose={() => setIsDuelOpen(false)}
      />
    </div>
  );
}
