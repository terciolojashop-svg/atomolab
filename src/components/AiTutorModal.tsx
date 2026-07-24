import React, { useState } from 'react';
import { Bot, Send, Sparkles, X, User } from 'lucide-react';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModelName: string;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({ isOpen, onClose, activeModelName }) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Olá! Sou seu Tutor Socrático de Química. Estou aqui para te ajudar a refletir sobre o **${activeModelName}** sem apenas dar as respostas prontas. Qual é a sua dúvida ou curiosidade?`
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Simulate intelligent Socratic response (or API call)
      setTimeout(() => {
        let aiReply = '';
        if (userText.toLowerCase().includes('por que') || userText.toLowerCase().includes('porque')) {
          aiReply = `Excelente pergunta! Vamos pensar juntos: se a matéria fosse feita apenas do modelo que você está investigando (${activeModelName}), o que aconteceria quando aplicássemos uma carga elétrica forte? Tente observar o experimento no simulador!`;
        } else if (userText.toLowerCase().includes('elétron') || userText.toLowerCase().includes('eletron')) {
          aiReply = `Os elétrons revolucionaram a ciência! Lembre-se: antes de Thomson, achava-se que o átomo era uma bola indivisível. O que você acha que provou que o elétron tem carga negativa?`;
        } else {
          aiReply = `Que reflexão interessante! No contexto do ${activeModelName}, tente conectar esse conceito ao mundo real. Por exemplo, como isso explica as cores ou a eletricidade ao nosso redor?`;
        }

        setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
        setIsLoading(false);
      }, 800);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg h-[520px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                Tutor Socrático de Química <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h3>
              <p className="text-[11px] text-slate-400">Tutor de IA focado no 9º Ano do Ensino Fundamental</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-950/40">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none font-medium'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500 text-xs italic p-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" /> O Tutor de IA está formulando uma pergunta socrática...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua dúvida sobre os modelos atômicos..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
