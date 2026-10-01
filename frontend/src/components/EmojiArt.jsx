import { useState } from 'react';
import emojiArt from '../data/emojiArt.json';

/**
 * Dibuja ilustraciones alusivas (OpenMoji, estilo infantil) en lugar de
 * emojis de texto. Si el emoji no tiene dibujo descargado o falla la carga,
 * muestra el emoji nativo con fuente Noto Color Emoji como respaldo seguro.
 */
const SIZES = {
  sm: 'h-9 w-9 sm:h-11 sm:w-11',
  md: 'h-16 w-16 sm:h-20 sm:w-20',
  word: 'h-12 w-12 sm:h-14 sm:w-14',
  hero: 'h-20 w-20 sm:h-24 sm:w-24',
  heroFull: 'h-[14vh] w-[14vh]',
};

export default function EmojiArt({ emoji, size = 'md', className = '' }) {
  const [hasError, setHasError] = useState(false);
  const src = emojiArt[emoji];

  if (!src || hasError) {
    return (
      <span
        role="img"
        aria-label={emoji || 'ilustración'}
        className={`inline-flex items-center justify-center font-['Noto_Color_Emoji',system-ui,sans-serif] ${className}`}
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
