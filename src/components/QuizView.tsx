import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/modelsData';
import { QuizQuestion } from '../types';
import { HelpCircle, CheckCircle, XCircle, RefreshCw, Award } from 'lucide-react';

export const QuizView: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const question: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);
    setAnswers((prev) => ({ ...prev, [question.id]: selectedOption }));
    if (selectedOption === question.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setAnswers({});
  };

  const isCompleted = currentQuestionIndex === QUIZ_QUESTIONS.length - 1 && isSubmitted;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Avaliação Formativa e Diagnóstica</h2>
            <p className="text-xs text-slate-400">
              Questões focadas na desconstrução de concepções alternativas e fixação de conceitos científicos.
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Pontuação Atual</div>
          <div className="text-lg font-bold text-emerald-400 font-mono">
            {score} / {QUIZ_QUESTIONS.length}
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Questão {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg">
              Foco: {question.epistemologicalFocus}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-100 leading-snug">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60';
              if (selectedOption === idx) {
                btnStyle = 'bg-blue-950 border-blue-500 text-white';
              }
              if (isSubmitted) {
                if (idx === question.correctAnswer) {
                  btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                } else if (selectedOption === idx && idx !== question.correctAnswer) {
                  btnStyle = 'bg-red-950 border-red-500 text-red-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs transition flex items-center justify-between ${btnStyle}`}
                >
                  <span className="leading-relaxed">{opt}</span>
                  {isSubmitted && idx === question.correctAnswer && (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {isSubmitted && selectedOption === idx && idx !== question.correctAnswer && (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {isSubmitted && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 animate-fade-in">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Explicativa Pedagógica:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition ${
                  selectedOption !== null
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition"
              >
                {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Próxima Questão' : 'Ver Resultado Final'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-4">
          <Award className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
          <h3 className="text-2xl font-bold text-slate-100">Avaliação Concluída!</h3>
          <p className="text-sm text-slate-300">
            Você acertou <strong className="text-emerald-400">{score}</strong> de {QUIZ_QUESTIONS.length} questões!
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 max-w-md mx-auto text-xs text-slate-400">
            {score === QUIZ_QUESTIONS.length
              ? 'Excelente! Domínio completo da evolução dos modelos atômicos e das rupturas epistemológicas!'
              : 'Bom trabalho! Continue praticando nas simulações interativas para fixar os conceitos.'}
          </div>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
};
