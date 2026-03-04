import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100, once: true });
  }, []);

  const features = [
    { icon: "🛠️", title: "Task Management", desc: "Efficiently create, assign, and track tasks with real-time updates." },
    { icon: "💬", title: "Team Collaboration", desc: "Communicate seamlessly with team members through built-in messaging." },
    { icon: "📅", title: "Calendar Integration", desc: "Stay on top of deadlines with an interactive project calendar." },
    { icon: "📂", title: "File Sharing", desc: "Upload and manage project-related documents in one central location." },
    { icon: "🎨", title: "Virtual Board", desc: "Collaborate visually with a real-time interactive whiteboard." },
    { icon: "⚡", title: "Fast Workflow", desc: "Automate repetitive tasks and focus on what matters most." }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
              About WorkHive
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
              Elevate your team’s <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Productivity.
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We’re more than a task tracker. We’re the digital headquarters where 
              ideas turn into reality and teams find their flow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- STATS / INTRO SECTION --- */}
      <section className="max-w-6xl mx-auto px-6 -mt-16" data-aos="fade-up">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white md:max-w-md">
            <h2 className="text-2xl font-bold mb-4">What is WorkHive?</h2>
            <p className="text-slate-400 leading-relaxed">
              An all-in-one ecosystem designed for modern engineering teams. 
              We bridge the gap between complex project tracking and 
              intuitive user experience.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-center border-l border-slate-700 pl-0 md:pl-12">
            <div>
              <div className="text-4xl font-bold text-indigo-400">99%</div>
              <div className="text-slate-400 text-sm">Task Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">24/7</div>
              <div className="text-slate-400 text-sm">Collaboration</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900" data-aos="fade-up">Packed with everything you need</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block p-3 bg-white rounded-2xl shadow-sm mb-8" data-aos="zoom-in">
            <span className="text-3xl">🎯</span>
          </div>
          <h2 className="text-3xl font-bold mb-6" data-aos="fade-up">Our Mission</h2>
          <p className="text-2xl text-slate-700 font-medium leading-snug italic" data-aos="fade-up">
            "To build tools that feel like an extension of your mind—enabling teams 
            to reach their goals without the friction of legacy software."
          </p>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] px-8 py-16 md:px-16 text-center text-white shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to transform your workflow?</h2>
            <p className="text-indigo-100 mb-10 text-lg max-w-xl mx-auto">
              Join thousands of developers and project managers who have found 
              their rhythm with SynerySphere.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold shadow-lg hover:bg-indigo-50 transition-all">
                Get Started for Free
              </button>
              <button className="px-8 py-4 bg-indigo-500 bg-opacity-30 border border-indigo-400 rounded-full font-bold hover:bg-opacity-40 transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;