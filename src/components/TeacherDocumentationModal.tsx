import React, { useState } from 'react';
import {
  X,
  BookOpen,
  GraduationCap,
  Award,
  FileText,
  Download,
  Upload,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  Layers,
  Brain,
  FlaskConical,
  Atom,
  Printer,
  Sparkles,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface TeacherDocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportData?: () => void;
  onImportData?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TeacherDocumentationModal: React.FC<TeacherDocumentationModalProps> = ({
  isOpen,
  onClose,
  onExportData,
  onImportData,
}) => {
  const [activeTab, setActiveTab] = useState<'epistemology' | 'bncc' | 'simulations' | 'data' | 'references'>('epistemology');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header - Hidden on print */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  Documentação Científico-Pedagógica & Guia do Professor
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">
                  Versão Didática TCC/Mestrado
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Fundamentação epistemológica, alinhamento BNCC, especificações físicas e referências bibliográficas completas.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" /> Imprimir Documento
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="bg-slate-950 border-b border-slate-800 px-4 pt-2 flex gap-2 overflow-x-auto print:hidden">
          {[
            { id: 'epistemology', label: '1. Epistemologia & Teoria', icon: Brain },
            { id: 'bncc', label: '2. BNCC & Currículo', icon: Award },
            { id: 'simulations', label: '3. Guia dos Simuladores', icon: FlaskConical },
            { id: 'data', label: '4. Importação & Exportação', icon: Download },
            { id: 'references', label: '5. Referências Bibliográficas', icon: Bookmark },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition flex items-center gap-2 border-t border-x whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 border-slate-700 text-blue-400 border-b-slate-900 font-extrabold'
                    : 'bg-slate-950/60 border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-200 bg-slate-900 print:bg-white print:text-black print:p-0">
          
          {/* TAB 1: EPISTEMOLOGY */}
          {activeTab === 'epistemology' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-xl font-bold text-slate-100 print:text-black flex items-center gap-2">
                  <Brain className="w-6 h-6 text-blue-400" />
                  Fundamentação Epistemológica e Teórica do ÁtomoLab
                </h2>
                <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                  A plataforma foi estruturada sobre os pilares da filosofia da ciência e da psicologia da aprendizagem para evitar a visão ingênua de que a ciência progride por mero acúmulo linear de fatos.
                </p>
              </div>

              {/* Bachelard */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 print:bg-gray-50 print:border-gray-300">
                <h3 className="text-sm font-bold text-amber-400 print:text-amber-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  1. Gaston Bachelard (1938) — Obstáculos Epistemológicos & Rupturas
                </h3>
                <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
                  Para Bachelard (<em>A Formação do Espírito Científico</em>), o conhecimento científico não se constrói contra a ignorância, mas <strong>contra um conhecimento anterior</strong> (o senso comum ou um modelo ultrapassado).
                  O estudante traz "obstáculos substancialistas" (ex: achar que o átomo é uma bolinha de gude contínua e maciça). No ÁtomoLab, cada mudança de modelo (de Dalton até Schrödinger) exige provocar uma <strong>anomalia experimental</strong> que desestabiliza a certeza anterior do aluno, forçando uma ruptura epistemológica.
                </p>
              </div>

              {/* Thomas Kuhn */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 print:bg-gray-50 print:border-gray-300">
                <h3 className="text-sm font-bold text-purple-400 print:text-purple-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  2. Thomas Kuhn (1962) — Paradigmas, Anomalias e Revoluções Científicas
                </h3>
                <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
                  Kuhn (<em>A Estrutura das Revoluções Científicas</em>) postula que a ciência transita por períodos de "Ciência Normal" regidos por um paradigma dominante. Quando acumulam-se <strong>anomalias</strong> (fatos experimentais que o paradigma não consegue explicar, como a raia espectral de emissão ou o ricochete das partículas alfa), o paradigma entra em crise, culminando numa <strong>Revolução Científica</strong>. A plataforma simula historicamente as crises dos paradigmas de Dalton, Thomson, Rutherford e Bohr.
                </p>
              </div>

              {/* David Ausubel */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 print:bg-gray-50 print:border-gray-300">
                <h3 className="text-sm font-bold text-emerald-400 print:text-emerald-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  3. David Ausubel (1968) — Aprendizagem Significativa e Ancoragem
                </h3>
                <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
                  Segundo a Teoria da Aprendizagem Significativa, o novo conhecimento deve ancorar-se em conceitos subsunçores pré-existentes na estrutura cognitiva do aprendiz. Ao usar o <em>Tradutor Micro-Macro</em>, o estudante conecta a abstração subatômica invisível (ex: elétron saltando de camada) a fenômenos macroscópicos do seu cotidiano (ex: a luz amarela dos fogos de artifício com sal de Sódio).
                </p>
              </div>

              {/* Richard Hake */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 print:bg-gray-50 print:border-gray-300">
                <h3 className="text-sm font-bold text-blue-400 print:text-blue-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  4. Richard Hake (1998) — Ganho Conceitual Normalizado (g)
                </h3>
                <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
                  A eficácia pedagógica da simulação interativa gamificada é mensurada pela fórmula de Hake:
                  <code className="block my-2 p-2 bg-slate-900 border border-slate-800 font-mono text-center text-emerald-400 rounded">
                    g = (% Pós-Teste - % Pré-Teste) / (100% - % Pré-Teste)
                  </code>
                  Valores de <span className="text-emerald-400 font-bold">g ≥ 0.30</span> indicam engajamento interativo médio a alto, superando metodologias de aulas puramente expositivas convencionais (<span className="text-slate-400 font-bold">g ≈ 0.14</span>).
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: BNCC */}
          {activeTab === 'bncc' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-xl font-bold text-slate-100 print:text-black flex items-center gap-2">
                  <Award className="w-6 h-6 text-emerald-400" />
                  Alinhamento com a BNCC (Base Nacional Comum Curricular)
                </h2>
                <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                  Mapeamento completo das habilidades, competências gerais e objetos de conhecimento do Ensino Fundamental II (9º Ano) e Ensino Médio.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 font-mono text-xs font-bold rounded border border-emerald-800">
                      EF09CI01
                    </span>
                    <span className="text-xs text-slate-400">Ciências da Natureza • 9º Ano</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">Estrutura da Matéria e Modelos Atômicos</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    "Investigar as mudanças de estado físico da matéria e comparar os modelos atômicos propostos por Dalton, Thomson, Rutherford e Bohr para compreender a constituição subatômica e a neutralidade elétrica da matéria."
                  </p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-blue-950 text-blue-400 font-mono text-xs font-bold rounded border border-blue-800">
                      EF09CI03
                    </span>
                    <span className="text-xs text-slate-400">Ciências da Natureza • 9º Ano</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">Lei de Conservação das Massas e Proporções</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    "Identificar os reagentes e produtos de uma reação química e associá-los às leis ponderais (Lavoisier e Proust), fundamentando a hipótese do átomo indivisível de Dalton."
                  </p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-purple-950 text-purple-400 font-mono text-xs font-bold rounded border border-purple-800">
                      EM13CNT201
                    </span>
                    <span className="text-xs text-slate-400">Ensino Médio • Ciências da Natureza</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">Análise Crítica de Modelos e Teorias Científicas</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    "Analisar e discutir modelos, teorias e leis propostos em diferentes épocas e culturas, para avaliar como a ciência se constrói de forma provisória, histórica e sujeita a revisões por evidências experimentais."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SIMULATIONS SPECIFICATIONS */}
          {activeTab === 'simulations' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-xl font-bold text-slate-100 print:text-black flex items-center gap-2">
                  <FlaskConical className="w-6 h-6 text-amber-400" />
                  Guia Técnico dos 5 Simuladores Físico-Químicos
                </h2>
                <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                  Detalhamento dos experimentos históricos replicados na plataforma e suas variáveis operacionais.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* 1. Dalton */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-blue-400 flex items-center justify-between">
                    <span>1. Balança de Lavoisier & Dalton (1803)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Esfera Maciça</span>
                  </h4>
                  <p className="text-slate-300">
                    <strong>Experimento:</strong> Combustão de Metano em sistema fechado estanque.
                  </p>
                  <p className="text-slate-400">
                    <strong>Parâmetros:</strong> Conservação de massa total m_reagentes = m_produtos. Reagrupamento estequiométrico de esferas indivisíveis de hidrogênio, carbono e oxigênio.
                  </p>
                </div>

                {/* 2. Thomson */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-purple-400 flex items-center justify-between">
                    <span>2. Tubo de Crookes & Raios Catódicos (1897)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Pudim de Passas</span>
                  </h4>
                  <p className="text-slate-300">
                    <strong>Experimento:</strong> Feixe de elétrons sob campo elétrico (1 kV a 10 kV) e magnético.
                  </p>
                  <p className="text-slate-400">
                    <strong>Parâmetros:</strong> Razão carga/massa do elétron e/m = 1.758 × 10¹¹ C/kg. Desvio proporcional ao potencial da placa (+).
                  </p>
                </div>

                {/* 3. Rutherford */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-amber-400 flex items-center justify-between">
                    <span>3. Lâmina de Ouro de Rutherford (1911)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Modelo Planetário</span>
                  </h4>
                  <p className="text-slate-300">
                    <strong>Experimento:</strong> Bombardeamento de partículas Alfa (α²⁺) em lâmina de Au (100nm).
                  </p>
                  <p className="text-slate-400">
                    <strong>Parâmetros:</strong> 99,9% passam sem desvio (vácuo atômico). 0,1% ricocheteiam θ &gt; 90° devido à repulsão Coulombiana no núcleo hiperdenso positivo.
                  </p>
                </div>

                {/* 4. Bohr */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-emerald-400 flex items-center justify-between">
                    <span>4. Saltos Quânticos & Espectroscopia (1913)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Órbitas Quantizadas</span>
                  </h4>
                  <p className="text-slate-300">
                    <strong>Experimento:</strong> Teste de chama para Na, Cu, Li e K.
                  </p>
                  <p className="text-slate-400">
                    <strong>Parâmetros:</strong> Absorção de quantum hν e emissão de fótons com comprimentos de onda específicos (ex: Sódio λ = 589nm, Amarelo).
                  </p>
                </div>

                {/* 5. Quantum */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 md:col-span-2">
                  <h4 className="font-bold text-pink-400 flex items-center justify-between">
                    <span>5. Nuvem de Probabilidade & Orbitais de Schrödinger (1926)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Mecânica Quântica</span>
                  </h4>
                  <p className="text-slate-300">
                    <strong>Experimento:</strong> Mapeamento tridimensional de densidade de probabilidade eletrônica |Ψ|².
                  </p>
                  <p className="text-slate-400">
                    <strong>Parâmetros:</strong> Orbitais 1s (esférico), 2p_x, 2p_y (halteres) e 3d (trevo de 4 lóbulos). Princípio da Incerteza de Heisenberg Δx·Δp ≥ ℏ/2.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DATA EXPORT/IMPORT */}
          {activeTab === 'data' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-xl font-bold text-slate-100 print:text-black flex items-center gap-2">
                  <Download className="w-6 h-6 text-purple-400" />
                  Módulo de Exportação & Importação de Dados da Pesquisa
                </h2>
                <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                  Exporte relatórios quantitativos para SPSS, R, Excel ou salve o estado dos alunos para dar prosseguimento na próxima aula.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Export Card */}
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl w-fit">
                    <Download className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">Exportar Dados da Pesquisa (.CSV / .JSON)</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Baixe instantaneamente a tabela com pré/pós teste, ganho de Hake, tempo de imersão e taxa de superação de anomalias para análise estatística no SPSS ou R.
                  </p>
                  <button
                    onClick={onExportData}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Download className="w-4 h-4" /> Baixar Dados de Pesquisa (.CSV)
                  </button>
                </div>

                {/* Import Card */}
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl w-fit">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">Importar Sessão de Aluno (.JSON)</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Carregue um arquivo salvo anteriormente por um aluno para visualizar as respostas do quiz, modelos desbloqueados e nota de reflexão socrática.
                  </p>
                  <label className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border border-slate-700">
                    <Upload className="w-4 h-4 text-blue-400" /> Selecionar Arquivo .JSON
                    <input
                      type="file"
                      accept=".json"
                      onChange={onImportData}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BIBLIOGRAPHIC REFERENCES */}
          {activeTab === 'references' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-xl font-bold text-slate-100 print:text-black flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-amber-400" />
                  Referências Bibliográficas Completas (Norma ABNT NBR 6023)
                </h2>
                <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                  Citações prontas para inclusão na metodologia e referências da sua dissertação de mestrado ou trabalho de conclusão de curso.
                </p>
              </div>

              <div className="space-y-3 text-xs font-sans text-slate-300 print:text-black">
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl leading-relaxed">
                  <strong>BACHELARD, Gaston.</strong> <em>A Formação do Espírito Científico: contribuição para uma psicanálise do conhecimento objetivo.</em> Rio de Janeiro: Contraponto, 1996. ISBN 978-85-85910-09-9.
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl leading-relaxed">
                  <strong>KUHN, Thomas S.</strong> <em>A Estrutura das Revoluções Científicas.</em> 12. ed. São Paulo: Perspectiva, 2013. (Coleção Debates). ISBN 978-85-273-0111-3.
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl leading-relaxed">
                  <strong>AUSUBEL, David P.</strong> <em>The Psychology of Meaningful Verbal Learning.</em> New York: Grune & Stratton, 1963.
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl leading-relaxed">
                  <strong>HAKE, Richard R.</strong> Interactive-engagement versus traditional methods: A six-thousand-student survey of mechanics test data for introductory physics courses. <em>American Journal of Physics</em>, v. 66, n. 1, p. 64-74, 1998. DOI: 10.1119/1.18809.
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl leading-relaxed">
                  <strong>BRASIL. Ministério da Educação.</strong> <em>Base Nacional Comum Curricular (BNCC).</em> Brasília, DF: MEC, 2018. Disponível em: &lt;http://basenacionalcomum.mec.gov.br/&gt;.
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl leading-relaxed">
                  <strong>MORTIMER, Eduardo Fleury; MACHADO, Andréa Horta.</strong> <em>Química para o Ensino Médio.</em> 3. ed. São Paulo: Scipione, 2016. ISBN 978-85-262-9988-7.
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl leading-relaxed">
                  <strong>RUTHERFORD, Ernest.</strong> The Scattering of α and β Particles by Matter and the Structure of the Atom. <em>Philosophical Magazine</em>, Series 6, v. 21, p. 669-688, May 1911.
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl leading-relaxed">
                  <strong>THOMSON, Joseph John.</strong> Cathode Rays. <em>Philosophical Magazine</em>, Series 5, v. 44, p. 293-316, Oct. 1897.
                </div>
              </div>
            </div>
          )}

          {/* Footer Validation Signature */}
          <div className="pt-6 border-t border-slate-800 print:border-black flex justify-between items-end text-xs">
            <div className="space-y-1">
              <div className="w-48 h-0.5 bg-slate-700 print:bg-black mt-4" />
              <div className="text-[11px] text-slate-400 print:text-gray-700 font-bold">Coordenação Pedagógica / Orientador TCC</div>
            </div>
            <div className="text-right text-[10px] text-slate-500">
              <div>ÁtomoLab • Plataforma Virtual de Epistemologia das Ciências</div>
              <div className="text-slate-600 font-mono mt-0.5">2026 - Tércio Informática, Professor Wesclle Johnson</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
