-- ===================================================
-- AI Placement Coach - Supabase PostgreSQL Schema & RLS
-- ===================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  skill_level TEXT DEFAULT 'Intermediate',
  target_role TEXT DEFAULT 'Full Stack Software Engineer',
  target_salary TEXT DEFAULT '$85,000 - $110,000',
  preferred_companies TEXT[] DEFAULT ARRAY['Google', 'Microsoft', 'Amazon'],
  daily_hours NUMERIC DEFAULT 3,
  placement_date DATE,
  streak_count INTEGER DEFAULT 0,
  prep_score INTEGER DEFAULT 72,
  coding_score INTEGER DEFAULT 68,
  aptitude_score INTEGER DEFAULT 81,
  interview_score INTEGER DEFAULT 64,
  resume_score INTEGER DEFAULT 78,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Student'),
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Coding Problems Table
CREATE TABLE IF NOT EXISTS public.coding_problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  category TEXT NOT NULL,
  tags TEXT[],
  description TEXT,
  constraints TEXT[],
  examples JSONB,
  code_templates JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.coding_problems ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read coding problems" ON public.coding_problems FOR SELECT USING (true);

-- 3. Coding Attempts Table
CREATE TABLE IF NOT EXISTS public.coding_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  problem_id UUID REFERENCES public.coding_problems(id),
  status TEXT CHECK (status IN ('Solved', 'Attempted', 'Failed')),
  submitted_code TEXT,
  language TEXT,
  time_taken_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.coding_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own coding attempts" ON public.coding_attempts FOR ALL USING (auth.uid() = user_id);

-- 4. Aptitude Questions Table
CREATE TABLE IF NOT EXISTS public.aptitude_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index INTEGER NOT NULL,
  explanation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.aptitude_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read aptitude questions" ON public.aptitude_questions FOR SELECT USING (true);

-- 5. Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL,
  applied_date DATE,
  interview_date DATE,
  salary_range TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own applications" ON public.applications FOR ALL USING (auth.uid() = user_id);

-- 6. Storage Bucket for Resumes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload their own resumes" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read their own resumes" ON storage.objects
  FOR SELECT USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);
