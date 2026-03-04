import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const MainHome = () => {
  const name = sessionStorage.getItem('full_name') || "User";
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const menuItems = [
    { id: 1, title: "Task Management", icon: "📊", path: "/task", bg: "bg-amber-50 text-amber-600" },
    { id: 2, title: "Documents", icon: "📄", path: "/documents", bg: "bg-emerald-50 text-emerald-600" },
    { id: 3, title: "Whiteboard", icon: "🖊️", path: "/whiteboard", bg: "bg-blue-50 text-blue-600" },
    { id: 4, title: "Messaging", icon: "💬", path: "/chat", bg: "bg-purple-50 text-purple-600" },
    { id: 5, title: "Calendar", icon: "📅", path: "/calendar", bg: "bg-pink-50 text-pink-600" }
  ];

  const pieData = [
    { name: 'Completed', value: 65, color: '#10B981' },
    { name: 'In Progress', value: 25, color: '#F59E0B' },
    { name: 'Pending', value: 10, color: '#EF4444' }
  ];

  const lineData = [
    { name: 'Mon', tasks: 12 }, { name: 'Tue', tasks: 19 },
    { name: 'Wed', tasks: 15 }, { name: 'Thu', tasks: 25 },
    { name: 'Fri', tasks: 22 }, { name: 'Sat', tasks: 18 }, { name: 'Sun', tasks: 8 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      
      {/* --- TOP NAVIGATION --- */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-black">TB</span>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">Task Bridge</span>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <button onClick={() => navigate('/team')} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors hidden md:block">Team</button>
          <button onClick={() => navigate('/about')} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors hidden md:block">About</button>
          <div 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 bg-slate-100 p-1.5 pr-4 rounded-full cursor-pointer hover:bg-slate-200 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs uppercase">
              {name.charAt(0)}
            </div>
            <span className="text-sm font-bold hidden md:block">{name.split(' ')[0]}</span>
          </div>
        </div>
      </motion.nav>

      <div className="flex flex-1 overflow-hidden">
        {/* --- SIDEBAR --- */}
        <motion.aside 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 lg:w-64 bg-white border-r border-slate-200 p-4 hidden md:flex flex-col gap-2"
        >
          <div className="mb-6 px-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace</div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 group transition-all"
            >
              <span className={`text-xl p-2 rounded-lg ${item.bg} group-hover:scale-110 transition-transform`}>{item.icon}</span>
              <span className="font-semibold text-slate-600 group-hover:text-slate-900 hidden lg:block">{item.title}</span>
            </button>
          ))}
        </motion.aside>

        {/* --- MAIN DASHBOARD --- */}
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8"
        >
          {/* Welcome Header */}
          <motion.header variants={itemVariants}>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              Good Morning, <span className="text-indigo-600">{name.split(' ')[0]}</span>! 👋
            </h2>
            <p className="text-slate-500 font-medium mt-1">Here's a summary of your workspace today.</p>
          </motion.header>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Tasks', val: '234', growth: '+12%', color: 'text-indigo-600' },
              { label: 'Active Meetings', val: '8', growth: '3 pending', color: 'text-amber-600' },
              { label: 'Team Online', val: '18/24', growth: 'Live now', color: 'text-emerald-600' },
              { label: 'Completion Rate', val: '87%', growth: '+5%', color: 'text-purple-600' }
            ].map((stat, i) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={i} 
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-shadow hover:shadow-md"
              >
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h4 className={`text-3xl font-black ${stat.color}`}>{stat.val}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{stat.growth}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Area */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                Weekly Performance
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis hide />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="tasks" stroke="#6366F1" strokeWidth={4} dot={{r: 4, fill: '#6366F1'}} activeDot={{r: 8}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Task Distribution
              </h3>
              <div className="h-[250px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                      {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 ml-4">
                  {pieData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}} />
                      <span className="text-[10px] font-black text-slate-500 uppercase">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Section */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black tracking-tight">Upcoming Deadlines</h3>
              <button onClick={() => navigate('/task')} className="text-indigo-600 font-bold text-xs uppercase tracking-widest hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Project Presentation', time: '14:00', priority: 'High', color: 'bg-rose-100 text-rose-600' },
                { title: 'Code Review', time: '16:30', priority: 'Medium', color: 'bg-amber-100 text-amber-600' }
              ].map((task, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-8 bg-indigo-500 rounded-full" />
                    <div>
                      <h4 className="font-bold text-slate-800">{task.title}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">🕒 {task.time} PM</p>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${task.color}`}>
                    {task.priority}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default MainHome;