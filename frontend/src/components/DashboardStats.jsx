import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, BookOpen, Award, Users, Loader, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchDashboardStats, fetchStudentProgressSummary, fetchActivityMetrics } from '../services/teacherService';

/**
 * Tarjeta de estadísticas clave (KPI) - Claymorphism Design
 */
export function StatsCard({ icon: Icon, label, value, change, darkMode }) {
  return (
    <div className={`relative overflow-hidden p-8 rounded-[2rem] border transition-all duration-500 transform hover:scale-[1.02] ${
      darkMode 
        ? 'bg-slate-800/40 border-slate-700/50 shadow-2xl shadow-black/20' 
        : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'
    }`}>
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className={`text-xs font-black uppercase tracking-widest mb-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {label}
          </p>
          <p className={`text-4xl font-black mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {value}
          </p>
          {change !== undefined && (
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black border ${
              change >= 0 
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
            }`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${
          darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
        }`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </div>
      <div className={`absolute -right-8 -bottom-8 opacity-5 ${darkMode ? 'text-white' : 'text-indigo-600'}`}>
        <Icon size={120} strokeWidth={1} />
      </div>
    </div>
  );
}

/**
 * Gráfica de progreso de estudiantes - Claymorphism Design
 */
export function ProgressChart({ students, isLoading, darkMode }) {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-80 rounded-[2rem] border transition-colors ${darkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-slate-100'}`}>
        <Loader className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  const data = students
    .map(s => ({
      name: s.username?.substring(0, 10) || 'Student',
      completion: s.overall_percent || 0
    }))
    .slice(0, 8)
    .sort((a, b) => b.completion - a.completion);

  if (data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-80 rounded-[2rem] border transition-colors ${darkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-slate-100'}`}>
        <p className={`font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No hay datos de estudiantes</p>
      </div>
    );
  }

  return (
    <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 ${
      darkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-slate-100 shadow-xl'
    }`}>
      <h3 className={`text-xl font-black mb-8 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        <TrendingUp className="text-indigo-500" size={20} />
        Progreso de Estudiantes
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12, fontWeight: 600 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12, fontWeight: 600 }} unit="%" />
            <Tooltip 
              cursor={{ fill: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}
              contentStyle={{ 
                backgroundColor: darkMode ? '#1e293b' : '#fff', 
                borderRadius: '20px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                color: darkMode ? '#f8fafc' : '#1e293b'
              }}
            />
            <Bar dataKey="completion" fill="#6366f1" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.completion > 70 ? '#10b981' : '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/**
 * Distribución de estudiantes por nivel - Claymorphism Design
 */
export function LevelDistribution({ students, isLoading, darkMode }) {
  if (isLoading) return null;

  const levelCounts = students.reduce((acc, s) => {
    const level = s.level_code || 'Sin nivel';
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(levelCounts).map(([name, value]) => ({
    name,
    value,
    percentage: Math.round((value / Math.max(students.length, 1)) * 100)
  }));

  if (data.length === 0) return null;

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

  return (
    <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 ${
      darkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-slate-100 shadow-xl'
    }`}>
      <h3 className={`text-xl font-black mb-8 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        <Award className="text-purple-500" size={20} />
        Distribución por Nivel
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#1e293b' : '#fff', 
                borderRadius: '20px', 
                border: 'none',
                color: darkMode ? '#f8fafc' : '#1e293b'
              }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/**
 * Gráfica de actividad por día (últimos 7 días) - Claymorphism Design
 */
export function ActivityChart({ data, isLoading, darkMode }) {
  if (isLoading) return null;

  return (
    <div className={`mt-8 p-8 rounded-[2.5rem] border transition-all duration-500 ${
      darkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-slate-100 shadow-xl'
    }`}>
      <h3 className={`text-xl font-black mb-8 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        <Clock className="text-emerald-500" size={20} />
        Actividad Semanal
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#1e293b' : '#fff', 
                borderRadius: '20px', 
                border: 'none',
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" />
            <Line 
              type="monotone" 
              dataKey="logins" 
              name="Inicios de Sesión" 
              stroke="#6366f1" 
              strokeWidth={4} 
              dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: darkMode ? '#1e293b' : '#fff' }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/**
 * Componente principal de estadísticas del dashboard
 */
export function DashboardStats({ filters = {}, darkMode = false }) {
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [statsData, studentsData, activity] = await Promise.all([
          fetchDashboardStats(),
          fetchStudentProgressSummary(),
          fetchActivityMetrics()
        ]);
        setStats(statsData);
        setStudents(studentsData || []);
        setActivityData(activity || []);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [filters]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={Users} label="Total Estudiantes" value={stats?.total_students || 0} change={12} darkMode={darkMode} />
        <StatsCard icon={TrendingUp} label="Progreso Promedio" value={`${stats?.avg_progress || 0}%`} change={5} darkMode={darkMode} />
        <StatsCard icon={Award} label="Tareas Completadas" value={stats?.completed_tasks || 0} change={8} darkMode={darkMode} />
        <StatsCard icon={BookOpen} label="Sesiones Hoy" value={stats?.active_today || 0} change={-2} darkMode={darkMode} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProgressChart students={students} isLoading={loading} darkMode={darkMode} />
        <LevelDistribution students={students} isLoading={loading} darkMode={darkMode} />
      </div>

      <ActivityChart data={activityData} isLoading={loading} darkMode={darkMode} />
    </div>
  );
}
