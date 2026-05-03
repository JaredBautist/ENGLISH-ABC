import React, { useState } from 'react';
import { Volume2, BookOpen, MessageSquare } from 'lucide-react';

/**
 * SlideContent - Renderiza contenido diferentes tipos de diapositivas
 * Tipos: title, presentation, grammar, vocabulary, dialogue, assessment, reflection
 */
export const SlideContent = ({ slide, onActivityComplete }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);

  const playAudio = (text, lang = 'en-US') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setAudioPlaying(true);
      utterance.onend = () => setAudioPlaying(false);
    }
  };

  switch (slide.type) {
    case 'title':
      return (
        <div className="w-full h-96 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex flex-col items-center justify-center p-8 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
          <p className="text-xl text-indigo-100 max-w-2xl">{slide.subtitle || ''}</p>
          {slide.emoji && <p className="text-6xl mt-6">{slide.emoji}</p>}
        </div>
      );

    case 'presentation':
      return (
        <div className="space-y-6">
          {slide.image && (
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm p-4">
              {slide.image}
            </div>
          )}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border-l-4 border-blue-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{slide.title}</h2>
            <p className="text-lg text-gray-700 mb-6">{slide.content}</p>

            {slide.examples && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Ejemplos:</p>
                {slide.examples.map((example, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-blue-400 flex items-start gap-3">
                    <span className="text-lg font-bold text-blue-600 flex-shrink-0">{idx + 1}.</span>
                    <div className="flex-1">
                      <p className="text-gray-800 font-semibold">{example.text}</p>
                      <p className="text-xs text-gray-600 mt-1 italic">{example.meaning}</p>
                    </div>
                    <button
                      onClick={() => playAudio(example.text)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors flex-shrink-0"
                      disabled={audioPlaying}
                    >
                      <Volume2 className="w-5 h-5 text-blue-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

    case 'grammar':
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border-l-4 border-green-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{slide.title}</h2>
            <p className="text-lg text-gray-700 mb-6">{slide.rule}</p>

            {slide.table && (
              <div className="overflow-x-auto bg-white rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-green-100 border-b-2 border-green-400">
                    <tr>
                      {slide.table.headers.map((header, idx) => (
                        <th key={idx} className="px-4 py-3 text-left font-bold text-green-700">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {slide.table.rows.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-green-50' : 'bg-white'}>
                        {row.map((cell, cidx) => (
                          <td key={cidx} className="px-4 py-3 text-gray-800 font-semibold">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {slide.errors && (
              <div className="mt-6 space-y-3">
                <p className="text-sm font-semibold text-red-700 uppercase tracking-wide">Errores Comunes:</p>
                {slide.errors.map((error, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-red-400">
                    <p className="text-red-700 font-semibold">❌ {error.incorrect}</p>
                    <p className="text-green-700 font-semibold mt-2">✓ {error.correct}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

    case 'vocabulary':
      return (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{slide.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.words.map((word, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border-2 border-orange-300 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-gray-800">{word.word}</p>
                    <p className="text-sm text-orange-600 italic font-semibold">{word.pronunciation}</p>
                    <p className="text-xs text-gray-600 mt-2 bg-white px-2 py-1 rounded inline-block">
                      {word.partOfSpeech}
                    </p>
                    <p className="text-sm text-gray-700 mt-3 italic">"{word.example}"</p>
                  </div>
                  <button
                    onClick={() => playAudio(word.word)}
                    className="p-2 bg-orange-200 hover:bg-orange-300 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Volume2 className="w-5 h-5 text-orange-700" />
                  </button>
                </div>
                {word.image && (
                  <p className="text-xs text-gray-600 mt-3 p-2 bg-orange-100 rounded">
                    🖼️ {word.image}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case 'dialogue':
      return (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{slide.title}</h2>
          <p className="text-gray-700 mb-6 bg-blue-50 p-4 rounded-lg">
            📍 <strong>Escena:</strong> {slide.scenario}
          </p>

          <div className="space-y-3">
            {slide.dialogue.map((line, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  line.speaker === 'A'
                    ? 'bg-blue-100 border-l-4 border-blue-500'
                    : 'bg-green-100 border-l-4 border-green-500 flex-row-reverse'
                }`}
              >
                <div className={`text-2xl font-bold flex-shrink-0 ${
                  line.speaker === 'A' ? 'text-blue-700' : 'text-green-700'
                }`}>
                  {line.speaker}:
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">{line.text}</p>
                  {line.pronunciation && (
                    <p className="text-xs text-gray-600 italic mt-1">{line.pronunciation}</p>
                  )}
                </div>
                <button
                  onClick={() => playAudio(line.text)}
                  className="p-2 hover:bg-blue-200 rounded-lg transition-colors flex-shrink-0"
                  disabled={audioPlaying}
                >
                  <Volume2 className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            ))}
          </div>

          {slide.comprehensionQuestions && (
            <div className="mt-6 bg-purple-50 p-6 rounded-xl border-2 border-purple-300">
              <p className="font-bold text-purple-800 mb-4">Preguntas de comprensión:</p>
              <ul className="space-y-2">
                {slide.comprehensionQuestions.map((q, idx) => (
                  <li key={idx} className="text-gray-800">
                    <span className="font-semibold text-purple-700">{idx + 1}.</span> {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    case 'assessment':
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-xl border-l-4 border-red-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{slide.title}</h2>
            <p className="text-gray-700 mb-6">{slide.instruction}</p>

            {slide.criteria && (
              <div className="bg-white p-4 rounded-lg border border-red-300">
                <p className="font-bold text-gray-800 mb-3">Criterios de evaluación:</p>
                <ul className="space-y-2">
                  {slide.criteria.map((criterion, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>{criterion.skill}:</strong> {criterion.descriptor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      );

    case 'reflection':
      return (
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-xl border-2 border-purple-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">✨ {slide.title}</h2>
          <div className="space-y-4">
            {slide.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg border-l-4 border-purple-400 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <p className="text-gray-800 font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
          <p>Tipo de diapositiva desconocido: {slide.type}</p>
        </div>
      );
  }
};
