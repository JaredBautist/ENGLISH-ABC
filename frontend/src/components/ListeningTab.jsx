import React, { useEffect, useMemo, useState } from 'react';
import { Headphones, Play, CheckCircle, Clock, Star, Award } from 'lucide-react';

const videos = [
  {
    id: 101,
    title: 'Week 1: Alphabet Pronunciation (A-Z)',
    duration: '6:30',
    level: 'A1.1',
    thumbnail: 'https://img.youtube.com/vi/um3YrKRfsr0/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/um3YrKRfsr0',
    xp: 40,
    week: 1
  },
  {
    id: 102,
    title: 'Week 2: Greetings - Good Morning / Goodbye',
    duration: '1:51',
    level: 'A1.1',
    thumbnail: 'https://img.youtube.com/vi/Fw0rdSHzWFY/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/Fw0rdSHzWFY',
    xp: 45,
    week: 2
  },
  {
    id: 103,
    title: 'Week 3: Numbers 1-100 Pronunciation Practice',
    duration: '8:09',
    level: 'A1.1',
    thumbnail: 'https://img.youtube.com/vi/t8zetbzeGt8/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/t8zetbzeGt8',
    xp: 50,
    week: 3
  },
  {
    id: 104,
    title: 'Week 4: Colors in English',
    duration: '4:01',
    level: 'A1.1',
    thumbnail: 'https://img.youtube.com/vi/qhOTU8_1Af4/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/qhOTU8_1Af4',
    xp: 55,
    week: 4
  },
  {
    id: 105,
    title: 'Week 5: Family Members Vocabulary',
    duration: '5:56',
    level: 'A1.1',
    thumbnail: 'https://img.youtube.com/vi/FHaObkHEkHQ/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/FHaObkHEkHQ',
    xp: 60,
    week: 5
  },
  {
    id: 106,
    title: 'Week 6: Days, Months, Seasons',
    duration: '8:53',
    level: 'A1.1',
    thumbnail: 'https://img.youtube.com/vi/bGzwyWBbiHM/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/bGzwyWBbiHM',
    xp: 65,
    week: 6
  },
  {
    id: 107,
    title: 'Week 7: Common Action Verbs',
    duration: '6:43',
    level: 'A1.1',
    thumbnail: 'https://img.youtube.com/vi/TOBrnsnDNEU/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/TOBrnsnDNEU',
    xp: 70,
    week: 7
  },
  {
    id: 108,
    title: 'Week 8: A1 Review - Daily Routine',
    duration: '16:49',
    level: 'A1.1',
    thumbnail: 'https://img.youtube.com/vi/sMkzwmMs0jM/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/sMkzwmMs0jM',
    xp: 80,
    week: 8
  },
  {
    id: 1,
    title: 'Week 1: Verb To Be, Countries & Nationalities',
    duration: '4:00',
    level: 'A1.2',
    thumbnail: 'https://img.youtube.com/vi/ZwSmUux1ZSg/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/ZwSmUux1ZSg',
    xp: 50,
    week: 1
  },
  {
    id: 2,
    title: 'Week 2: Daily Routine (Present Simple)',
    duration: '5:12',
    level: 'A1.2',
    thumbnail: 'https://img.youtube.com/vi/tiXitp8P1kM/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/tiXitp8P1kM',
    xp: 75,
    week: 2
  },
  {
    id: 3,
    title: 'Week 3: Family Members & Possessive Adjectives',
    duration: '4:52',
    level: 'A1.2',
    thumbnail: 'https://img.youtube.com/vi/glS9vC7m7lY/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/glS9vC7m7lY',
    xp: 60,
    week: 3
  },
  {
    id: 4,
    title: 'Week 4: There Is / There Are (My Home)',
    duration: '8:31',
    level: 'A1.2',
    thumbnail: 'https://img.youtube.com/vi/7XDwn2ofLHg/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/7XDwn2ofLHg',
    xp: 70,
    week: 4
  },
  {
    id: 5,
    title: 'Week 5: Food & Shopping Vocabulary',
    duration: '6:10',
    level: 'A1.2',
    thumbnail: 'https://img.youtube.com/vi/glS9vC7m7lY/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/glS9vC7m7lY',
    xp: 80,
    week: 5
  },
  {
    id: 6,
    title: 'Week 6: Can / Can’t (Abilities)',
    duration: '5:48',
    level: 'A1.2',
    thumbnail: 'https://img.youtube.com/vi/jF5RWnWB6kI/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/jF5RWnWB6kI',
    xp: 80,
    week: 6
  },
  {
    id: 7,
    title: 'Week 7: Future Plans (Going To)',
    duration: '4:36',
    level: 'A1.2',
    thumbnail: 'https://img.youtube.com/vi/ecm1nYm088g/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/ecm1nYm088g',
    xp: 90,
    week: 7
  },
  {
    id: 8,
    title: 'Week 8: A1 Review & Final Practice',
    duration: '6:05',
    level: 'A1.2',
    thumbnail: 'https://img.youtube.com/vi/EHxVzjjrvMY/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/EHxVzjjrvMY',
    xp: 100,
    week: 8
  },
];

export default function ListeningTab({ levelId = 'a1-2' }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const levelLabel = levelId.toUpperCase().replace('-', '.');
  const levelVideos = useMemo(
    () => videos
      .filter((video) => video.level.toLowerCase() === levelLabel.toLowerCase())
      .sort((a, b) => (a.week || 99) - (b.week || 99)),
    [levelLabel]
  );

  useEffect(() => {
    if (!selectedVideo) return;
    const stillAvailable = levelVideos.some((video) => video.id === selectedVideo.id);
    if (!stillAvailable) setSelectedVideo(null);
  }, [levelVideos, selectedVideo]);

  return (
    <div className="p-8 lg:p-12 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black flex items-center gap-3 text-white">
          <Headphones className="text-indigo-500" size={32} />
          Listening Practice
        </h2>
        <div className="flex gap-2">
          <span className="px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold uppercase tracking-widest text-white">
            Video Gallery
          </span>
        </div>
      </div>

      {selectedVideo ? (
        <div className="mb-12 animate-slideIn">
          <button 
            onClick={() => setSelectedVideo(null)}
            className="mb-4 text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-2 transition-colors"
          >
            ← Back to Gallery
          </button>
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10">
            <div className="aspect-video w-full">
              <iframe 
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-8 bg-slate-800/40 backdrop-blur-md border-t border-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2">{selectedVideo.title}</h3>
                  <div className="flex gap-4 text-slate-400">
                    <span className="flex items-center gap-1.5"><Clock size={16} /> {selectedVideo.duration}</span>
                    <span className="flex items-center gap-1.5"><Star size={16} className="text-amber-400" /> {selectedVideo.xp} XP</span>
                  </div>
                </div>
                <button className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20">
                  Take Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {levelVideos.map((video) => (
            <div 
              key={video.id}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 mb-4 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-indigo-500/50 group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500 border border-white/30 shadow-xl">
                    <Play className="text-white fill-current translate-x-0.5" size={32} />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-lg text-white font-bold text-sm">
                  {video.duration}
                </div>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors px-2">{video.title}</h3>
              <div className="flex items-center gap-2 mt-2 px-2 text-slate-400 font-medium">
                <span className="text-emerald-400 font-bold">W{video.week}</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span className="text-indigo-400 font-bold">{video.level}</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span>+{video.xp} XP reward</span>
              </div>
            </div>
          ))}
          {levelVideos.length === 0 && (
            <div className="col-span-full p-6 rounded-[2rem] border border-white/10 bg-slate-800/30 text-slate-300 text-sm">
              No listening videos available for {levelLabel}.
            </div>
          )}
        </div>
      )}

      {/* Progress Cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-[2rem] bg-slate-800/40 border border-white/5">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1 text-white">Daily Target</p>
          <p className="text-2xl font-black text-white">0 / 3 Videos</p>
          <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full w-0 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
          </div>
        </div>
        <div className="p-6 rounded-[2rem] bg-slate-800/40 border border-white/5">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1 text-white">Listening Accuracy</p>
          <p className="text-2xl font-black text-white">0%</p>
          <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
        </div>
        <div className="p-6 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-between">
          <div>
            <p className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-1 text-white">Weekly XP</p>
            <p className="text-2xl font-black text-white">0 XP</p>
          </div>
          <Award className="text-indigo-400" size={40} />
        </div>
      </div>
    </div>
  );
}
