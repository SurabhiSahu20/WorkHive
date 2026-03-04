import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Trash2, ChevronDown, MessageSquare, Filter, RefreshCcw, MoreHorizontal, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedLabel, setSelectedLabel] = useState('All');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'All',
    location: 'All',
    status: 'Draft',
    description: '',
  });

  const stages = ['All', 'todo', 'in progress', 'review', 'done'];
  const categories = ['All', 'Marketing', 'Sales', 'HR', 'Development', 'Design', 'Operations'];

  // --- INITIALIZATION ---
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    const teamCode = sessionStorage.getItem('team_code');
    if (token && storedUser && teamCode) {
      setUser({
        _id: storedUser.userID,
        team_code: teamCode,
        isAdmin: storedUser.role === 'admin',
        full_name: storedUser.full_name,
      });
    }
  }, []);

  // --- FETCH LOGIC ---
  const fetchTasks = async () => {
    if (!user) return;
    setLoading(true);
    try {
      let url = `https://task-bridge-eyh5.onrender.com/api/tasks/${user.team_code}`;
      if (selectedStage !== 'All') {
        url = `https://task-bridge-eyh5.onrender.com/api/tasks/stage/${selectedStage}/${user.team_code}`;
      }
      if (searchTerm) url += `?search=${searchTerm}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });
      const data = await response.json();
      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user, searchTerm, selectedStage]);

  // --- ACTION LOGIC (FIXES THE ERROR) ---
  const handleAddTask = async () => {
    if (!user || !user.isAdmin) {
      alert('Only admins can create tasks');
      return;
    }
    try {
      const taskData = {
        ...newTask,
        title: newTask.title || 'Untitled',
        date: new Date(newTask.date).toISOString(),
        category: newTask.category === 'All' ? undefined : newTask.category,
        priority: 'normal',
        stage: 'todo',
        team: [user._id],
        team_code: user.team_code,
      };

      const response = await fetch('https://task-bridge-eyh5.onrender.com/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error('Failed to add task');
      
      await fetchTasks(); // Refresh list
      setIsModalOpen(false);
      setNewTask({ title: '', date: new Date().toISOString().split('T')[0], category: 'All', location: 'All', status: 'Draft', description: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!user.isAdmin) return;
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`https://task-bridge-eyh5.onrender.com/api/tasks/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });
      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // --- UI HELPERS ---
  const getStageStyle = (stage) => {
    const styles = {
      'todo': 'bg-slate-100 text-slate-600 border-slate-200',
      'in progress': 'bg-blue-50 text-blue-600 border-blue-100',
      'review': 'bg-amber-50 text-amber-600 border-amber-100',
      'done': 'bg-emerald-50 text-emerald-600 border-emerald-100'
    };
    return styles[stage] || 'bg-gray-50 text-gray-500';
  };

  if (!user) return <div className="p-20 text-center font-bold text-slate-400 italic">Please log in to explore projects...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Project Explorer</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              Team Workspace: <span className="text-indigo-600 font-bold uppercase">{user.team_code}</span>
            </p>
          </div>
          {user.isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus size={20} strokeWidth={3} />
              New Task
            </button>
          )}
        </header>

        {/* --- FILTERS & SEARCH BAR --- */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-2 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Find a task..."
                className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 font-medium text-slate-700 placeholder:text-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="hidden lg:flex items-center gap-4 px-4 border-l border-slate-100">
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-slate-400" />
                <select 
                  value={selectedStage} 
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="bg-transparent border-none text-sm font-bold text-slate-600 focus:ring-0 cursor-pointer"
                >
                  {stages.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                </select>
              </div>
              <button onClick={() => { setSearchTerm(''); setSelectedStage('All'); }} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                <RefreshCcw size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* --- TABLE AREA --- */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Task Title</th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Stage</th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Members</th>
                  <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Due Date</th>
                  <th className="py-5 px-8 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                   <tr><td colSpan={5} className="py-20 text-center text-slate-300 font-bold animate-pulse">Loading...</td></tr>
                ) : tasks.map((task) => (
                  <motion.tr layout key={task._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-5 px-8 font-bold text-slate-800">{task.title}</td>
                    <td className="py-5 px-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStageStyle(task.stage)}`}>
                        {task.stage}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex -space-x-2">
                        {task.team?.slice(0, 3).map((m, i) => (
                          <div key={i} className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase">
                            {m.full_name?.charAt(0) || 'U'}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-slate-400 font-medium text-xs">
                       {new Date(task.date).toLocaleDateString()}
                    </td>
                    <td className="py-5 px-8 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {user.isAdmin && (
                          <button onClick={() => handleDeleteTask(task._id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                            <Trash2 size={16} />
                          </button>
                        )}
                        <button className="p-2 text-slate-400 hover:text-slate-900"><MoreHorizontal size={16} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- MODAL --- */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl p-8">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Create New Task</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Task Title" className="w-full px-5 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                  <div className="grid grid-cols-2 gap-4">
                    <select value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })} className="px-5 py-4 bg-slate-50 rounded-2xl font-bold focus:outline-none">
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input type="date" className="px-5 py-4 bg-slate-50 rounded-2xl font-bold focus:outline-none" value={newTask.date} onChange={(e) => setNewTask({ ...newTask, date: e.target.value })} />
                  </div>
                  <textarea rows="3" placeholder="Description..." className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-medium text-sm focus:outline-none" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
                </div>
                <div className="mt-8 flex gap-4">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-bold text-slate-400">Cancel</button>
                  <button onClick={handleAddTask} className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700">Publish Task</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectExplorer; 