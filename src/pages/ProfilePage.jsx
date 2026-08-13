import React, { useState } from 'react';
import { User, Mail, Target, Award, Save, ShieldCheck } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export const ProfilePage = () => {
  const { profile, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [targetRole, setTargetRole] = useState(profile?.target_role || '');
  const [targetSalary, setTargetSalary] = useState(profile?.target_salary || '');
  const [dailyHours, setDailyHours] = useState(profile?.daily_hours || 3);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfile({
      full_name: fullName,
      target_role: targetRole,
      target_salary: targetSalary,
      daily_hours: dailyHours
    });
    setIsSaving(false);
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <User className="w-7 h-7 text-indigo-400" /> Student Profile & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your career target goals, profile details, and account preferences.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto space-y-6 border border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
          <img
            src={profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
          />
          <div>
            <h3 className="text-lg font-bold text-white">{profile?.full_name || 'Student Name'}</h3>
            <p className="text-xs text-slate-400">{profile?.email || 'student@example.com'}</p>
            <Badge variant="emerald" className="mt-1">Active Student Account</Badge>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Salary Package</label>
              <input
                type="text"
                value={targetSalary}
                onChange={(e) => setTargetSalary(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Daily Study Bandwidth (Hours)</label>
              <input
                type="number"
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                min={1}
                max={12}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <Button type="submit" variant="primary" size="md" isLoading={isSaving} icon={Save}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
