import React, { useState, useEffect } from 'react';
import { Brain, Calculator, BrainCircuit, BookOpen, BarChart3, Clock, CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { MOCK_APTITUDE_CATEGORIES, MOCK_APTITUDE_QUESTIONS } from '../data/mockAptitudeQuestions';
import { useToast } from '../contexts/ToastContext';

export const AptitudePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const { showToast } = useToast();

  const questions = selectedCategory ? (MOCK_APTITUDE_QUESTIONS[selectedCategory.id] || []) : [];

  useEffect(() => {
    let timer;
    if (selectedCategory && !quizCompleted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !quizCompleted && selectedCategory) {
      handleFinishQuiz();
    }
    return () => clearInterval(timer);
  }, [selectedCategory, quizCompleted, timeLeft]);

  const handleStartQuiz = (cat) => {
    setSelectedCategory(cat);
    setActiveQuestionIndex(0);
    setSelectedOptions({});
    setQuizCompleted(false);
    setTimeLeft(300);
  };

  const handleOptionSelect = (optionIdx) => {
    if (quizCompleted) return;
    setSelectedOptions(prev => ({ ...prev, [activeQuestionIndex]: optionIdx }));
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
    showToast('Quiz submitted successfully!', 'success');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Score Calculation
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.correctIndex) correct++;
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Brain className="w-7 h-7 text-emerald-400" /> Aptitude & Logical Reasoning Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Master online assessment MCQs for TCS, Infosys, Wipro, Accenture, and product firm hiring tests.
        </p>
      </div>

      {/* Category Selection View */}
      {!selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_APTITUDE_CATEGORIES.map(cat => (
            <Card key={cat.id} hover className="flex flex-col justify-between border border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    {cat.id === 'quant' && <Calculator className="w-6 h-6" />}
                    {cat.id === 'logical' && <BrainCircuit className="w-6 h-6" />}
                    {cat.id === 'verbal' && <BookOpen className="w-6 h-6" />}
                    {cat.id === 'di' && <BarChart3 className="w-6 h-6" />}
                  </div>
                  <Badge variant="emerald">{cat.count} Questions</Badge>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{cat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 5 Min Timed Test
                </span>
                <Button variant="primary" size="sm" onClick={() => handleStartQuiz(cat)} icon={ArrowRight}>
                  Start Practice
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Active Quiz Runner */}
      {selectedCategory && !quizCompleted && (
        <Card className="max-w-3xl mx-auto space-y-6 border border-slate-800">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-semibold text-emerald-400">{selectedCategory.title}</span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                Question {activeQuestionIndex + 1} of {questions.length}
              </h3>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-400 font-semibold">
              <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
            </div>
          </div>

          {/* Current Question */}
          {questions[activeQuestionIndex] && (
            <div className="space-y-6">
              <p className="text-sm font-medium text-slate-100 leading-relaxed">
                {questions[activeQuestionIndex].question}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {questions[activeQuestionIndex].options.map((opt, optIdx) => {
                  const isSelected = selectedOptions[activeQuestionIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(optIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-xs font-medium transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-semibold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px]">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={activeQuestionIndex === 0}
                  onClick={() => setActiveQuestionIndex(prev => prev - 1)}
                >
                  Previous
                </Button>

                {activeQuestionIndex < questions.length - 1 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button variant="success" size="sm" onClick={handleFinishQuiz}>
                    Submit Quiz
                  </Button>
                )}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Quiz Result View with Explanations */}
      {selectedCategory && quizCompleted && (
        <Card className="max-w-3xl mx-auto space-y-6 border border-slate-800">
          {(() => {
            const score = calculateScore();
            return (
              <div className="space-y-6">
                <div className="text-center pb-6 border-b border-slate-800">
                  <Badge variant="emerald" className="mb-2">{selectedCategory.title} Complete</Badge>
                  <h2 className="text-3xl font-extrabold text-white">{score.percentage}% Score</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    You answered {score.correct} out of {score.total} questions correctly.
                  </p>
                </div>

                {/* Explanations List */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Detailed Explanations</h3>
                  {questions.map((q, idx) => {
                    const userOpt = selectedOptions[idx];
                    const isCorrect = userOpt === q.correctIndex;
                    return (
                      <div key={q.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-slate-200">
                            Q{idx + 1}. {q.question}
                          </p>
                          {isCorrect ? (
                            <Badge variant="emerald" className="shrink-0 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Correct
                            </Badge>
                          ) : (
                            <Badge variant="rose" className="shrink-0 flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> Incorrect
                            </Badge>
                          )}
                        </div>

                        <p className="text-slate-400">
                          Your Choice: <span className={isCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                            {userOpt !== undefined ? q.options[userOpt] : 'Not answered'}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-slate-400">
                            Correct Answer: <span className="text-emerald-400 font-semibold">{q.options[q.correctIndex]}</span>
                          </p>
                        )}
                        <div className="p-3 rounded-lg bg-slate-950/80 text-slate-300 font-mono text-[11px] leading-relaxed border border-slate-800 mt-2">
                          <span className="text-indigo-400 font-bold block mb-0.5">Explanation:</span>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center pt-4">
                  <Button variant="outline" size="md" onClick={() => setSelectedCategory(null)} icon={RefreshCw}>
                    Back to All Categories
                  </Button>
                </div>
              </div>
            );
          })()}
        </Card>
      )}
    </div>
  );
};
