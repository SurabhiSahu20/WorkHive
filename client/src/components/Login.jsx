import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import logo from '../assets/Logo.png';
// import meeting_img from '../assets/meeting.png';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        team_code: '',
        password: '',
        role: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.role) {
            setMessage("⚠️ Please select a role (Admin or Member)");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4400/auth/login', formData);
            // Storage logic remains the same
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('user_email', JSON.stringify(response.data.user.email));
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            sessionStorage.setItem('role', JSON.stringify(response.data.user.role));
            sessionStorage.setItem('team_code', response.data.user.team_code);
            
            setMessage("✅ Login Successful!");
            setTimeout(() => navigate(`/home`), 1000);
        } catch (error) {
            setMessage(error.response?.data?.message || '❌ Error during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans text-slate-900">
            {/* Left Side: Login Form */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12"
            >
                <div className="mb-10">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl mb-6 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
                        TB
                    </div>
                    <p className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">Continue your journey</p>
                    <h1 className="text-4xl font-black mt-2">Welcome Back</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                    {/* Role Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700">Select Your Role</label>
                        <div className="flex gap-4">
                            {['admin', 'member'].map((r) => (
                                <label key={r} className="flex-1 cursor-pointer">
                                    <input
                                        type="radio" name="role" value={r}
                                        checked={formData.role === r}
                                        onChange={handleChange}
                                        className="hidden peer"
                                    />
                                    <div className="text-center py-3 rounded-xl border-2 border-slate-100 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-600 transition-all font-medium capitalize">
                                        {r}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div className="relative group">
                            <input
                                type="text" name="team_code" placeholder="Team Code (e.g. team@321)"
                                value={formData.team_code} onChange={handleChange} required
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="email" name="email" placeholder="Email Address"
                                value={formData.email} onChange={handleChange} required
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password" name="password" placeholder="Password"
                                value={formData.password} onChange={handleChange} required
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Log In'}
                    </button>

                    {message && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-center p-3 rounded-lg text-sm font-semibold ${message.includes('✅') ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}
                        >
                            {message}
                        </motion.div>
                    )}

                    <div className="text-center pt-4">
                        <p className="text-slate-500 text-sm">
                            Don't have an account? {' '}
                            <Link to="/signup" className="text-indigo-600 font-bold hover:underline">
                                Create new admin account
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>

            {/* Right Side: Visual Image Area */}
            <div className="hidden md:flex w-1/2 bg-indigo-50 items-center justify-center p-12">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-full max-w-lg aspect-square bg-white rounded-[3rem] shadow-2xl border border-white overflow-hidden"
                >
                    {/* Placeholder for meeting_img */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center justify-center p-12 text-center">
                        <div className="text-6xl mb-6">🤝</div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Connect with your team</h2>
                        <p className="text-slate-500 italic">"The strength of the team is each individual member. The strength of each member is the team."</p>
                    </div>
                    {/* <img src={meeting_img} alt="Meeting" className="w-full h-full object-cover" /> */}
                </motion.div>
            </div>
        </div>
    );
};

export default Login;