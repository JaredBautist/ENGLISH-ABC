import React, { useEffect, useMemo, useState } from 'react';
import { PenTool, Send, Save, Book, CheckCircle } from 'lucide-react';

const prompts = [
  {
    id: 1,
    title: 'Introduce Yourself',
    level: 'A1.1',
    description: 'Write a short paragraph (3-5 sentences) introducing yourself. Include your name, age, and where you are from.',
    minWords: 20,
    week: 1,
    videoTitle: 'How to Introduce Yourself in English',
    videoUrl: 'https://www.youtube.com/embed/I_tRSrPru94'
  },
  {
    id: 9,
    title: 'Greetings Card',
    level: 'A1.1',
    description: 'Write 6 short greeting lines (formal and informal): hello, good morning, goodbye, nice to meet you.',
    minWords: 25,
    week: 2,
    videoTitle: 'Greetings in English (Beginner)',
    videoUrl: 'https://www.youtube.com/embed/Fw0rdSHzWFY'
  },
  {
    id: 10,
    title: 'Numbers in My Life',
    level: 'A1.1',
    description: 'Write sentences using numbers 1-100: age, phone number, address number, and favorite number.',
    minWords: 30,
    week: 3,
    videoTitle: 'Numbers 1-100 Pronunciation and Spelling',
    videoUrl: 'https://www.youtube.com/embed/t8zetbzeGt8'
  },
  {
    id: 11,
    title: 'Colors and Objects',
    level: 'A1.1',
    description: 'Write 8 short sentences with colors + objects (e.g., The book is blue. The pen is black).',
    minWords: 35,
    week: 4,
    videoTitle: 'Colors in English for Beginners',
    videoUrl: 'https://www.youtube.com/embed/qhOTU8_1Af4'
  },
  {
    id: 12,
    title: 'My Family',
    level: 'A1.1',
    description: 'Describe your family members (mother, father, brother, sister) using simple adjectives and possessives.',
    minWords: 40,
    week: 5,
    videoTitle: 'Talking about Family in English',
    videoUrl: 'https://www.youtube.com/embed/lDZA54Bi8sg'
  },
  {
    id: 13,
    title: 'My Week Calendar',
    level: 'A1.1',
    description: 'Write what you do on 5 days of the week and include one date using month + day.',
    minWords: 35,
    week: 6,
    videoTitle: 'Days, Months and Seasons',
    videoUrl: 'https://www.youtube.com/embed/bGzwyWBbiHM'
  },
  {
    id: 14,
    title: 'Basic Verbs in Sentences',
    level: 'A1.1',
    description: 'Write 10 present tense sentences using action verbs (eat, play, read, go, study, work).',
    minWords: 40,
    week: 7,
    videoTitle: 'Common Action Verbs for Beginners',
    videoUrl: 'https://www.youtube.com/embed/TOBrnsnDNEU'
  },
  {
    id: 15,
    title: 'A1.1 Final Mini Profile',
    level: 'A1.1',
    description: 'Write a complete mini profile: who you are, greetings, numbers, colors, family, and daily actions.',
    minWords: 70,
    week: 8,
    videoTitle: 'A1 Review - Daily Routine Practice',
    videoUrl: 'https://www.youtube.com/embed/sMkzwmMs0jM'
  },
  {
    id: 2,
    title: 'My Daily Routine',
    level: 'A1.2',
    description: 'Describe what you do on a typical Monday. Use "Present Simple" and time expressions (at 7:00, in the morning).',
    minWords: 50
  },
  {
    id: 3,
    title: 'My Family',
    level: 'A1.2',
    description: 'Write about 3-4 family members. Use possessive adjectives (my, his, her) and simple descriptions (age, job, personality).',
    minWords: 55
  },
  {
    id: 4,
    title: 'My Home',
    level: 'A1.2',
    description: 'Describe your home using there is / there are. Include at least 5 rooms or objects and 2 prepositions of place.',
    minWords: 50
  },
  {
    id: 5,
    title: 'Shopping List & Prices',
    level: 'A1.2',
    description: 'Write a short text about buying food for one day. Use some/any, a/an, and basic quantities (a kilo of, a bottle of, two apples).',
    minWords: 45
  },
  {
    id: 6,
    title: 'What I Can Do',
    level: 'A1.2',
    description: 'Write sentences about your abilities using can/can’t (sports, school, hobbies). Add one goal for something you want to learn.',
    minWords: 45
  },
  {
    id: 7,
    title: 'My Weekend Plan',
    level: 'A1.2',
    description: 'Write your plan for next weekend using going to. Include at least 6 actions and time expressions (on Saturday, in the evening).',
    minWords: 55
  },
  {
    id: 8,
    title: 'A1.2 Final Self-Profile',
    level: 'A1.2',
    description: 'Write a short profile about yourself combining: personal info, routine, family, home, and weekend plans. Use simple connected sentences.',
    minWords: 80
  }
];

export default function WritingTab({ levelId = 'a1-2' }) {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [text, setText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const levelLabel = levelId.toUpperCase().replace('-', '.');
  const levelPrompts = useMemo(
    () => prompts.filter((prompt) => prompt.level.toLowerCase() === levelLabel.toLowerCase()),
    [levelLabel]
  );

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  useEffect(() => {
    if (!selectedPrompt) return;
    const stillAvailable = levelPrompts.some((prompt) => prompt.id === selectedPrompt.id);
    if (!stillAvailable) {
      setSelectedPrompt(null);
      setText('');
    }
  }, [levelPrompts, selectedPrompt]);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    if (typeof window.showToast === 'function') {
      window.showToast('Work Saved!', 'Your writing has been saved for your teacher to review.', 'success');
    }
  };

  return (
    <div className="p-8 lg:p-12 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black flex items-center gap-3 text-white">
          <PenTool className="text-indigo-500" size={32} />
          Writing Workshop
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prompts List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-black text-white px-2 flex items-center gap-2">
            <Book size={20} className="text-indigo-400" />
            Writing Prompts
          </h3>
          {levelPrompts.map((prompt) => (
            <div 
              key={prompt.id}
              onClick={() => {
                setSelectedPrompt(prompt);
                setText('');
              }}
              className={`p-6 rounded-[2rem] border cursor-pointer transition-all duration-300 ${
                selectedPrompt?.id === prompt.id
                  ? 'bg-indigo-500/20 border-indigo-500/50 shadow-lg'
                  : 'bg-slate-800/40 border-white/5 hover:border-white/10 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-400">{prompt.level}</span>
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">W{prompt.week || '-'}</span>
                {/* Placeholder for completion check */}
              </div>
              <h4 className="text-lg font-black text-white">{prompt.title}</h4>
              <p className="text-sm text-slate-400 mt-2 line-clamp-2">{prompt.description}</p>
            </div>
          ))}
          {levelPrompts.length === 0 && (
            <div className="p-6 rounded-[2rem] border border-white/10 bg-slate-800/30 text-slate-300 text-sm">
              No writing prompts available for {levelLabel}.
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-2">
          {selectedPrompt ? (
            <div className="bg-slate-800/40 rounded-[2.5rem] border border-white/5 p-8 backdrop-blur-sm animate-slideIn">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-white mb-2">{selectedPrompt.title}</h3>
                <p className="text-slate-400 leading-relaxed">{selectedPrompt.description}</p>
              </div>

              {selectedPrompt.videoUrl && (
                <div className="mb-6 rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
                  <div className="px-4 py-3 border-b border-white/10 text-sm font-bold text-indigo-300">
                    🎬 Writing Support Video: {selectedPrompt.videoTitle || 'Watch and take notes'}
                  </div>
                  <div className="aspect-video">
                    <iframe
                      src={selectedPrompt.videoUrl}
                      title={selectedPrompt.videoTitle || selectedPrompt.title}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="relative">
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start writing here..."
                  className="w-full h-64 bg-slate-900/50 border border-white/10 rounded-[2rem] p-6 text-lg text-slate-200 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none"
                ></textarea>
                <div className="absolute bottom-6 right-6 flex items-center gap-4">
                  <span className={`text-sm font-bold ${wordCount >= selectedPrompt.minWords ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {wordCount} / {selectedPrompt.minWords} words
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button 
                  onClick={handleSave}
                  className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Save size={20} />
                  Save Draft
                </button>
                <button 
                  disabled={wordCount < selectedPrompt.minWords}
                  className="px-8 py-3 rounded-2xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <Send size={20} />
                  Submit Assignment
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-slate-800/20 rounded-[2.5rem] border border-dashed border-white/10">
              <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400">
                <PenTool size={40} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Ready to write?</h3>
              <p className="text-slate-500 max-w-sm">Select a prompt from the list to start your writing practice and improve your English.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
