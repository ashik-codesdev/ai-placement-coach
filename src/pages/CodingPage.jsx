import React, { useState } from 'react';
import { Search, Code2, Bookmark, CheckCircle2, Flame, Tag, ChevronRight, Play } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MOCK_CODING_PROBLEMS } from '../data/mockCodingProblems';
import { useNavigate } from 'react-router-dom';

export const CodingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  const navigate = useNavigate();

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const allTags = ['All', 'Array', 'String', 'Hash Table', 'Two Pointers', 'Sliding Window', 'Linked List', 'Stack', 'Tree'];

  const filteredProblems = MOCK_CODING_PROBLEMS.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          problem.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    const matchesTag = selectedTag === 'All' || problem.tags.includes(selectedTag);
    return matchesSearch && matchesDifficulty && matchesTag;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Code2 className="w-7 h-7 text-indigo-400" /> Coding Practice Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Master Data Structures & Algorithms with curated placement interview questions.
          </p>
        </div>
      </div>

      {/* Daily Challenge Card */}
      <Card className="border border-amber-500/30 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Flame className="w-6 h-6 fill-amber-400/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="amber">Daily Challenge</Badge>
                <span className="text-xs text-slate-400">+10 Streak XP</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">Two Sum</h3>
              <p className="text-xs text-slate-400">Arrays & Hashing • Easy • 89% Accuracy</p>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Play}
            onClick={() => navigate('/coding/two-sum')}
          >
            Solve Challenge
          </Button>
        </div>
      </Card>

      {/* Filter & Search Bar */}
      <Card className="space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems by name or category..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/80">
          <Tag className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 text-[11px] rounded-lg border transition-colors whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </Card>

      {/* Problem List Table */}
      <Card className="p-0 overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">Status</th>
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4 text-center">Accuracy</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProblems.map(problem => (
                <tr
                  key={problem.id}
                  onClick={() => navigate(`/coding/${problem.slug}`)}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4 text-center">
                    {problem.solved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-700 block mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-4 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <span>{problem.title}</span>
                      {problem.bookmarked && <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{problem.category}</td>
                  <td className="py-4 px-4">
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
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-slate-400">{problem.accuracy}</td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="ghost" size="sm" icon={ChevronRight}>
                      Solve
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
