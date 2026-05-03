import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SlideNav = ({ currentSlide, totalSlides, onPrevious, onNext, progress }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-50 to-cyan-50 border-t border-indigo-200">
      {/* Progress Bar */}
      <div className="flex-1 mr-6">
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Slide {currentSlide + 1} of {totalSlides}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          disabled={currentSlide === 0}
          className="p-2 rounded-lg bg-white border border-indigo-300 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-indigo-600" />
        </button>

        <span className="px-4 py-2 text-sm font-semibold text-indigo-700 bg-white rounded-lg border border-indigo-200">
          {currentSlide + 1} / {totalSlides}
        </span>

        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="p-2 rounded-lg bg-white border border-indigo-300 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-indigo-600" />
        </button>
      </div>
    </div>
  );
};
