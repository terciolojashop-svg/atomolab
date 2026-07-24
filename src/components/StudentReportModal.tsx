import React, { useState } from 'react';
import { X, Printer, FileCheck, Award, BookOpen, CheckCircle2, Atom, User, Download, Upload } from 'lucide-react';
import { ATOMIC_MODELS } from '../data/modelsData';

interface StudentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedModels: string[];
}

export const StudentReportModal: React.FC<StudentReportModalProps> = ({
  isOpen,
  onClose,
  unlockedModels,
}) => {
  const [studentName, setStudentName] = useState<string>('Aluno(a) de Química');
  const [studentNumber, setStudentNumber] = useState<string>('');
  const [gradeClass, setGradeClass] = useState<string>('9º Ano A - Ensino Fundamental');
  const [reflectionText, setReflectionText] = useState<string>(
    'Compreendi que os modelos atômicos não são retratos definitivos da realidade, mas sim construções teóricas que mudam quando novos fatos experimentais (como os raios catódicos ou a emissão de luz) não podem mais ser explicados pelo modelo antigo.'
  );

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const data = {
      aluno: studentName,
      numeroChamada: studentNumber,
      turma: gradeClass,
      dataExportacao: new Date().toISOString(),
      modelosDesbloqueados: unlockedModels,
      maestriaPercentual: Math.round((unlockedModels.length / ATOMIC_MODELS.length) * 100),
      reflexaoSocratica: reflectionText
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    const numPrefix = studentNumber ? `N${studentNumber}_` : '';
    link.setAttribute('download', `Ficha_Campo_${numPrefix}${studentName.replace(/\s+/g, '_')}_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.aluno) setStudentName(parsed.aluno);
          if (parsed.numeroChamada) setStudentNumber(parsed.numeroChamada);
          if (parsed.turma) setGradeClass(parsed.turma);
          if (parsed.reflexaoSocratica) setReflectionText(parsed.reflexaoSocratica);
          alert('Ficha pedagógica do aluno carregada com sucesso!');
        } catch (err) {
          alert('Erro ao importar JSON. Verifique a estrutura do arquivo.');
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  const totalModels = ATOMIC_MODELS.length;
  const unlockedCount = unlockedModels.length;
  const masteryPercent = Math.round((unlockedCount / totalModels) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header - Hidden on print */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                Ficha de Investigação Científica & Caderno de Campo
              </h3>
              <p className="text-xs text-slate-400">
                Relatório pedagógico individual do estudante para entregar ao professor ou compor dados do TCC/Mestrado.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
              title="Salvar Ficha do Aluno em arquivo .JSON"
            >
              <Download className="w-4 h-4" /> Exportar .JSON
            </button>
            <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer">
              <Upload className="w-4 h-4 text-blue-400" /> Carregar
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" /> Imprimir / PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content Container - Printable styling */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-100 bg-slate-950 print:bg-white print:text-black print:p-0">
          {/* Printable Header Banner */}
          <div className="border-b border-slate-800 print:border-black pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-emerald-400 print:text-emerald-700 uppercase tracking-wider">
                ÁtomoLab • Laboratório Virtual Epistemológico de Química
              </div>
              <h2 className="text-xl font-black text-slate-100 print:text-black mt-1">
                Ficha Pedagógica de Investigação dos Modelos Atômicos
              </h2>
              <p className="text-xs text-slate-400 print:text-gray-600 mt-0.5">
                Instrumento de Avaliação Formativa e Coleta de Dados para Pesquisa de Aprendizagem
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-400 print:text-gray-700 block">
                Data: {new Date().toLocaleDateString('pt-BR')}
              </span>
              <span className="text-xs font-bold text-blue-400 print:text-blue-700 font-mono">
                Maestria: {masteryPercent}%
              </span>
            </div>
          </div>

          {/* Student Identifiers Form */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-900 print:bg-gray-100 p-4 rounded-xl border border-slate-800 print:border-gray-300">
            <div className="sm:col-span-6 space-y-1">
              <label className="text-xs font-bold text-slate-400 print:text-gray-700 block">
                Nome Completo do Estudante:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ex: Tércio Vieira Silva"
                className="w-full bg-slate-950 print:bg-white border border-slate-700 print:border-gray-400 rounded-lg p-2 text-xs font-bold text-slate-100 print:text-black focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-400 print:text-gray-700 block">
                Nº Chamada:
              </label>
              <input
                type="text"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                placeholder="Ex: 12"
                className="w-full bg-slate-950 print:bg-white border border-slate-700 print:border-gray-400 rounded-lg p-2 text-xs font-bold text-slate-100 print:text-black focus:outline-none text-center"
              />
            </div>
            <div className="sm:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-400 print:text-gray-700 block">
                Turma / Série:
              </label>
              <input
                type="text"
                value={gradeClass}
                onChange={(e) => setGradeClass(e.target.value)}
                placeholder="Ex: 9º Ano A"
                className="w-full bg-slate-950 print:bg-white border border-slate-700 print:border-gray-400 rounded-lg p-2 text-xs font-bold text-slate-100 print:text-black focus:outline-none"
              />
            </div>
          </div>

          {/* Model Progression Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 print:text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <Atom className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
              1. Status de Progresso nos Modelos Atômicos:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
              {ATOMIC_MODELS.map((m) => {
                const isUnlocked = unlockedModels.includes(m.id);
                return (
                  <div
                    key={m.id}
                    className={`p-3 rounded-xl border flex flex-col justify-between min-h-[80px] ${
                      isUnlocked
                        ? 'bg-slate-900 border-emerald-500/50 print:bg-emerald-50 print:border-emerald-300 print:text-black'
                        : 'bg-slate-950 border-slate-800 text-slate-600 print:bg-gray-100'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-400 print:text-gray-600">{m.year}</span>
                    <span className="font-bold text-slate-100 print:text-black text-xs">{m.scientist}</span>
                    <span className={`text-[10px] font-bold ${isUnlocked ? 'text-emerald-400 print:text-emerald-800' : 'text-slate-600'}`}>
                      {isUnlocked ? '✓ Dominado' : '🔒 Bloqueado'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Epistemological Reflection Notes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 print:text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400 print:text-blue-700" />
              2. Reflexão do Estudante sobre a Natureza da Ciência:
            </h4>
            <p className="text-xs text-slate-400 print:text-gray-600">
              Descreva com suas palavras o que motivou os cientistas a mudarem os modelos atômicos ao longo do tempo:
            </p>
            <textarea
              rows={4}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              className="w-full bg-slate-900 print:bg-gray-50 border border-slate-800 print:border-gray-400 rounded-xl p-3 text-xs text-slate-200 print:text-black focus:outline-none leading-relaxed font-sans"
            />
          </div>

          {/* Teacher Validation Footer */}
          <div className="pt-6 border-t border-slate-800 print:border-black flex justify-between items-end text-xs">
            <div className="space-y-1">
              <div className="w-48 h-0.5 bg-slate-700 print:bg-black mt-8" />
              <div className="text-[11px] text-slate-400 print:text-gray-700 font-bold">Assinatura do Professor / Orientador</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 print:text-gray-500">
                Avaliador Epistemológico ÁtomoLab • Versão TCC/Mestrado
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
