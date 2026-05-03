import React, { useState, useEffect } from 'react';
import { SlideContent } from './SlideContent';
import { SlideNav } from './SlideNav';
import { DragDropActivity, FillInTheBlankActivity, MultipleChoiceActivity, VocabularyFlashcard } from './InteractiveActivities';

/**
 * A1.2WeekSlideshow - Componente principal para presentar una semana completa
 * Props:
 *   - weekData: Objeto con toda la información de la semana (slides, vocabulario, etc.)
 *   - weekNumber: Número de la semana (1-8)
 *   - onComplete: Callback cuando el estudiante completa la semana
 */
export const A1_2WeekSlideshow = ({ weekData, weekNumber = 1, onComplete }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [completedActivities, setCompletedActivities] = useState({});
  const [weekProgress, setWeekProgress] = useState(0);

  const slides = weekData.slides || [];
  const currentSlide = slides[currentSlideIndex];

  // Calculate progress
  useEffect(() => {
    const progress = Math.round((currentSlideIndex / (slides.length - 1)) * 100);
    setWeekProgress(progress);
  }, [currentSlideIndex, slides.length]);

  const handlePreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handleActivityComplete = (slideId) => {
    setCompletedActivities({
      ...completedActivities,
      [slideId]: true,
    });
    // Auto-advance to next slide after 1 second
    setTimeout(() => {
      handleNextSlide();
    }, 1000);
  };

  if (!currentSlide) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-xl">
        <p className="text-gray-600 text-lg">Cargando contenido...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 border-b-4 border-purple-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{weekData.title}</h1>
            <p className="text-indigo-100 mt-1">{weekData.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-indigo-200">Semana {weekNumber}</p>
            <p className="text-2xl font-bold">{weekData.duration}</p>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="p-8 min-h-96 bg-white">
        {currentSlide.type === 'activity' && currentSlide.activityType === 'drag-drop' ? (
          <DragDropActivity
            title={currentSlide.title}
            instructions={currentSlide.instructions}
            pairs={currentSlide.pairs}
            onComplete={() => handleActivityComplete(currentSlide.id)}
          />
        ) : currentSlide.type === 'activity' && currentSlide.activityType === 'fill-blank' ? (
          <FillInTheBlankActivity
            title={currentSlide.title}
            sentences={currentSlide.sentences}
            onComplete={() => handleActivityComplete(currentSlide.id)}
          />
        ) : currentSlide.type === 'activity' && currentSlide.activityType === 'multiple-choice' ? (
          <MultipleChoiceActivity
            title={currentSlide.title}
            question={currentSlide.question}
            options={currentSlide.options}
            correctAnswer={currentSlide.correctAnswer}
            explanation={currentSlide.explanation}
            onComplete={() => handleActivityComplete(currentSlide.id)}
          />
        ) : currentSlide.type === 'vocabulary' && Array.isArray(currentSlide.words) ? (
          <VocabularyFlashcard
            words={currentSlide.words}
            title={currentSlide.title}
          />
        ) : (
          <SlideContent slide={currentSlide} />
        )}
      </div>

      {/* Navigation Footer */}
      <SlideNav
        currentSlide={currentSlideIndex}
        totalSlides={slides.length}
        onPrevious={handlePreviousSlide}
        onNext={handleNextSlide}
        progress={weekProgress}
      />

      {/* Status Bar */}
      <div className="bg-gray-100 px-8 py-4 border-t border-gray-300 flex items-center justify-between text-sm text-gray-700">
        <div>
          <p>
            <strong>Gramática:</strong> {weekData.grammarFocus || 'N/A'} |
            <strong className="ml-4">Vocabulario:</strong> {weekData.vocabularyCount || '0'} palabras
          </p>
        </div>
        <div>
          <p>Completed Activities: {Object.keys(completedActivities).length} de {slides.filter(s => s.type === 'activity').length}</p>
        </div>
      </div>

      {/* Completion Modal */}
      {currentSlideIndex === slides.length - 1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center">
            <p className="text-6xl mb-4">🎉</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Excelente Trabajo!</h2>
            <p className="text-gray-600 mb-6">
              Has completado la Semana {weekNumber}. Revisaste todos los temas y practicaste las actividades.
            </p>
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600">{weekProgress}%</p>
              <p className="text-sm text-indigo-700">Progreso completado</p>
            </div>
            <button
              onClick={() => onComplete && onComplete()}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
            >
              Siguiente Semana →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
