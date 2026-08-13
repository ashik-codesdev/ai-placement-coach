import React from 'react';
import { BarChart3, TrendingUp, Award, Flame, Target, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

export const AnalyticsPage = () => {
  const radarData = [
    { subject: 'Data Structures', score: 85, fullMark: 100 },
    { subject: 'Algorithms', score: 68, fullMark: 100 },
    { subject: 'Quant Aptitude', score: 92, fullMark: 100 },
    { subject: 'Logical Reasoning', score: 80, fullMark: 100 },
    { subject: 'System Design', score: 60, fullMark: 100 },
    { subject: 'Mock Interview', score: 75, fullMark: 100 }
  ];

  const weeklyActivityData = [
    { day: 'Mon', problems: 4, aptitude: 10 },
    { day: 'Tue', problems: 6, aptitude: 15 },
    { day: 'Wed', problems: 3, aptitude: 8 },
    { day: 'Thu', problems: 5, aptitude: 12 },
    { day: 'Fri', problems: 7, aptitude: 20 },
    { day: 'Sat', problems: 8, aptitude: 18 },
    { day: 'Sun', problems: 4, aptitude: 10 }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-indigo-400" /> Advanced Placement Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Detailed performance metrics evaluating your topic strengths, accuracy, and practice momentum.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Strongest Domain</p>
            <h4 className="text-lg font-bold text-white mt-0.5">Quantitative Aptitude</h4>
            <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">92% Accuracy</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Needs Focus</p>
            <h4 className="text-lg font-bold text-white mt-0.5">System Design</h4>
            <p className="text-[11px] text-amber-400 font-semibold mt-0.5">60% Score</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Weekly Consistency</p>
            <h4 className="text-lg font-bold text-white mt-0.5">37 Solved Tasks</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Active every day</p>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Proficiency Radar */}
        <Card className="space-y-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Skill Proficiency Radar</h3>
            <Badge variant="indigo">Overview</Badge>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Student Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Weekly Activity Line Chart */}
        <Card className="space-y-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Weekly Activity & Velocity</h3>
            <Badge variant="emerald">7-Day Trend</Badge>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="problems" stroke="#6366f1" strokeWidth={3} name="Problems Solved" />
                <Line type="monotone" dataKey="aptitude" stroke="#10b981" strokeWidth={3} name="Aptitude MCQs" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
