import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, HelpCircle, Code2, BookOpen } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { aiService } from '../services/ai/aiService';

export const AIAssistantPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am your AI Placement Assistant 🤖. Ask me anything about Data Structures, Systems, Aptitude shortcuts, or HR interview answers."
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    "Explain HashMap internal working.",
    "Explain OOP 4 pillars for an interview.",
    "Give me 5 top array problems.",
    "How to prepare for Amazon HR round?"
  ];

  const handleSend = async (textToSend) => {
    const text = textToSend || inputMsg;
    if (!text.trim() || isTyping) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputMsg('');
    setIsTyping(true);

    try {
      const response = await aiService.chatAssistant([...messages, userMsg]);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: response }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: "Sorry, I had trouble processing that query." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Bot className="w-7 h-7 text-indigo-400" /> AI Placement Study Assistant
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Your 24/7 technical tutor for code explanations, interview concepts, and CS fundamentals.
        </p>
      </div>

      {/* Chat Container */}
      <Card className="max-w-4xl mx-auto flex flex-col h-[650px] border border-slate-800 p-0 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none font-medium'
                    : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 animate-pulse">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>AI Tutor is thinking...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-6 py-2 bg-slate-900 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
          {samplePrompts.map((sp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sp)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors whitespace-nowrap"
            >
              {sp}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="p-4 bg-slate-900 border-t border-slate-800 flex gap-3"
        >
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Ask anything about coding, CS fundamentals, or interviews..."
            className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            disabled={isTyping}
          />
          <Button type="submit" variant="primary" size="md" isLoading={isTyping} icon={Send}>
            Ask AI
          </Button>
        </form>
      </Card>
    </div>
  );
};
