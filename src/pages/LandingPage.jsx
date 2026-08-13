import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Map,
  Code2,
  BrainCircuit,
  FileCheck2,
  Video,
  BarChart3,
  CheckCircle,
  Building2,
  ShieldCheck
} from 'lucide-react';

import { Button } from '../components/common/Button';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Placement<span className="gradient-text font-black">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How it works</a>
            <a href="#ai-capabilities" className="hover:text-indigo-400 transition-colors">AI Engine</a>
            <a href="#companies" className="hover:text-indigo-400 transition-colors">Companies</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm" icon={ArrowRight}>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-8 animate-float">
            <Sparkles className="w-4 h-4" />
            <span>AI-POWERED COLLEGE PLACEMENT SUITE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Prepare Smarter. <br />
            <span className="gradient-text">Get Placed Faster.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            The all-in-one placement readiness platform for engineering students. Master coding interviews, aptitude tests, ATS resumes, and AI mock interviews in one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto" icon={ArrowRight}>
                Start Free Preparation
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Demo Dashboard
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex items-center justify-center gap-8 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>Trusted by engineering students targeting top product & service companies</span>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-24 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight">Everything You Need for Campus Placements</h2>
            <p className="mt-3 text-slate-400 text-sm">Comprehensive modules designed to take you from foundational concepts to dream offer letters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Map}
              title="Personalized Roadmap"
              description="Adaptive weekly study schedule built around your target role, preferred companies, and available study hours."
            />
            <FeatureCard
              icon={Code2}
              title="Coding Practice Engine"
              description="Topic-wise DSA problems with difficulty filters, attempt metrics, bookmarks, and architecture ready for code runners."
            />
            <FeatureCard
              icon={BrainCircuit}
              title="Aptitude Quiz Engine"
              description="Timed MCQs covering Quantitative, Logical Reasoning, Verbal Ability, and Data Interpretation with step-by-step solutions."
            />
            <FeatureCard
              icon={FileCheck2}
              title="AI Resume Analyzer"
              description="Upload resume PDF for real-time ATS compatibility scoring, missing keyword detection, and bullet point enhancements."
            />
            <FeatureCard
              icon={Video}
              title="AI Mock Interviews"
              description="Real-time conversational interview simulator (Technical, HR, Behavioral) with step-by-step evaluation."
            />
            <FeatureCard
              icon={BarChart3}
              title="Deep Analytics Suite"
              description="Visualize topic strengths, accuracy rates, and daily streak consistency using interactive Recharts analytics."
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden border border-indigo-500/30">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Land Your Dream Tech Offer?</h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto text-sm">Join thousands of students using AI Placement Coach to streamline their interview readiness.</p>
            <div className="mt-8 flex justify-center">
              <Link to="/register">
                <Button variant="primary" size="lg" icon={ArrowRight}>Create Free Student Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AI Placement Coach. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#features" className="hover:text-slate-400">Terms of Service</a>
            <a href="#features" className="hover:text-slate-400">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 border border-slate-800 hover:border-indigo-500/40">
    <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
  </div>
);
