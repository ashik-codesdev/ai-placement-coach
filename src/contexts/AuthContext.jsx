import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

const AuthContext = createContext();

const MOCK_USER_PROFILE = {
  id: 'demo-user-123',
  email: 'student@example.com',
  full_name: 'Alex Rivera',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  skill_level: 'Intermediate',
  target_role: 'Full Stack Software Engineer',
  target_salary: '$85,000 - $110,000',
  preferred_companies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
  daily_hours: 3,
  placement_date: '2026-11-15',
  streak_count: 5,
  prep_score: 72,
  coding_score: 68,
  aptitude_score: 81,
  interview_score: 64,
  resume_score: 78,
  created_at: new Date().toISOString()
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      // Use local demo state
      const savedUser = localStorage.getItem('demo_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setProfile(parsed);
      } else {
        // Default guest/demo user for instant testing
        setUser(MOCK_USER_PROFILE);
        setProfile(MOCK_USER_PROFILE);
      }
      setLoading(false);
      return;
    }

    // Supabase Live Auth Initialization
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }
      setProfile(data || MOCK_USER_PROFILE);
    } catch (err) {
      console.error('Profile fetch exception:', err);
      setProfile(MOCK_USER_PROFILE);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    if (!isSupabaseConfigured()) {
      const mockProfile = { ...MOCK_USER_PROFILE, email };
      localStorage.setItem('demo_user', JSON.stringify(mockProfile));
      setUser(mockProfile);
      setProfile(mockProfile);
      return { user: mockProfile, error: null };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  const register = async (email, password, fullName) => {
    if (!isSupabaseConfigured()) {
      const mockProfile = { ...MOCK_USER_PROFILE, email, full_name: fullName };
      localStorage.setItem('demo_user', JSON.stringify(mockProfile));
      setUser(mockProfile);
      setProfile(mockProfile);
      return { user: mockProfile, error: null };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
    return { data, error };
  };

  const logout = async () => {
    if (!isSupabaseConfigured()) {
      localStorage.removeItem('demo_user');
      setUser(null);
      setProfile(null);
      return;
    }
    await supabase.auth.signOut();
  };

  const resetPassword = async (email) => {
    if (!isSupabaseConfigured()) {
      return { data: {}, error: null };
    }
    return await supabase.auth.resetPasswordForEmail(email);
  };

  const updateProfile = async (updates) => {
    const updatedProfile = { ...profile, ...updates, updated_at: new Date().toISOString() };
    setProfile(updatedProfile);

    if (!isSupabaseConfigured()) {
      localStorage.setItem('demo_user', JSON.stringify(updatedProfile));
      return { data: updatedProfile, error: null };
    }

    if (user?.id) {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, ...updates });
      return { data, error };
    }
    return { data: updatedProfile, error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        login,
        register,
        logout,
        resetPassword,
        updateProfile,
        isSupabaseConfigured: isSupabaseConfigured()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
