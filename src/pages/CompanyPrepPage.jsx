import React, { useState } from 'react';
import { Building2, Code2, Brain, BookOpen, Users, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MOCK_COMPANIES } from '../data/mockCompanies';

export const CompanyPrepPage = () => {
  const [selectedCompany, setSelectedCompany] = useState(MOCK_COMPANIES[0]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Building2 className="w-7 h-7 text-indigo-400" /> Company Preparation Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Targeted interview blueprints, topic breakdown, and preparation checklists for top tech recruiters.
        </p>
      </div>

      {/* Company Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_COMPANIES.map(company => (
          <Card
            key={company.id}
            onClick={() => setSelectedCompany(company)}
            className={`cursor-pointer transition-all duration-200 border ${
              selectedCompany.id === company.id
                ? 'bg-indigo-600/15 border-indigo-500/50 shadow-xl'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={company.logo}
                alt={company.name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
              />
              <div className="overflow-hidden">
                <h3 className="text-sm font-bold text-white truncate">{company.name}</h3>
                <Badge variant={company.difficulty === 'Very Hard' ? 'rose' : company.difficulty === 'Hard' ? 'amber' : 'emerald'}>
                  {company.difficulty}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Company Blueprint */}
      {selectedCompany && (
        <Card className="space-y-6 border border-slate-800">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <img
                src={selectedCompany.logo}
                alt={selectedCompany.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-700"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold text-white">{selectedCompany.name}</h2>
                  <Badge variant="purple">{selectedCompany.tier}</Badge>
                </div>
                <p className="text-xs text-indigo-400 font-semibold mt-0.5">Average Package: {selectedCompany.avgPackage}</p>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">{selectedCompany.description}</p>
              </div>
            </div>
          </div>

          {/* Topics Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coding Topics */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <Code2 className="w-5 h-5" />
                <h4 className="text-sm font-bold text-white">Must-Solve Coding Topics</h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedCompany.codingTopics.map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aptitude Topics */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Brain className="w-5 h-5" />
                <h4 className="text-sm font-bold text-white">Online Assessment Topics</h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedCompany.aptitudeTopics.map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Fundamentals */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <BookOpen className="w-5 h-5" />
                <h4 className="text-sm font-bold text-white">Core Subject Technical Questions</h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedCompany.technicalTopics.map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HR & Leadership */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-400">
                <Users className="w-5 h-5" />
                <h4 className="text-sm font-bold text-white">HR & Behavioral Evaluation</h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedCompany.hrTopics.map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
