import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Edit3, Trash2, UserPlus, FileDown, ArrowLeft, X, Mail, Briefcase, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TeamMembers = () => {
  const team_code = sessionStorage.getItem('team_code')?.replace(/['"]+/g, '');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  
  const [members, setMembers] = useState([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    title: '',
    email: '',
    role: '',
    password: '',
    team_code: team_code,
  });

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  // --- API LOGIC ---

  const fetchMembers = async () => {
    if (!team_code || !token) {
      toast.error('Session expired. Please login.');
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`https://workhive-9rx0.onrender.com/team/${team_code}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [team_code]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.role || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const userData = {
        ...formData,
        full_name: formData.full_name.trim(),
        email: formData.email.toLowerCase().trim(),
        role: formData.role.toLowerCase(),
      };

      await axios.post('https://workhive-9rx0.onrender.com/team/new_user', userData);
      await fetchMembers();
      setIsAddDialogOpen(false);
      setFormData({ full_name: '', title: '', email: '', role: '', password: '', team_code: team_code });
      toast.success('Member added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (userData) => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await axios.patch(
        `https://workhive-9rx0.onrender.com/team/user/${selectedUser.full_name}/${team_code}/edit`,
        userData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchMembers();
      toast.success('User updated!');
      setShowEditDialog(false);
    } catch (error) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user) => {
    if (window.confirm(`Delete ${user.full_name}?`)) {
      setLoading(true);
      try {
        await axios.delete(`https://workhive-9rx0.onrender.com/team/user/${user.full_name}/${team_code}/delete`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await fetchMembers();
        toast.success('Member removed');
      } catch (error) {
        toast.error('Deletion failed');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleExportData = () => {
    if (!fileName) return toast.error('Enter file name');
    const filtered = members.map(m => ({ Name: m.full_name, Title: m.title, Email: m.email, Role: m.role }));
    const csv = generateCsv(csvConfig)(filtered);
    download(csvConfig)(csv, `${fileName}.csv`);
    setIsExportDialogOpen(false);
    setFileName('');
    toast.success('CSV Downloaded!');
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- TABLE COLUMNS ---

  const columns = useMemo(() => [
    {
      accessorKey: 'full_name',
      header: 'Member',
      Cell: ({ row }) => (
        <Box className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shadow-sm">
            {row.original.full_name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 leading-none">{row.original.full_name}</span>
            <span className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">{row.original.title || 'Team Member'}</span>
          </div>
        </Box>
      ),
    },
    { accessorKey: 'email', header: 'Email Address' },
    { 
      accessorKey: 'role', 
      header: 'Role',
      Cell: ({ cell }) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
          cell.getValue() === 'admin' 
            ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
            : 'bg-slate-50 text-slate-500 border-slate-100'
        }`}>
          {cell.getValue()}
        </span>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box className="flex gap-1">
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => { setSelectedUser(row.original); setShowEditDialog(true); }}>
              <Edit3 size={16} className="text-slate-400 hover:text-indigo-600 transition-colors" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleDeleteUser(row.original)}>
              <Trash2 size={16} className="text-slate-400 hover:text-rose-600 transition-colors" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ], [members]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans antialiased text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Team Hub</h1>
            <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
               Workspace: <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-lg text-xs font-black uppercase tracking-widest">{team_code}</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('/home')} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 transition-all hover:shadow-sm">
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={() => setIsExportDialogOpen(true)}
              className="px-5 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <FileDown size={18} /> Export
            </button>
            <button 
              onClick={() => setIsAddDialogOpen(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 flex items-center gap-2 transition-all active:scale-95"
            >
              <UserPlus size={18} /> Add Member
            </button>
          </div>
        </header>

        {/* --- TABLE CONTAINER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden"
        >
          <MaterialReactTable
            columns={columns}
            data={members}
            state={{ isLoading: loading }}
            muiTablePaperProps={{ elevation: 0 }}
            muiTableHeadCellProps={{
              sx: {
                backgroundColor: '#f8fafc',
                color: '#94a3b8',
                fontSize: '10px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                py: 3,
                px: 4
              }
            }}
          />
        </motion.div>

        {/* --- DIALOGS (Add, Edit, Export) --- */}
        
        {/* Add Member */}
        <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} PaperProps={{ sx: { borderRadius: '2rem', p: 1 } }}>
          <DialogTitle className="flex justify-between items-center px-6 pt-6">
            <span className="font-black text-2xl tracking-tight">New Member</span>
            <IconButton onClick={() => setIsAddDialogOpen(false)}><X /></IconButton>
          </DialogTitle>
          <DialogContent className="px-6 space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none font-bold text-sm">
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none font-bold text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none font-bold text-sm" />
            </div>
          </DialogContent>
          <DialogActions className="px-8 pb-8 pt-4">
            <button onClick={() => setIsAddDialogOpen(false)} className="px-6 py-3 font-bold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
            <button onClick={handleAddUser} className="px-8 py-3 bg-indigo-600 text-white font-black rounded-xl shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700">Add Member</button>
          </DialogActions>
        </Dialog>

        {/* Edit Member */}
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)} PaperProps={{ sx: { borderRadius: '2rem', p: 1 } }}>
          <DialogTitle className="font-black text-2xl px-6 pt-6 tracking-tight">Modify Member</DialogTitle>
          <DialogContent className="px-6 pt-2">
            {selectedUser && (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleEditUser(selectedUser); }}>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" value={selectedUser.full_name} readOnly className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-400 font-bold text-sm cursor-not-allowed" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Title</label>
                    <input type="text" value={selectedUser.title} onChange={(e) => setSelectedUser({...selectedUser, title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none font-bold text-sm" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                    <input type="email" value={selectedUser.email} onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none font-bold text-sm" />
                </div>
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowEditDialog(false)} className="flex-1 py-3 font-bold text-slate-400">Cancel</button>
                    <button type="button" onClick={() => handleEditUser(selectedUser)} className="flex-1 py-3 bg-indigo-600 text-white font-black rounded-xl shadow-lg shadow-indigo-100">Save Changes</button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Export Dialog */}
        <Dialog open={isExportDialogOpen} onClose={() => setIsExportDialogOpen(false)} PaperProps={{ sx: { borderRadius: '2rem' } }}>
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6"><FileDown size={32} /></div>
            <h3 className="text-xl font-black mb-2 tracking-tight">Export Data</h3>
            <p className="text-slate-500 text-sm mb-6">Download your team directory as a CSV file.</p>
            <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl mb-6 text-center font-bold" placeholder="filename-2026" />
            <button onClick={handleExportData} className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl shadow-lg shadow-indigo-100">Download Directory</button>
          </div>
        </Dialog>

        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};

export default TeamMembers;