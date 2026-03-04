import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
// import logo from '../assets/Logo.png';
// import home_i from '../assets/home_i.png';

const Signup = () => {
    const [formData, setFormData] = useState({
        team_code: '',
        full_name: '',
        title: 'Project Lead', // Default title
        email: '',
        role: 'admin', 
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://workhive-9rx0.onrender.com/auth/signup', formData);
            toast.success(response.data.message || "Account created!");
            setTimeout(() => navigate('/login'), 2000); 
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error during signup';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans text-slate-900 overflow-hidden">
            
            {/* --- LEFT SIDE: IMAGE & QUOTE --- */}
            <div className="hidden md:flex w-1/2 bg-slate-50 items-center justify-center p-12 relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
                     style={{ backgroundImage: `radial-gradient(#6366F1 1px, transparent 0)`, backgroundSize: '30px 30px' }}></div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 text-center"
                >
                    <div className="bg-white p-4 rounded-[3rem] shadow-2xl border border-white mb-8">
                        {/* <img src={home_i} alt="Collaboration" className="rounded-[2.5rem] max-w-md" /> */}
                        <div className="w-[400px] h-[300px] bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-6xl">🚀</div>
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 italic">"The secret to getting ahead is getting started."</h2>
                </motion.div>
            </div>

            {/* --- RIGHT SIDE: FORM --- */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-12 bg-white"
            >
                <div className="mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl mb-6 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
                        TB
                    </div>
                    <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest">Start for free</p>
                    <h1 className="text-4xl font-black mt-1">Create new account</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
                    {/* Modern Role Selector */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Role</label>
                        <div className="flex gap-4">
                            <label className="flex-1 cursor-pointer">
                                <input 
                                    type="radio" name="role" value="admin"
                                    checked={formData.role === 'admin'}
                                    onChange={handleChange}
                                    className="hidden peer"
                                />
                                <div className="text-center py-3 rounded-xl border-2 border-slate-100 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-600 transition-all font-bold">
                                    Admin
                                </div>
                            </label>
                            {/* Option for member if needed, though default is admin for signup */}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <input
                                type="text" name="full_name" placeholder="Full Name"
                                value={formData.full_name} onChange={handleChange} required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm"
                            />
                        </div>
                        <div className="space-y-1">
                            <input
                                type="text" name="title" placeholder="Job Title (Ex: Lead)"
                                value={formData.title} onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm"
                            />
                        </div>
                    </div>

                    <input
                        type="email" name="email" placeholder="Email Address"
                        value={formData.email} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm"
                    />

                    <input
                        type="password" name="password" placeholder="Password"
                        value={formData.password} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm"
                    />

                    <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-2">Team Security</label>
                        <input
                            type="text" name="team_code" placeholder="Create Team Code (Ex-team@321)"
                            value={formData.team_code} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-white border border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all text-sm font-mono"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div className="text-center pt-2">
                        <p className="text-slate-500 text-sm">
                            Already have an account? {' '}
                            <Link to="/login" className="text-indigo-600 font-bold hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>

            <ToastContainer position="top-right" autoClose={3000} theme="light" />
        </div>
    );
};

export default Signup;