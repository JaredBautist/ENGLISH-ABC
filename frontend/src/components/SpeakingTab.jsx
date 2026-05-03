import React, { useEffect, useMemo, useState } from 'react';
import { Mic2, Play, Square, RefreshCw, Volume2, CheckCircle, Star } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Pronunciation: The Alphabet',
    level: 'A1.1',
    description: 'Listen and repeat the letters. Focus on A, E, I, O, U.',
    points: 30,
    week: 1,
    videoTitle: 'Alphabet Pronunciation (Repeat after me)',
    videoUrl: 'https://www.youtube.com/embed/LEMvoD3OogE'
  },
  {
    id: 3,
    title: 'Greetings Role Play',
    level: 'A1.1',
    description: 'Practice hello, good morning, nice to meet you, and goodbye with a partner.',
    points: 35,
    week: 2,
    videoTitle: 'Greetings and Introduction Role Play',
    videoUrl: 'https://www.youtube.com/embed/KKh_CallEp8'
  },
  {
    id: 4,
    title: 'Numbers Speaking Drill',
    level: 'A1.1',
    description: 'Say numbers 1-20, then 30, 40, 50...100 with clear pronunciation.',
    points: 40,
    week: 3,
    videoTitle: 'Numbers 1-100 Pronunciation Practice',
    videoUrl: 'https://www.youtube.com/embed/YuXFxvTbviI'
  },
  {
    id: 5,
    title: 'Colors Around Me',
    level: 'A1.1',
    description: 'Name 10 objects around you and say their colors in English.',
    points: 45,
    week: 4,
    videoTitle: 'Colors Vocabulary for Beginners',
    videoUrl: 'https://www.youtube.com/embed/qhOTU8_1Af4'
  },
  {
    id: 6,
    title: 'Introduce My Family',
    level: 'A1.1',
    description: 'Say 6-8 lines introducing family members and basic information.',
    points: 50,
    week: 5,
    videoTitle: 'Family Introduction A1 Conversation',
    videoUrl: 'https://www.youtube.com/embed/1SW2chEavc0'
  },
  {
    id: 7,
    title: 'Days and Months Speaking',
    level: 'A1.1',
    description: 'Say days of the week and months clearly. Then say your birthday date.',
    points: 55,
    week: 6,
    videoTitle: 'Days and Months Pronunciation',
    videoUrl: 'https://www.youtube.com/embed/bGzwyWBbiHM'
  },
  {
    id: 8,
    title: 'Action Verbs in Present',
    level: 'A1.1',
    description: 'Say 10 short sentences with action verbs (I eat, I read, I study, etc.).',
    points: 60,
    week: 7,
    videoTitle: 'Common Action Verbs',
    videoUrl: 'https://www.youtube.com/embed/TOBrnsnDNEU'
  },
  {
    id: 9,
    title: 'A1.1 Final Oral Review',
    level: 'A1.1',
    description: 'Do a 1-minute oral review: self intro, family, numbers, colors, and routine.',
    points: 80,
    week: 8,
    videoTitle: 'A1 Review Conversation Practice',
    videoUrl: 'https://www.youtube.com/embed/sMkzwmMs0jM'
  },
  {
    id: 2,
    title: 'Self-Introduction Speech',
    level: 'A1.2',
    description: 'Record yourself introducing yourself: "Hello, my name is... I am from... I am... years old."',
    points: 100
  }
];

export default function SpeakingTab({ levelId = 'a1-2' }) {
  const [activeTask, setActiveTask] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const levelLabel = levelId.toUpperCase().replace('-', '.');
  const levelTasks = useMemo(
    () => tasks.filter((task) => task.level.toLowerCase() === levelLabel.toLowerCase()),
    [levelLabel]
  );

  useEffect(() => {
    if (!activeTask) return;
    const stillAvailable = levelTasks.some((task) => task.id === activeTask.id);
    if (!stillAvailable) {
      setActiveTask(null);
      setHasRecorded(false);
      setIsRecording(false);
    }
  }, [levelTasks, activeTask]);

  return (
    <div className="p-8 lg:p-12 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black flex items-center gap-3 text-white">
          <Mic2 className="text-indigo-500" size={32} />
          Speaking Practice
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tasks List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-black text-white px-2">Voice Tasks</h3>
          {levelTasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => {
                setActiveTask(task);
                setHasRecorded(false);
              }}
              className={`p-6 rounded-[2rem] border cursor-pointer transition-all duration-300 ${
                activeTask?.id === task.id
                  ? 'bg-indigo-500/20 border-indigo-500/50 shadow-lg'
                  : 'bg-slate-800/40 border-white/5 hover:border-white/10 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-400">{task.level}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-400">W{task.week || '-'}</span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                    <Star size={14} fill="currentColor" /> {task.points}
                  </span>
                </div>
              </div>
              <h4 className="text-lg font-black text-white">{task.title}</h4>
            </div>
          ))}
          {levelTasks.length === 0 && (
            <div className="p-6 rounded-[2rem] border border-white/10 bg-slate-800/30 text-slate-300 text-sm">
              No speaking tasks available for {levelLabel}.
            </div>
          )}
        </div>

        {/* Recorder Area */}
        <div className="lg:col-span-2">
          {activeTask ? (
            <div className="bg-slate-800/40 rounded-[2.5rem] border border-white/5 p-12 backdrop-blur-sm animate-slideIn text-center">
              <div className="mb-10">
                <h3 className="text-3xl font-black text-white mb-4">{activeTask.title}</h3>
                <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">{activeTask.description}</p>
              </div>

              {activeTask.videoUrl && (
                <div className="mb-8 rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40 max-w-2xl mx-auto">
                  <div className="px-4 py-3 border-b border-white/10 text-sm font-bold text-indigo-300 text-left">
                    🎬 Speaking Model Video: {activeTask.videoTitle || 'Watch and repeat'}
                  </div>
                  <div className="aspect-video">
                    <iframe
                      src={activeTask.videoUrl}
                      title={activeTask.videoTitle || activeTask.title}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Visualization Placeholder */}
              <div className="flex justify-center items-center gap-1 h-20 mb-10">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isRecording ? 'bg-indigo-500 animate-pulse' : 'bg-white/10'
                    }`}
                    style={{ 
                      height: isRecording ? `${Math.random() * 100}%` : '20%',
                      animationDelay: `${i * 0.1}s` 
                    }}
                  ></div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-6">
                {!isRecording && !hasRecorded && (
                  <button 
                    onClick={() => setIsRecording(true)}
                    className="w-24 h-24 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/20 hover:scale-110 active:scale-95 transition-all"
                  >
                    <Mic2 size={40} />
                  </button>
                )}

                {isRecording && (
                  <button 
                    onClick={() => {
                      setIsRecording(false);
                      setHasRecorded(true);
                    }}
                    className="w-24 h-24 rounded-full bg-slate-900 border-4 border-rose-500 flex items-center justify-center text-rose-500 shadow-xl hover:scale-110 active:scale-95 transition-all"
                  >
                    <Square size={32} fill="currentColor" />
                  </button>
                )}

                {hasRecorded && (
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setHasRecorded(false)}
                      className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                    >
                      <RefreshCw size={24} />
                    </button>
                    <button className="px-8 h-16 rounded-2xl bg-indigo-500 text-white font-black flex items-center gap-3 hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20">
                      <Play size={24} fill="currentColor" />
                      Listen to Recording
                    </button>
                    <button 
                      onClick={() => {
                        if (typeof window.showToast === 'function') {
                          window.showToast('Excellent!', 'Your recording has been submitted for evaluation.', 'success');
                        }
                        setHasRecorded(false);
                        setActiveTask(null);
                      }}
                      className="px-8 h-16 rounded-2xl bg-emerald-500 text-white font-black flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                    >
                      <CheckCircle size={24} />
                      Submit
                    </button>
                  </div>
                )}

                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                  {isRecording ? 'Recording now...' : hasRecorded ? 'Ready to submit' : 'Click to start recording'}
                </p>
              </div>

              {/* Tips */}
              <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5 text-left flex items-start gap-4">
                <Volume2 className="text-indigo-400 shrink-0" size={24} />
                <div>
                  <p className="text-white font-bold mb-1">Pronunciation Tip</p>
                  <p className="text-sm text-slate-400 italic">Try to mimic the rhythm and intonation of native speakers. Open your mouth wide for vowel sounds.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-slate-800/20 rounded-[2.5rem] border border-dashed border-white/10">
              <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400">
                <Mic2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Ready to speak?</h3>
              <p className="text-slate-500 max-w-sm">Select a task from the list and practice your pronunciation out loud.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
