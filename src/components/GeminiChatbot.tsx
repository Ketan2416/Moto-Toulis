import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, AlertCircle, Wrench, Zap, Cpu } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/workshopData';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export type ChatRole = 'general' | 'fast' | 'complex';

interface GeminiChatbotProps {
  lang: 'en' | 'el';
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  lang,
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text:
        lang === 'en'
          ? `Welcome to Moto Toulis! I'm your AI Mechanical Diagnostic Advisor. Ask me anything about bike troubleshooting, oil recommendations, valve clearances, suspension tuning, or Cyprus service schedules. How can I help with your motorcycle today?`
          : `Καλώς ήρθατε στο Moto Toulis! Είμαι ο τεχνικός σας σύμβουλος AI. Ρωτήστε με οτιδήποτε για διάγνωση βλαβών, επιλογή λαδιών, ρύθμιση βαλβίδων, αναρτήσεις ή πρόγραμμα σέρβις. Πώς μπορώ να βοηθήσω με τη μοτοσυκλέτα σας;`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<ChatRole>('general');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Model & System Instruction Config based on prompt requirements:
  // - gemini-3.1-pro-preview for particularly complex tasks
  // - gemini-3.5-flash for general tasks
  // - gemini-3.1-flash-lite for tasks that should happen fast
  const roleConfigs = {
    general: {
      model: 'gemini-3.5-flash',
      titleEn: 'Diagnostic Specialist (General)',
      titleEl: 'Ειδικός Διαγνωστικών (Γενικό)',
      descEn: 'Powered by gemini-3.5-flash · Mechanical troubleshooting & maintenance',
      descEl: 'Μοντέλο gemini-3.5-flash · Διάγνωση βλαβών & συντήρηση',
      icon: Wrench,
      systemInstruction: `You are the Lead Diagnostic Technician at Moto Toulis Workshop in Limassol, Cyprus (Omonoias 74b, Lemesos). 
        You specialize in general motorcycle mechanics, symptom diagnosis (strange noises, idle hunting, vibrations, spongy brakes), 
        oil recommendations (Motul 300V / 7100), and seasonal Cyprus riding advice. 
        Tone: friendly, professional, practical, and honest. 
        Respond fluently in the language the user speaks (English or Greek / Ελληνικά). 
        Keep replies clear and concise. If the issue requires physical garage inspection or computer scanning, invite them warmly to bring the bike to Omonoias 74b.`,
    },
    fast: {
      model: 'gemini-3.1-flash-lite',
      titleEn: 'Fast Service & Quote Desk',
      titleEl: 'Γρήγορες Τιμές & Ραντεβού',
      descEn: 'Powered by gemini-3.1-flash-lite · Rapid answers & workshop hours',
      descEl: 'Μοντέλο gemini-3.1-flash-lite · Άμεσες απαντήσεις & ωράριο',
      icon: Zap,
      systemInstruction: `You are the Fast Service Assistant at Moto Toulis motorcycle workshop in Limassol, Cyprus.
        Your goal is to answer quickly and crisply about service costs (Minor Service €70-160, Fork Seals €90-190, Tires €25-50 pair), 
        working hours (Mon-Fri 08:00-18:30, Sat 08:00-16:00, Sun Closed), location (Omonoias 74b, Lemesos), and pre-MOT checklist. 
        Give rapid, direct answers without unnecessary fluff. Support both English and Greek.`,
    },
    complex: {
      model: 'gemini-3.1-pro-preview',
      titleEn: 'Race Engineering & Tolerances',
      titleEl: 'Αγωνιστική Μηχανική & Ανοχές',
      descEn: 'Powered by gemini-3.1-pro-preview · In-depth blueprinted specs & physics',
      descEl: 'Μοντέλο gemini-3.1-pro-preview · Υπολογισμοί βαλβίδων & αναρτήσεων',
      icon: Cpu,
      systemInstruction: `You are the Senior Performance Engineer and Engine Blueprinter at Moto Toulis. 
        You handle complex, advanced questions involving valve lash clearances and micrometer shim calculations, 
        combustion chamber compression ratios, suspension damping curves (high/low speed rebound and compression valving, static vs dynamic sag), 
        ECU fuel trim tables, and custom exhaust backpressure dynamics. 
        Deliver rigorous, highly knowledgeable engineering explanations with exact mechanical principles. Support both English and Greek.`,
    },
  };

  const currentConfig = roleConfigs[selectedRole];

  const quickPrompts = lang === 'en' ? [
    'What engine oil do you recommend for Cyprus summer?',
    'Why is my front fork leaking oil onto the caliper?',
    'Rough idle hunting between 1100-1500 rpm on an R1?',
    'How often should I service the CVT belt on my T-MAX?',
    'What is checked during the Cyprus motorcycle MOT?',
  ] : [
    'Τι λάδι συστήνετε για το καλοκαίρι στην Κύπρο;',
    'Γιατί χάνει λάδι το μπροστινό πιρούνι στα φρένα;',
    'Ασταθές ρελαντί σε Yamaha R1 - τι φταίει;',
    'Κάθε πότε αλλάζω ιμάντα CVT σε T-MAX 560;',
    'Τι ελέγχεται στο κυπριακό ΜΟΤ μοτοσυκλέτας;',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setErrorMsg(null);
    setLastQuery(query);
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, text: m.text })),
          model: currentConfig.model,
          systemInstruction: currentConfig.systemInstruction,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned error status ${response.status}`);
      }

      const data = await response.json();
      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.text || 'Received empty response from assistant.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, modelMessage]);
      setLastQuery(null);
    } catch (err: any) {
      console.error('Chat error:', err);
      const is503 = err.message?.includes('503') || err.message?.includes('high demand') || err.message?.includes('UNAVAILABLE');
      if (is503) {
        setErrorMsg(
          lang === 'en'
            ? 'The AI model is experiencing a brief surge in global demand. Please click "Retry Query" below to reconnect.'
            : 'Το μοντέλο AI αντιμετωπίζει προσωρινά υψηλή ζήτηση. Πατήστε "Δοκιμή Ξανά" παρακάτω.'
        );
      } else {
        setErrorMsg(err.message || 'Unable to connect to Gemini API. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text:
          lang === 'en'
            ? `Conversation reset. I am ready for your next motorcycle inquiry. What bike are you riding?`
            : `Η συνομιλία μηδενίστηκε. Είμαι έτοιμος για την επόμενη ερώτησή σας. Τι μηχανή οδηγείτε;`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setErrorMsg(null);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl h-[90vh] sm:h-[82vh] bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-2xl text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-display font-extrabold uppercase tracking-wider text-slate-950">
                  Moto Toulis AI Advisor
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {lang === 'en' ? currentConfig.descEn : currentConfig.descEl}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClearHistory}
              title={lang === 'en' ? 'Reset Conversation' : 'Μηδενισμός'}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Role Selector Tabs (gemini-3.5-flash vs gemini-3.1-flash-lite vs gemini-3.1-pro-preview) */}
        <div className="px-4 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono uppercase text-slate-500 shrink-0 font-bold">
            {lang === 'en' ? 'Specialist Role:' : 'Ρόλος:'}
          </span>
          {(['general', 'fast', 'complex'] as ChatRole[]).map((r) => {
            const cfg = roleConfigs[r];
            const isSelected = selectedRole === r;
            const Icon = cfg.icon;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? cfg.titleEn : cfg.titleEl}</span>
              </button>
            );
          })}
        </div>

        {/* Messages Scrollable Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/40">
          {messages.map((msg) => {
            const isModel = msg.role === 'model';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isModel ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isModel
                      ? 'bg-amber-100 text-amber-700 border border-amber-200'
                      : 'bg-slate-200 text-slate-700 border border-slate-300'
                  }`}
                >
                  {isModel ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                    isModel
                      ? 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                      : 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div
                    className={`text-[10px] font-mono mt-2 flex items-center justify-end gap-1 ${
                      isModel ? 'text-slate-400' : 'text-slate-900/70'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>
                  {lang === 'en'
                    ? `Consulting Toulis mechanical database via ${currentConfig.model}...`
                    : `Ανάλυση δεδομένων μέσω ${currentConfig.model}...`}
                </span>
              </div>
            </div>
          )}

          {/* Error Alert with Direct Retry Button */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
              {lastQuery && (
                <button
                  type="button"
                  onClick={() => handleSend(lastQuery)}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider rounded-md text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  {lang === 'en' ? 'Retry Query' : 'Δοκιμή Ξανά'}
                </button>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 border-t border-slate-200 bg-slate-50/80 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase text-slate-500 shrink-0 flex items-center gap-1 font-bold">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>{lang === 'en' ? 'Quick Topics:' : 'Προτάσεις:'}</span>
          </span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prompt)}
              className="text-xs text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 px-3 py-1 rounded-full border border-slate-200 whitespace-nowrap transition-colors cursor-pointer shadow-xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === 'en'
                  ? 'Ask about motorcycle repair, symptoms, or maintenance...'
                  : 'Ρωτήστε για επισκευές, συμπτώματα ή συντήρηση...'
              }
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 transition-colors cursor-pointer shrink-0 shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct Booking Reminder Footer */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
            <span>{WORKSHOP_INFO.address}</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="text-amber-600 hover:underline cursor-pointer font-bold"
            >
              {lang === 'en' ? 'Need workshop inspection? Book slot →' : 'Χρειάζεστε έλεγχο; Κλείστε ραντεβού →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
