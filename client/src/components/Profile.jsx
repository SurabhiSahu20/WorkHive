import React, { useEffect, useState } from 'react';
import { Home, Mail, IdCard, Briefcase, Hash, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('https://workhive-9rx0.onrender.com/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <ProfileLoadingSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-900">
      <div className="max-w-3xl mx-auto">
        
        {/* --- HEADER NAVIGATION --- */}
        <header className="flex justify-between items-center mb-8">
          <Link to="/home" className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-indigo-600 hover:shadow-md transition-all">
            <Home size={22} />
          </Link>
          <h1 className="text-xl font-black uppercase tracking-widest text-slate-400">Profile Settings</h1>
          <div className="w-12"></div> {/* Spacer for symmetry */}
        </header>

        {/* --- PROFILE TOP CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 text-center relative overflow-hidden mb-8"
        >
          {/* Decorative Gradient Background */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10"></div>
          
          <div className="relative z-10">
            <div className="inline-block p-1.5 bg-white rounded-full shadow-xl mb-6">
              <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-black uppercase border-4 border-white">
                {user?.full_name?.charAt(0) || 'U'}
              </div>
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 mb-2">{user?.full_name}</h2>
            <p className="text-indigo-600 font-bold mb-6">{user?.title || "Professional Developer"}</p>
            
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-black uppercase tracking-tighter">
              <ShieldCheck size={16} />
              Role: {user?.role}
            </div>
          </div>
        </motion.div>

        {/* --- DETAILS GRID --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { label: 'Team Code', val: user?.team_code, icon: <Hash className="text-amber-500" /> },
            { label: 'Official Title', val: user?.title, icon: <IdCard className="text-blue-500" /> },
            { label: 'Email Address', val: user?.email, icon: <Mail className="text-rose-500" /> },
            { label: 'Platform Role', val: user?.role, icon: <Briefcase className="text-emerald-500" /> }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:border-indigo-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</h3>
                  <p className="text-slate-800 font-bold break-all">{item.val || 'Not Set'}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* --- ACTION FOOTER --- */}
        <footer className="mt-12 text-center">
          <button className="text-slate-400 hover:text-rose-500 text-sm font-bold transition-colors">
            Want to update your info? Contact Admin
          </button>
        </footer>
      </div>
    </div>
  );
};

// Sleek Loading State
const ProfileLoadingSkeleton = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
    <div className="w-full max-w-3xl space-y-8 animate-pulse">
      <div className="h-64 bg-slate-200 rounded-[2.5rem]"></div>
      <div className="grid grid-cols-2 gap-6">
        <div className="h-24 bg-slate-200 rounded-3xl"></div>
        <div className="h-24 bg-slate-200 rounded-3xl"></div>
        <div className="h-24 bg-slate-200 rounded-3xl"></div>
        <div className="h-24 bg-slate-200 rounded-3xl"></div>
      </div>
    </div>
  </div>
);

export default Profile;