import React, { useState } from 'react';
import { Map, Sparkles, CheckCircle2, Circle, Clock, Sliders, RefreshCw, Calendar } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { aiService } from '../services/ai/aiService';

export const RoadmapPage = () => {
  const { profile, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [isGenerating, setIsGenerating] = useState(false);

  // Form State
  const [skillLevel, setSkillLevel] = useState(profile?.skill_level || 'Intermediate');
  const [targetRole, setTargetRole] = useState(profile?.target_role || 'Full Stack Software Engineer');
  const [targetSalary, setTargetSalary] = useState(profile?.target_salary || '$85,000 - $110,000');
  const [dailyHours, setDailyHours] = useState(profile?.daily_hours || 3);
  const [preferredCompanies, setPreferredCompanies] = useState(
    profile?.preferred_companies ? profile.preferred_companies.join(', ') : 'Google, Microsoft, Amazon'
  );

  // Roadmap Curriculum State
  const [roadmap, setRoadmap] = useState(() => {
    const saved = localStorage.getItem('user_roadmap');
    return saved ? JSON.parse(saved) : null;
  });

  const handleGenerateRoadmap = async (e) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    try {
      const result = await aiService.generateRoadmap({
        targetRole,
        targetSalary,
        preferredCompanies: preferredCompanies.split(',').map(c => c.trim()),
        dailyHours,
        skillLevel
      });

      setRoadmap(result);
      localStorage.setItem('user_roadmap', JSON.stringify(result));
      await updateProfile({
        skill_level: skillLevel,
        target_role: targetRole,
        target_salary: targetSalary,
        daily_hours: dailyHours
      });

      showToast('Personalized Placement Roadmap generated!', 'success');
    } catch (err) {
      showToast('Failed to generate roadmap. Try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleTaskCompletion = (weekIdx, taskId) => {
    if (!roadmap) return;

    const updatedWeekly = roadmap.weekly_plan.map((week, wIndex) => {
      if (wIndex !== weekIdx) return week;

      return {
        ...week,
        tasks: week.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, is_completed: !task.is_completed };
          }
          return task;
        })
      };
    });

    const updatedRoadmap = { ...roadmap, weekly_plan: updatedWeekly };
    setRoadmap(updatedRoadmap);
    localStorage.setItem('user_roadmap', JSON.stringify(updatedRoadmap));
  };

  // Calculate overall completed tasks percentage
  const totalTasks = roadmap ? roadmap.weekly_plan.flatMap(w => w.tasks).length : 0;
  const completedTasks = roadmap ? roadmap.weekly_plan.flatMap(w => w.tasks).filter(t => t.is_completed).length : 0;
  const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Map className="w-7 h-7 text-indigo-400" /> Personalized Placement Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Custom-built preparation timeline tailored to your target role and study bandwidth.
          </p>
        </div>

        {roadmap && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateRoadmap}
            isLoading={isGenerating}
            icon={RefreshCw}
          >
            Regenerate Roadmap
          </Button>
        )}
      </div>

      {/* Preferences Setup Card */}
      <Card className="border border-indigo-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Roadmap Customization Parameters</h3>
        </div>

        <form onSubmit={handleGenerateRoadmap} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Current Skill Level</label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Daily Study Bandwidth</label>
            <select
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value={1}>1 Hour / Day</option>
              <option value={2}>2 Hours / Day</option>
              <option value={3}>3 Hours / Day</option>
              <option value={5}>5+ Hours / Day</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Preferred Companies</label>
            <input
              type="text"
              value={preferredCompanies}
              onChange={(e) => setPreferredCompanies(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              placeholder="Google, Amazon, TCS"
            />
          </div>

          <div className="flex items-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isGenerating}
              icon={Sparkles}
              className="w-full"
            >
              Generate AI Plan
            </Button>
          </div>
        </form>
      </Card>

      {/* Progress Metric Card */}
      {roadmap && (
        <Card className="bg-slate-900/80 border border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Curriculum Progress <Badge variant="emerald">{progressPct}% Complete</Badge>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Completed {completedTasks} of {totalTasks} preparation milestones
              </p>
            </div>
            <div className="w-full sm:w-64">
              <ProgressBar progress={progressPct} color="emerald" showPercentage />
            </div>
          </div>
        </Card>
      )}

      {/* Weekly Curriculum Section */}
      {roadmap ? (
        <div className="space-y-6">
          {roadmap.weekly_plan.map((week, wIdx) => (
            <Card key={week.week} className="border border-slate-800/80">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-bold text-white text-sm">
                    W{week.week}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{week.title}</h3>
                    <p className="text-xs text-indigo-400 font-medium">{week.focus}</p>
                  </div>
                </div>
                <Badge variant="purple">Week {week.week}</Badge>
              </div>

              {/* Tasks Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {week.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTaskCompletion(wIdx, task.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                      task.is_completed
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-100'
                    }`}
                  >
                    {task.is_completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`text-xs font-semibold ${task.is_completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge variant={task.category === 'Coding' ? 'indigo' : task.category === 'Aptitude' ? 'emerald' : 'purple'}>
                          {task.category}
                        </Badge>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.estimated_hours} hrs
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-16">
          <Map className="w-12 h-12 text-slate-600 mx-auto mb-3 animate-float" />
          <h3 className="text-lg font-bold text-white">No Roadmap Generated Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-6">
            Customize your parameters above and click 'Generate AI Plan' to receive a 4-week tailored curriculum.
          </p>
          <Button variant="primary" size="md" onClick={handleGenerateRoadmap} isLoading={isGenerating} icon={Sparkles}>
            Generate My Roadmap Now
          </Button>
        </Card>
      )}
    </div>
  );
};
