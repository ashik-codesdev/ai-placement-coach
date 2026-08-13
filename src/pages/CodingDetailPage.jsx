import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle2, Bookmark, Code2, RefreshCw } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { MOCK_CODING_PROBLEMS } from '../data/mockCodingProblems';
import { useToast } from '../contexts/ToastContext';

export const CodingDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const problem = MOCK_CODING_PROBLEMS.find(p => p.slug === slug) || MOCK_CODING_PROBLEMS[0];

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(problem.code_templates[language] || problem.code_templates.javascript || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(problem.code_templates[newLang] || '');
  };

  const handleRunCode = async () => {
    setIsSubmitting(true);
    setTestResult(null);

    // Simulate code execution delay
    await new Promise(r => setTimeout(r, 1200));

    setIsSubmitting(false);
    setTestResult({
      status: 'Accepted',
      runtime: '58 ms',
      memory: '42.1 MB',
      passedTests: '3/3 Test Cases Passed'
    });
    showToast('Code execution passed all test cases!', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header back bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/coding')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Problem Catalog
        </button>

        <div className="flex items-center gap-3">
          <Badge
            variant={
              problem.difficulty === 'Easy'
                ? 'emerald'
                : problem.difficulty === 'Medium'
                ? 'amber'
                : 'rose'
            }
          >
            {problem.difficulty}
          </Badge>
          <span className="text-xs text-slate-400 font-semibold">{problem.category}</span>
        </div>
      </div>

      {/* Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Problem Details */}
        <Card className="space-y-6 border border-slate-800">
          <div>
            <h1 className="text-xl font-bold text-white mb-2">{problem.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {problem.tags.map(t => (
                <Badge key={t} variant="slate">{t}</Badge>
              ))}
            </div>
            <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
              {problem.description}
            </p>
          </div>

          {/* Examples */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Examples</h3>
            {problem.examples?.map((ex, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs space-y-1">
                <p><span className="text-slate-500">Input:</span> <span className="text-slate-200">{ex.input}</span></p>
                <p><span className="text-slate-500">Output:</span> <span className="text-emerald-400">{ex.output}</span></p>
                {ex.explanation && <p><span className="text-slate-500">Explanation:</span> <span className="text-slate-400">{ex.explanation}</span></p>}
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Constraints</h3>
            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 font-mono">
              {problem.constraints?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Right: Code Editor & Result */}
        <div className="space-y-4">
          <Card className="p-4 border border-slate-800 space-y-4">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-slate-200">Solution Editor</span>
              </div>

              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
              >
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="python">Python 3</option>
              </select>
            </div>

            {/* Editor Textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={16}
              className="w-full p-4 bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
            />

            {/* Run Button */}
            <div className="flex justify-end gap-3">
              <Button
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                onClick={handleRunCode}
                icon={Play}
              >
                Submit Code
              </Button>
            </div>
          </Card>

          {/* Test Results Banner */}
          {testResult && (
            <Card className="border border-emerald-500/30 bg-emerald-950/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-300">{testResult.status}</h4>
                    <p className="text-xs text-slate-400">{testResult.passedTests}</p>
                  </div>
                </div>

                <div className="text-right text-xs font-mono text-slate-400">
                  <p>Runtime: <span className="text-slate-200">{testResult.runtime}</span></p>
                  <p>Memory: <span className="text-slate-200">{testResult.memory}</span></p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
