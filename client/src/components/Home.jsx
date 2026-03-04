import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import homeImage from '../assets/home_i.png';
// import logo from '../assets/Logo.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo placeholder - replace src with your logo variable */}
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-8 shadow-lg animate-bounce duration-[3000ms]">
              TB
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-900 mb-6">
              Welcome to <br />
              <span className="text-indigo-600">Task Bridge</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              The ultimate platform for task management and seamless team collaboration. Bridge the gap between ideas and execution.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-200 flex items-center gap-2"
              >
                <span>👥</span> Join Your Team
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-indigo-300 text-slate-700 font-bold rounded-2xl transition-all"
              >
                <span>⊕</span> Create Team
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -inset-4 bg-indigo-100/50 rounded-[2rem] blur-2xl -z-10"></div>
            {/* Replace with your homeImage variable */}
            <div className="bg-white p-4 rounded-[2rem] shadow-2xl border border-slate-100">
               <div className="aspect-video bg-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                 [Illustration: Team Productivity]
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">What is Task Bridge?</h2>
          <p className="text-lg text-slate-600 leading-relaxed italic">
            "An innovative platform designed to streamline task management and facilitate seamless team collaboration. We provide a comprehensive set of tools to organize projects and communicate effectively, all in one place."
          </p>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900">Built for Peak Performance</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "📋", title: "Task Management", desc: "Easily create, assign, and track tasks with intuitive tools." },
            { icon: "🤝", title: "Team Collaboration", desc: "Work together in real-time with your team members." },
            { icon: "📂", title: "Document Sharing", desc: "Upload, share, and manage files effortlessly." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="bg-indigo-50/50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Loved by Teams</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-indigo-100 relative">
              <span className="absolute top-8 right-8 text-indigo-100 text-6xl font-serif">“</span>
              <p className="text-lg text-slate-700 mb-6 italic relative z-10">
                "Task Bridge has transformed the way our team works. Highly recommended!"
              </p>
              <p className="font-bold text-indigo-600">— Priy Mavani</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-indigo-100 relative">
              <span className="absolute top-8 right-8 text-indigo-100 text-6xl font-serif">“</span>
              <p className="text-lg text-slate-700 mb-6 italic relative z-10">
                "The task management tools are incredibly intuitive and easy to use."
              </p>
              <p className="font-bold text-indigo-600">— Krish Shyara</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-slate-600 mb-10">Join Task Bridge today and take your team collaboration to the next level.</p>
          <div className="flex justify-center gap-4">
             <button 
                onClick={() => navigate('/signup')}
                className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-100"
              >
                Create Free Account
              </button>
          </div>
        </div>
      </section>
      
      <footer className="py-12 border-t border-slate-200 text-center text-slate-400 text-sm">
        &copy; 2026 Task Bridge Platform. Built for CSE Excellence.
      </footer>
    </div>
  );
};

export default Home;