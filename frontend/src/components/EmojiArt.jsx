import { useState } from 'react';
import emojiArt from '../data/emojiArt.json';

/**
 * Dibuja ilustraciones alusivas (OpenMoji, estilo infantil) en lugar de
 * emojis de texto. Si el emoji no tiene dibujo descargado o falla la carga,
 * muestra el emoji nativo con fuente Noto Color Emoji como respaldo seguro.
 */
const SIZES = {
  sm: 'h-9 w-9 sm:h-11 sm:w-11 text-2xl',
  md: 'h-16 w-16 sm:h-20 sm:w-20 text-4xl sm:text-5xl',
  card: 'h-14 w-14 sm:h-18 sm:w-18 text-3xl sm:text-4xl',
  word: 'h-14 w-14 sm:h-16 sm:w-16 text-3xl sm:text-4xl',
  hero: 'h-20 w-20 sm:h-24 sm:w-24 text-5xl sm:text-6xl',
  heroFull: 'h-[14vh] w-[14vh] text-[10vh]',
  xl: 'h-28 w-28 sm:h-32 sm:w-32 text-6xl sm:text-7xl',
};

export default function EmojiArt({ emoji, size = 'md', className = '' }) {
  const [hasError, setHasError] = useState(false);
  const src = emojiArt[emoji];
  const sizeClass = SIZES[size] || SIZES.md;

  if (!src || hasError) {
    return (
      <span
        role="img"
        aria-label={emoji || 'ilustración'}
        className={`inline-flex items-center justify-center font-['Noto_Color_Emoji',system-ui,sans-serif] select-none ${sizeClass} ${className}`}
      >
        {emoji || '✨'}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`inline-block object-contain ${SIZES[size] || SIZES.md} ${className}`}
      loading="eager"
      onError={() => setHasError(true)}
    />
  );
}
