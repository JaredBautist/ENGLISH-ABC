import React, { useState } from 'react';
import { CheckCircle, XCircle, Volume2 } from 'lucide-react';

/**
 * DragDropActivity - Estudiantes arrastran palabras/imágenes a opciones correctas
 * Ejemplo: Emparejar países con banderas, profesiones con imágenes, etc.
 */
export const DragDropActivity = ({
  title,
  instructions,
  pairs,
  onComplete,
  feedback = true
}) => {
  const [userMatches, setUserMatches] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDropOnTarget = (targetId) => {
    if (!draggedItem) return;

    const newMatches = { ...userMatches, [targetId]: draggedItem.id };
    setUserMatches(newMatches);

    // Check if all pairs are matched correctly
    const allMatched = pairs.every(pair => userMatches[pair.id] === pair.correctId);
    if (allMatched) {
      setCompleted(true);
    }
  };

  const getCorrectCount = () => {
    return Object.entries(userMatches).filter(
      ([targetId, itemId]) => {
        const pair = pairs.find(p => p.id === targetId);
        return pair && pair.correctId === itemId;
      }
    ).length;
  };

  const correctCount = getCorrectCount();
  const isAllCorrect = correctCount === pairs.length && pairs.length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{instructions}</p>

      {/* Draggable Items */}
      <div className="mb-8 p-4 bg-white rounded-lg border-2 border-blue-300">
        <p className="text-xs font-semibold text-blue-700 mb-3 uppercase">Arrastra los elementos:</p>
        <div className="flex flex-wrap gap-2">
          {pairs.map((pair) => (
            <div
              key={pair.id}
              draggable
              onDragStart={() => handleDragStart(pair)}
              className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg cursor-move hover:shadow-lg transition-shadow font-semibold"
            >
              {pair.label}
            </div>
          ))}
        </div>
      </div>

      {/* Drop Targets */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-700 uppercase">Suelta en la opción correcta:</p>
        {pairs.map((pair) => (
          <div
            key={pair.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDropOnTarget(pair.id)}
            className={`p-4 rounded-lg border-3 border-dashed transition-all ${
              userMatches[pair.id]
                ? 'border-green-400 bg-green-50'
                : 'border-gray-300 bg-white hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">{pair.label}</p>
                {pair.image && (
                  <p className="text-xs text-gray-600 mt-1">🖼️ {pair.image}</p>
                )}
              </div>

              {userMatches[pair.id] && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-blue-700">
                    {
                      pairs.find(p => p.id === pair.id && p.correctId === userMatches[pair.id])
                        ? userMatches[pair.id]
                        : userMatches[pair.id]
                    }
                  </span>
                  {pairs.find(p => p.id === pair.id)?.correctId === userMatches[pair.id] ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {isAllCorrect && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-lg">
          <p className="text-green-700 font-bold text-lg">🎉 ¡Excelente! ¡Todas son correctas!</p>
          <p className="text-sm text-green-600 mt-1">Hiciste todas las conexiones correctamente.</p>
        </div>
      )}

      {correctCount > 0 && !isAllCorrect && (
        <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-300">
          <p className="text-sm text-blue-700">
            ✓ <strong>{correctCount}</strong> de <strong>{pairs.length}</strong> correctas. ¡Sigue intentando!
          </p>
        </div>
      )}

      {onComplete && isAllCorrect && (
        <button
          onClick={() => onComplete()}
          className="mt-6 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
        >
          Continuar →
        </button>
      )}
    </div>
  );
};

/**
 * FillInTheBlankActivity - Escribe literales en espacios en blanco
 */
export const FillInTheBlankActivity = ({
  title,
  sentences,
  onComplete,
}) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChange = (sentenceId, value) => {
    setUserAnswers({
      ...userAnswers,
      [sentenceId]: value,
    });
  };

  const handleCheck = () => {
    setShowFeedback(true);
  };

  const getCorrectCount = () => {
    return sentences.filter(
      (s) => userAnswers[s.id]?.toLowerCase() === s.answer.toLowerCase()
    ).length;
  };

  const correctCount = getCorrectCount();
  const allCorrect = correctCount === sentences.length;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>

      <div className="space-y-4">
        {sentences.map((sentence, idx) => (
          <div key={sentence.id} className="bg-white p-4 rounded-lg border border-amber-200">
            <p className="text-sm text-gray-600 mb-2">Oración {idx + 1}:</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base text-gray-800">
                {sentence.before}
                <input
                  type="text"
                  value={userAnswers[sentence.id] || ''}
                  onChange={(e) => handleChange(sentence.id, e.target.value)}
                  placeholder="___"
                  className="w-24 px-2 py-1 border-b-2 border-amber-300 focus:border-amber-500 outline-none bg-transparent text-center font-semibold"
                  disabled={showFeedback && userAnswers[sentence.id]}
                />
                {sentence.after}
              </span>

              {showFeedback && (
                sentence.answer.toLowerCase() === userAnswers[sentence.id]?.toLowerCase() ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="ml-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <p className="text-xs text-red-600 mt-1">Respuesta: {sentence.answer}</p>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {!showFeedback ? (
        <button
          onClick={handleCheck}
          className="mt-6 w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
        >
          Verificar Respuestas
        </button>
      ) : (
        <>
          <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-300">
            <p className="text-blue-700 font-bold">
              Puntuación: {correctCount} de {sentences.length}
            </p>
          </div>

          {allCorrect && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg border border-green-400">
              <p className="text-green-700 font-bold text-lg">🎉 ¡Perfecto!</p>
              <p className="text-sm text-green-600 mt-1">Todas tus respuestas son correctas.</p>
            </div>
          )}

          {onComplete && allCorrect && (
            <button
              onClick={() => onComplete()}
              className="mt-4 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
            >
              Continuar →
            </button>
          )}
        </>
      )}
    </div>
  );
};

/**
 * MultipleChoiceActivity - Elige la respuesta correcta
 */
export const MultipleChoiceActivity = ({
  title,
  question,
  options,
  correctAnswer,
  explanation,
  onComplete,
}) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleCheck = () => {
    setShowFeedback(true);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
      <p className="text-lg font-semibold text-gray-700 mb-6">{question}</p>

      <div className="space-y-3 mb-6">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !showFeedback && handleSelect(option)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selected === option
                ? 'border-pink-500 bg-pink-100'
                : 'border-pink-200 bg-white hover:border-pink-300'
            } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
            disabled={showFeedback}
          >
            <span className="text-base font-semibold">{option}</span>
          </button>
        ))}
      </div>

      {!showFeedback ? (
        <button
          onClick={handleCheck}
          disabled={!selected}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verificar
        </button>
      ) : (
        <>
          {isCorrect ? (
            <div className="p-4 bg-green-100 rounded-lg border-2 border-green-400">
              <p className="text-green-700 font-bold text-lg">✓ ¡Correcto!</p>
              <p className="text-sm text-green-600 mt-2">{explanation}</p>
            </div>
          ) : (
            <div className="p-4 bg-red-100 rounded-lg border-2 border-red-400">
              <p className="text-red-700 font-bold text-lg">✗ Intenta de nuevo</p>
              <p className="text-sm text-red-600 mt-2">La respuesta correcta es: <strong>{correctAnswer}</strong></p>
              <p className="text-sm text-red-600 mt-2">{explanation}</p>
            </div>
          )}

          {onComplete && isCorrect && (
            <button
              onClick={() => onComplete()}
              className="mt-4 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
            >
              Continuar →
            </button>
          )}
        </>
      )}
    </div>
  );
};

/**
 * VocabularyFlashcard - Tarjeta de vocabulario con audio y pronunciación
 */
export const VocabularyFlashcard = ({
  words,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentWord = words[currentIndex];

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h3>

      {/* Flashcard */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative w-full h-64 cursor-pointer perspective mb-6"
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform ${
            isFlipped ? 'rotateY-180' : ''
          }`}
        >
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center text-white">
            {!isFlipped ? (
              <>
                <p className="text-4xl font-bold text-center mb-6">{currentWord.word}</p>
                <p className="text-2xl text-indigo-100 italic">{currentWord.pronunciation}</p>
                <p className="text-sm text-indigo-100 mt-4">(Haz clic para ver la respuesta)</p>
              </>
            ) : (
              <>
                <p className="text-lg text-indigo-100 mb-2 uppercase tracking-wide">Significado</p>
                <p className="text-2xl font-bold text-center mb-4">{currentWord.meaning}</p>
                <p className="text-sm text-center text-indigo-100">"{currentWord.example}"</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Audio Button */}
      <button
        onClick={() => playAudio(currentWord.word)}
        className="mx-auto flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors mb-6"
      >
        <Volume2 className="w-5 h-5 text-indigo-600" />
        <span className="text-indigo-700 font-semibold">Escuchar pronunciación</span>
      </button>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400"
        >
          ← Anterior
        </button>

        <span className="text-gray-700 font-semibold">
          {currentIndex + 1} / {words.length}
        </span>

        <button
          onClick={() => setCurrentIndex(Math.min(words.length - 1, currentIndex + 1))}
          disabled={currentIndex === words.length - 1}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};
