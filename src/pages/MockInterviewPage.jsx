import React, { useState } from 'react';
import { Video, Send, Sparkles, CheckCircle2, AlertTriangle, RefreshCw, Bot, User, Award } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { useToast } from '../contexts/ToastContext';
import { aiService } from '../services/ai/aiService';

export const MockInterviewPage = () => {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [interviewType, setInterviewType] = useState('Technical');
  const [targetCompany, setTargetCompany] = useState('Google');

  const [messages, setMessages] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  const { showToast } = useToast();

  const handleStartInterview = () => {
    setInterviewStarted(true);
    setInterviewCompleted(false);
    setQuestionCount(1);
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: `Welcome to your ${targetCompany} ${interviewType} Interview! Let's get started.\n\nQuestion 1: Can you explain the internal working mechanism of a HashMap, and how collisions are handled in Java or C++?`,
        evaluation: null
      }
    ]);
  };

  const handleSendAnswer = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim() || isEvaluating) return;

    const currentQ = messages[messages.length - 1]?.text || '';
    const userMsg = { id: Date.now(), sender: 'user', text: userAnswer };
    setMessages(prev => [...prev, userMsg]);
    setUserAnswer('');
    setIsEvaluating(true);

    try {
      const evalResult = await aiService.evaluateInterviewAnswer(currentQ, userAnswer, interviewType);

      const aiFeedbackMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: questionCount < 3
          ? `Feedback: ${evalResult.feedback}\n\nQuestion ${questionCount + 1}: ${
              questionCount === 1
                ? 'How would you optimize a SQL query that performs a full table scan on 10 million rows?'
                : 'Describe a situation where you had a conflict with a teammate during a project. How did you resolve it?'
            }`
          : `That concludes our ${interviewType} session! You did a fantastic job. Click 'Finish Interview' below to view your full performance report.`,
        evaluation: evalResult
      };

      setMessages(prev => [...prev, aiFeedbackMsg]);
      setQuestionCount(prev => prev + 1);
    } catch (err) {
      showToast('Error evaluating response. Try again.', 'error');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Video className="w-7 h-7 text-indigo-400" /> AI Mock Interview Simulator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Simulate real turn-based technical, behavioral, and HR interview rounds with real-time feedback.
        </p>
      </div>

      {/* Setup View */}
      {!interviewStarted && (
        <Card className="max-w-2xl mx-auto space-y-6 border border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" /> Configure Interview Session
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Interview Round Type</label>
              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="Technical">Technical Round (DSA & Systems)</option>
                <option value="HR">HR Round (Culture Fit & Ambition)</option>
                <option value="Behavioral">Behavioral Round (STAR Method)</option>
                <option value="Company-Specific">Company-Specific Placement Round</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Target Company Context</label>
              <select
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="Google">Google</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Amazon">Amazon</option>
                <option value="TCS Digital">TCS Digital</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <Button variant="primary" size="md" onClick={handleStartInterview} icon={Video}>
              Start AI Mock Interview
            </Button>
          </div>
        </Card>
      )}

      {/* Chat Session Window */}
      {interviewStarted && !interviewCompleted && (
        <Card className="max-w-4xl mx-auto flex flex-col h-[600px] border border-slate-800 p-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{targetCompany} • {interviewType} Interview</h3>
                <p className="text-[10px] text-slate-400">Interviewer: Placement AI Engine</p>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={() => setInterviewCompleted(true)}>
              Finish & Get Report
            </Button>
          </div>

          {/* Chat Messages */}
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

                <div className={`max-w-xl space-y-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Evaluation Score Badge */}
                  {msg.evaluation && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px]">
                      <span className="text-slate-400">Score:</span>
                      <span className="font-bold text-emerald-400">{msg.evaluation.score}/100</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">{msg.evaluation.feedback}</span>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendAnswer} className="p-4 bg-slate-900 border-t border-slate-800 flex gap-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your interview response here..."
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              disabled={isEvaluating}
            />
            <Button type="submit" variant="primary" size="md" isLoading={isEvaluating} icon={Send}>
              Submit
            </Button>
          </form>
        </Card>
      )}

      {/* Completed Report */}
      {interviewCompleted && (
        <Card className="max-w-3xl mx-auto space-y-6 border border-slate-800">
          <div className="text-center pb-6 border-b border-slate-800">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Interview Evaluation Report</h2>
            <p className="text-xs text-slate-400 mt-1">{targetCompany} • {interviewType} Assessment</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xl font-bold text-emerald-400">85%</span>
              <p className="text-[10px] text-slate-400">Overall Score</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xl font-bold text-indigo-400">90%</span>
              <p className="text-[10px] text-slate-400">Relevance</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xl font-bold text-amber-400">82%</span>
              <p className="text-[10px] text-slate-400">Tech Accuracy</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xl font-bold text-purple-400">88%</span>
              <p className="text-[10px] text-slate-400">Confidence</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white">Key Feedback Highlights</h4>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
              <p>• Great structural clarity using step-by-step logic.</p>
              <p className="mt-1">• Continue practice on explaining edge-case time complexity (Big-O).</p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button variant="outline" size="md" onClick={() => setInterviewStarted(false)} icon={RefreshCw}>
              Start New Mock Interview
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
