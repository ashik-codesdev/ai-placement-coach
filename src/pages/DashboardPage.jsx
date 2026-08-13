import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  CheckCircle2,
  Brain,
  Video,
  FileText,
  Briefcase,
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp,
  Target,
  ChevronRight
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const DashboardPage = () => {
  const { profile } = useAuth();

  const prepScore = profile?.prep_score || 72;
  const codingScore = profile?.coding_score || 68;
  const aptitudeScore = profile?.aptitude_score || 81;
  const interviewScore = profile?.interview_score || 64;
  const resumeScore = profile?.resume_score || 78;

  const scoreData = [
    { name: 'Coding', value: codingScore, color: '#6366f1' },
    { name: 'Aptitude', value: aptitudeScore, color: '#10b981' },
    { name: 'Interview', value: interviewScore, color: '#f59e0b' },
    { name: 'Resume', value: resumeScore, color: '#38bdf8' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden glass-card rounded-3xl p-6 lg:p-8 border border-indigo-500/30">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Target Role: {profile?.target_role || 'Software Engineer'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              You are on track for placement season. Solve 1 coding problem today to keep your <span className="text-amber-400 font-semibold">{profile?.streak_count || 5}-day streak</span> active!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/roadmap">
              <Button variant="primary" size="md" icon={Target}>
                View Today's Tasks
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={Flame}
          iconBg="bg-amber-500/10 border-amber-500/20 text-amber-400"
          title="Current Streak"
          value={`${profile?.streak_count || 5} Days`}
          subtitle="Top 10% consistent student"
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
          title="Problems Solved"
          value="24 / 50"
          subtitle="68% accuracy rate"
        />
        <StatCard
          icon={Brain}
          iconBg="bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          title="Aptitude Progress"
          value={`${aptitudeScore}%`}
          subtitle="3 categories completed"
        />
        <StatCard
          icon={FileText}
          iconBg="bg-sky-500/10 border-sky-500/20 text-sky-400"
          title="Resume Score"
          value={`${resumeScore}/100`}
          subtitle="ATS Compatible"
        />
      </div>

      {/* Overview Analytics & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Readiness Score Gauge */}
        <Card className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Overall Placement Score</h3>
              <Badge variant="indigo">Live Rating</Badge>
            </div>
            <p className="text-xs text-slate-400">Aggregate readiness based on tests, interviews, and resume.</p>
          </div>

          <div className="my-6 relative flex items-center justify-center">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-white">{prepScore}%</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Ready</span>
            </div>
          </div>

          {/* Module Breakdown List */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <ScoreBar label="Coding Practice" score={codingScore} color="indigo" />
            <ScoreBar label="Aptitude & Logical" score={aptitudeScore} color="emerald" />
            <ScoreBar label="Mock Interviews" score={interviewScore} color="amber" />
            <ScoreBar label="Resume Quality" score={resumeScore} color="sky" />
          </div>
        </Card>

        {/* Upcoming Preparation Tasks & Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Tasks */}
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Upcoming Preparation Tasks</h3>
              </div>
              <Link to="/roadmap" className="text-xs text-indigo-400 font-semibold hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              <TaskItem
                category="Coding"
                title="Solve 'Longest Substring Without Repeating Characters'"
                time="Est. 25 mins"
                completed={false}
              />
              <TaskItem
                category="Aptitude"
                title="Complete Speed & Distance Quiz (10 MCQs)"
                time="Est. 15 mins"
                completed={false}
              />
              <TaskItem
                category="Interview"
                title="Practice 1 Technical AI Interview Round on Systems"
                time="Est. 20 mins"
                completed={false}
              />
            </div>
          </Card>

          {/* Applications Quick Overview */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Job Applications Pipeline</h3>
              </div>
              <Link to="/applications" className="text-xs text-indigo-400 font-semibold hover:underline">
                Manage Applications
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-lg font-bold text-white">4</span>
                <p className="text-[11px] text-slate-400">Total Applied</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-lg font-bold text-amber-400">1</span>
                <p className="text-[11px] text-slate-400">Online Assessment</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-lg font-bold text-indigo-400">1</span>
                <p className="text-[11px] text-slate-400">Technical Round</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-lg font-bold text-emerald-400">1</span>
                <p className="text-[11px] text-slate-400">HR Interview</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, iconBg, title, value, subtitle }) => (
  <Card hover className="flex items-center gap-4">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${iconBg}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div className="overflow-hidden">
      <p className="text-xs font-semibold text-slate-400">{title}</p>
      <h4 className="text-xl font-bold text-white mt-0.5">{value}</h4>
      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{subtitle}</p>
    </div>
  </Card>
);

const ScoreBar = ({ label, score, color }) => (
  <div>
    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
      <span>{label}</span>
      <span className="font-bold">{score}%</span>
    </div>
    <ProgressBar progress={score} color={color} />
  </div>
);

const TaskItem = ({ category, title, time, completed }) => (
  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors">
    <div className="flex items-center gap-3">
      <input type="checkbox" defaultChecked={completed} className="w-4 h-4 rounded text-indigo-600 bg-slate-800 border-slate-700 focus:ring-indigo-500" />
      <div>
        <p className="text-xs font-semibold text-slate-200">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="indigo">{category}</Badge>
          <span className="text-[11px] text-slate-400">{time}</span>
        </div>
      </div>
    </div>
  </div>
);
