import React, { useState, useEffect } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { BarChart3, Users, AlertCircle, LogOut, Sun, Moon, ChevronLeft, ChevronRight, Plus, Edit2, X, Save } from 'lucide-react';
import { apiFetch } from '../utils/api';

export default function TeacherDashboard() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, active: 0, avgProgress: 0 });
  const [createForm, setCreateForm] = useState({ username: '', email: '', password: '', level_code: 'a1-1' });
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', email: '', level_code: '', password: '' });
  const [updating, setUpdating] = useState(false);

  const applyThemeMode = (darkEnabled) => {
    document.documentElement.classList.toggle('dark', darkEnabled);
    document.body.classList.toggle('dark', darkEnabled);
  };

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('teacherTheme') || localStorage.getItem('theme');
    const darkEnabled = savedTheme !== 'light';
    setIsDark(darkEnabled);
    applyThemeMode(darkEnabled);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyThemeMode(newTheme);
    const nextTheme = newTheme ? 'dark' : 'light';
    localStorage.setItem('teacherTheme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  // Load students
  useEffect(() => {
    loadStudents();
    loadStats();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/teacher/students/');
      setStudents(data || []);
      setError('');
    } catch (err) {
      setError('Error loading students');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await apiFetch('/teacher/dashboard/stats/');
      setStats(data || { total: 0, active: 0, avgProgress: 0 });
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    if (!createForm.username || !createForm.email || !createForm.password) {
      setError('Please fill in all fields');
      return;
    }

    setCreating(true);
    try {
      const newStudent = await apiFetch('/teacher/students/', {
        method: 'POST',
        body: JSON.stringify(createForm),
      });
      setStudents([...students, newStudent]);
      setCreateForm({ username: '', email: '', password: '', level_code: 'a1-1' });
      setError('');
    } catch (err) {
      setError('Error creating student');
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const startEditStudent = (student) => {
    setEditingId(student.id);
    setEditForm({
      username: student.username,
      email: student.email,
      level_code: student.level?.code || 'a1-1',
      password: '', // Empty password field
    });
  };

  const cancelEditStudent = () => {
    setEditingId(null);
    setEditForm({ username: '', email: '', level_code: '', password: '' });
  };

  const handleUpdateStudent = async (studentId) => {
    if (!editForm.username || !editForm.email) {
      setError('Please fill in all required fields');
      return;
    }

    setUpdating(true);
    try {
      const updateData = {
        username: editForm.username,
        email: editForm.email,
        level_code: editForm.level_code,
      };
      
      // Only include password if it's provided
      if (editForm.password && editForm.password.trim() !== '') {
        updateData.password = editForm.password;
      }

      const updatedStudent = await apiFetch(`/teacher/students/${studentId}/`, {
        method: 'PATCH',
        body: JSON.stringify(updateData),
      });
      
      setStudents(students.map(s => s.id === studentId ? updatedStudent : s));
      setEditingId(null);
      setEditForm({ username: '', email: '', level_code: '', password: '' });
      setError('');
    } catch (err) {
      setError('Error updating student');
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const menuItems = [
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertCircle },
    { id: 'manage', label: 'Students', icon: Users },
  ];

  const shellBgClass = isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900';
  const panelClass = isDark
    ? 'bg-slate-900 border-slate-700'
    : 'bg-white border-slate-200';
  const sidebarClass = isDark
    ? 'bg-slate-900 border-slate-700'
    : 'bg-white border-slate-200';

  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen transition-colors duration-300 ${shellBgClass}`}>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen transition-all duration-300 z-50 border-r shadow-xl ${sidebarClass} ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/5">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                T
              </div>
              <span className="font-black text-xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                Teacher
              </span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white mx-auto">
              T
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200 border border-indigo-500/30' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
              }`}
            >
              <item.icon size={22} />
              {!isCollapsed && <span className="font-bold">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-200 dark:border-white/5 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-4 p-3 rounded-2xl text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            {isDark ? <Sun size={22} className="mx-auto md:mx-0" /> : <Moon size={22} className="mx-auto md:mx-0" />}
            {!isCollapsed && <span className="font-bold text-sm">{isDark ? 'Light' : 'Dark'}</span>}
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center gap-4 p-3 rounded-2xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            {isCollapsed ? <ChevronRight size={22} className="mx-auto" /> : (
              <>
                <ChevronLeft size={22} />
                <span className="font-bold text-sm">Collapse</span>
              </>
            )}
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-4 p-3 rounded-2xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={22} className="mx-auto md:mx-0" />
            {!isCollapsed && <span className="font-bold">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 min-h-screen ${isCollapsed ? 'pl-20' : 'pl-64'}`}>
        <div className="max-w-[1600px] mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-700 dark:from-white dark:via-indigo-200 dark:to-slate-400 bg-clip-text text-transparent">
              Teacher Dashboard
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Welcome, {user?.username}! Monitor your students' progress.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300 flex justify-between items-center">
              <span className="font-semibold">{error}</span>
              <button onClick={() => setError('')} className="text-rose-600 dark:text-rose-400 hover:opacity-70">✕</button>
            </div>
          )}

          {/* Tabs */}
          <div className={`mb-8 rounded-[2rem] shadow-xl p-2 flex gap-2 flex-wrap border ${panelClass}`}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-8 shadow-xl text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-white/80 text-sm font-bold">TOTAL STUDENTS</div>
                    <Users size={32} className="text-white/60" />
                  </div>
                  <div className="text-5xl font-black mb-2">{students.length}</div>
                  <div className="text-white/70 text-sm">All registered students</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[2rem] p-8 shadow-xl text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-white/80 text-sm font-bold">ACTIVE TODAY</div>
                    <BarChart3 size={32} className="text-white/60" />
                  </div>
                  <div className="text-5xl font-black mb-2">{stats.active || 0}</div>
                  <div className="text-white/70 text-sm">Students active in last 24h</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-[2rem] p-8 shadow-xl text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-white/80 text-sm font-bold">AVG PROGRESS</div>
                    <AlertCircle size={32} className="text-white/60" />
                  </div>
                  <div className="text-5xl font-black mb-2">{Math.round(stats.avgProgress || 0)}%</div>
                  <div className="text-white/70 text-sm">Average completion rate</div>
                </div>
              </div>

              {/* Progress Chart */}
              <div className={`rounded-[2rem] p-8 border shadow-xl ${panelClass}`}>
                <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">Student Progress Distribution</h3>
                <div className="space-y-4">
                  {/* Progress Bar 1 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-100">0-25% Complete</span>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        {students.filter(s => (s.progress || 0) <= 25).length} students
                      </span>
                    </div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${(students.filter(s => (s.progress || 0) <= 25).length / Math.max(students.length, 1)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Progress Bar 2 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-100">26-50% Complete</span>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        {students.filter(s => (s.progress || 0) > 25 && (s.progress || 0) <= 50).length} students
                      </span>
                    </div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${(students.filter(s => (s.progress || 0) > 25 && (s.progress || 0) <= 50).length / Math.max(students.length, 1)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Progress Bar 3 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-100">51-75% Complete</span>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        {students.filter(s => (s.progress || 0) > 50 && (s.progress || 0) <= 75).length} students
                      </span>
                    </div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${(students.filter(s => (s.progress || 0) > 50 && (s.progress || 0) <= 75).length / Math.max(students.length, 1)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Progress Bar 4 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-100">76-100% Complete</span>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        {students.filter(s => (s.progress || 0) > 75).length} students
                      </span>
                    </div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${(students.filter(s => (s.progress || 0) > 75).length / Math.max(students.length, 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Level Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`rounded-[2rem] p-8 border shadow-xl ${panelClass}`}>
                  <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">Level Distribution</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl border border-indigo-100 dark:border-indigo-800/80">
                      <div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white">A1.1</div>
                        <div className="text-sm text-slate-600 dark:text-slate-200">Beginner Level</div>
                      </div>
                      <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                        {students.filter(s => s.level?.code === 'a1-1').length}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-950/60 rounded-xl border border-purple-100 dark:border-purple-800/80">
                      <div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white">A1.2</div>
                        <div className="text-sm text-slate-600 dark:text-slate-200">Elementary Level</div>
                      </div>
                      <div className="text-3xl font-black text-purple-600 dark:text-purple-400">
                        {students.filter(s => s.level?.code === 'a1-2').length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-[2rem] p-8 border shadow-xl ${panelClass}`}>
                  <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-200">Total Enrolled</div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">{students.length}</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-200">Active Students</div>
                      <div className="text-2xl font-black text-green-600 dark:text-green-400">{stats.active || 0}</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-200">Completion Rate</div>
                      <div className="text-2xl font-black text-orange-600 dark:text-orange-400">{Math.round(stats.avgProgress || 0)}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className={`rounded-[2rem] p-8 border shadow-xl ${panelClass}`}>
              <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">Low Progress Alerts</h2>
              <p className="text-slate-600 dark:text-slate-300">No students with low progress at the moment.</p>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`rounded-[2rem] p-8 border shadow-xl ${panelClass}`}>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                  <Plus size={24} />
                  Create Student
                </h2>
                <form onSubmit={handleCreateStudent} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-100">Username</label>
                    <input 
                      type="text" 
                      placeholder="student_name" 
                      value={createForm.username}
                      onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-100">Email</label>
                    <input 
                      type="email" 
                      placeholder="student@example.com" 
                      value={createForm.email}
                      onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-100">Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={createForm.password}
                      onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-100">Level</label>
                    <select 
                      value={createForm.level_code}
                      onChange={(e) => setCreateForm({ ...createForm, level_code: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none transition-colors">
                      <option value="a1-1">A1.1</option>
                      <option value="a1-2">A1.2</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    disabled={creating}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-400 disabled:to-purple-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg">
                    {creating ? 'Creating...' : 'Create Student'}
                  </button>
                </form>
              </div>

              <div className={`lg:col-span-2 rounded-[2rem] p-8 border shadow-xl ${panelClass}`}>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                  <Users size={24} />
                  Students ({students.length})
                </h2>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600"></div>
                  </div>
                ) : students.length === 0 ? (
                  <p className="text-slate-600 dark:text-slate-300">No students yet.</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {students.map((student) => (
                      <div key={student.id}>
                        {editingId === student.id ? (
                          // Edit Mode
                          <div className="p-4 rounded-xl border-2 border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-slate-800 space-y-3">
                            <div>
                              <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-100">Username</label>
                              <input 
                                type="text" 
                                value={editForm.username}
                                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none transition-colors" 
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-100">Email</label>
                              <input 
                                type="email" 
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none transition-colors" 
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-100">
                                Password <span className="text-slate-500 dark:text-slate-400 font-normal">(leave empty to keep current)</span>
                              </label>
                              <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={editForm.password}
                                onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none transition-colors" 
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-100">Level</label>
                              <select 
                                value={editForm.level_code}
                                onChange={(e) => setEditForm({ ...editForm, level_code: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none transition-colors">
                                <option value="a1-1">A1.1</option>
                                <option value="a1-2">A1.2</option>
                              </select>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleUpdateStudent(student.id)}
                                disabled={updating}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-green-400 disabled:to-emerald-400 text-white font-bold py-2 rounded-lg transition-all text-sm shadow-lg">
                                <Save size={16} />
                                {updating ? 'Saving...' : 'Save'}
                              </button>
                              <button 
                                onClick={cancelEditStudent}
                                disabled={updating}
                                className="flex-1 flex items-center justify-center gap-2 bg-slate-500 hover:bg-slate-600 disabled:bg-slate-400 text-white font-bold py-2 rounded-lg transition-all text-sm shadow-lg">
                                <X size={16} />
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <div className={`p-4 rounded-xl border-2 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all ${isDark ? 'border-slate-700 bg-slate-900 hover:bg-slate-800' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-bold text-slate-900 dark:text-white">{student.username}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-200">{student.email}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
                                  {student.level?.code || 'N/A'}
                                </span>
                                <button 
                                  onClick={() => startEditStudent(student)}
                                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
                                  <Edit2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
