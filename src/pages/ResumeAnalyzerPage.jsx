import React, { useState } from 'react';
import { FileCheck2, Upload, Sparkles, CheckCircle2, AlertCircle, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { useToast } from '../contexts/ToastContext';
import { aiService } from '../services/ai/aiService';

export const ResumeAnalyzerPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(() => {
    const saved = localStorage.getItem('resume_analysis');
    return saved ? JSON.parse(saved) : null;
  });

  const { showToast } = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      showToast('Please upload a valid PDF resume file', 'warning');
    }
  };

  const handleAnalyzeResume = async () => {
    if (!selectedFile && !analysisResult) {
      showToast('Please select a PDF resume to analyze', 'warning');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await aiService.analyzeResume('Sample extracted PDF content', selectedFile?.name || 'Resume.pdf');
      setAnalysisResult(result);
      localStorage.setItem('resume_analysis', JSON.stringify(result));
      showToast('Resume analysis complete!', 'success');
    } catch (err) {
      showToast('Failed to analyze resume. Please try again.', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <FileCheck2 className="w-7 h-7 text-sky-400" /> AI Resume Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Evaluate ATS friendliness, detect missing industry keywords, and rewrite weak bullet points.
        </p>
      </div>

      {/* Upload Box */}
      <Card className="border border-indigo-500/20 text-center py-10 px-6">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
            <Upload className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-base font-bold text-white">Upload Your Resume PDF</h3>
            <p className="text-xs text-slate-400 mt-1">Select your formatted software developer resume (Max 5MB)</p>
          </div>

          <div className="flex items-center justify-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:border-slate-500 transition-colors">
                <FileText className="w-4 h-4 text-sky-400" />
                {selectedFile ? selectedFile.name : 'Choose PDF File'}
              </span>
            </label>
          </div>

          <Button
            variant="primary"
            size="md"
            isLoading={isAnalyzing}
            onClick={handleAnalyzeResume}
            icon={Sparkles}
            className="w-full max-w-xs mx-auto mt-2"
          >
            {analysisResult ? 'Re-Analyze Resume' : 'Analyze Resume with AI'}
          </Button>
        </div>
      </Card>

      {/* Analysis Output Section */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Score Header Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Score */}
            <Card className="flex items-center gap-6 border border-slate-800">
              <div className="w-24 h-24 rounded-full border-4 border-sky-500 flex flex-col items-center justify-center shrink-0">
                <span className="text-2xl font-black text-white">{analysisResult.overall_score}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">/ 100</span>
              </div>
              <div>
                <Badge variant="sky">Overall Resume Score</Badge>
                <h3 className="text-base font-bold text-white mt-1.5">Strong Candidate Profile</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{analysisResult.summary}</p>
              </div>
            </Card>

            {/* ATS Score */}
            <Card className="flex items-center gap-6 border border-slate-800">
              <div className="w-24 h-24 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center shrink-0">
                <span className="text-2xl font-black text-white">{analysisResult.ats_score}%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Pass Rate</span>
              </div>
              <div>
                <Badge variant="emerald">ATS Compatibility</Badge>
                <h3 className="text-base font-bold text-white mt-1.5">Parser Ready</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Your resume structure is easily readable by Workday, Greenhouse, and Taleo ATS systems.
                </p>
              </div>
            </Card>
          </div>

          {/* Detailed Feedback Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card className="border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Profile Strengths</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {analysisResult.strengths?.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Recommended Improvements */}
            <Card className="border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Recommended Enhancements</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {analysisResult.improvements?.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Missing Keywords */}
          <Card className="border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Missing Industry Keywords</h3>
            <p className="text-xs text-slate-400">
              Adding these relevant tech stack keywords will increase your interview callback rate:
            </p>
            <div className="flex flex-wrap gap-2">
              {analysisResult.missing_keywords?.map((kw, i) => (
                <Badge key={i} variant="purple">{kw}</Badge>
              ))}
            </div>
          </Card>

          {/* Action Bullet Rewrites */}
          <Card className="border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Action Bullet Point Enhancements</h3>
            <div className="space-y-4">
              {analysisResult.bullet_feedback?.map((bf, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                  <p className="text-rose-400 font-mono">
                    <span className="font-bold text-slate-500 uppercase text-[10px]">Original:</span> "{bf.original}"
                  </p>
                  <p className="text-emerald-400 font-mono">
                    <span className="font-bold text-slate-500 uppercase text-[10px]">Improved AI Suggestion:</span> "{bf.suggestion}"
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
