import React, { useState } from 'react';
import { Briefcase, Plus, Calendar, DollarSign, LayoutGrid, Table as TableIcon, Trash2, Edit } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { MOCK_APPLICATIONS } from '../data/mockApplications';
import { useToast } from '../contexts/ToastContext';

export const ApplicationTrackerPage = () => {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('job_applications');
    return saved ? JSON.parse(saved) : MOCK_APPLICATIONS;
  });

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [appliedDate, setAppliedDate] = useState(new Date().toISOString().split('T')[0]);
  const [interviewDate, setInterviewDate] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [notes, setNotes] = useState('');

  const { showToast } = useToast();

  const statusColumns = [
    'Interested',
    'Applied',
    'Online Assessment',
    'Technical Interview',
    'HR Interview',
    'Selected',
    'Rejected'
  ];

  const handleAddApplication = (e) => {
    e.preventDefault();
    if (!company || !role) return;

    const newApp = {
      id: `app-${Date.now()}`,
      company,
      role,
      status,
      appliedDate,
      interviewDate: interviewDate || null,
      salaryRange,
      notes
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    localStorage.setItem('job_applications', JSON.stringify(updated));

    setIsModalOpen(false);
    resetForm();
    showToast('Job application added!', 'success');
  };

  const handleDelete = (id) => {
    const updated = applications.filter(a => a.id !== id);
    setApplications(updated);
    localStorage.setItem('job_applications', JSON.stringify(updated));
    showToast('Application removed', 'info');
  };

  const resetForm = () => {
    setCompany('');
    setRole('');
    setStatus('Applied');
    setAppliedDate(new Date().toISOString().split('T')[0]);
    setInterviewDate('');
    setSalaryRange('');
    setNotes('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-7 h-7 text-emerald-400" /> Job Application Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your placement applications across technical interview rounds, online assessments, and offers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'kanban' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Kanban
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" /> Table
            </button>
          </div>

          <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)} icon={Plus}>
            Add Application
          </Button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-6">
          {statusColumns.map(colStatus => {
            const colApps = applications.filter(a => a.status === colStatus);
            return (
              <div key={colStatus} className="w-72 shrink-0 space-y-3">
                <div className="flex items-center justify-between px-3 py-2 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-200">{colStatus}</span>
                  <Badge variant="indigo">{colApps.length}</Badge>
                </div>

                <div className="space-y-3 min-h-[400px]">
                  {colApps.map(app => (
                    <Card key={app.id} className="p-4 border border-slate-800 space-y-2 relative group">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white">{app.company}</h4>
                          <p className="text-xs text-slate-400">{app.role}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {app.interviewDate && (
                        <p className="text-[10px] text-amber-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Interview: {app.interviewDate}
                        </p>
                      )}

                      {app.salaryRange && (
                        <p className="text-[10px] text-emerald-400 font-mono">
                          {app.salaryRange}
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Card className="p-0 overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-4">Interview Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {applications.map(app => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">{app.company}</td>
                    <td className="py-4 px-4">{app.role}</td>
                    <td className="py-4 px-4">
                      <Badge variant={app.status === 'Selected' ? 'emerald' : app.status === 'Rejected' ? 'rose' : 'indigo'}>
                        {app.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{app.appliedDate}</td>
                    <td className="py-4 px-4 text-slate-400">{app.interviewDate || 'N/A'}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add Application Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Job Application">
        <form onSubmit={handleAddApplication} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Company Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Role Title</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Software Engineer I"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                {statusColumns.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Interview Date (Optional)</label>
              <input
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
