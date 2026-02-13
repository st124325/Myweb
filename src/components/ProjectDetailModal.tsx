import { useEffect } from 'react';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    description: string;
    embed_url?: string;
    duration?: number;
    author?: { name: string };
  } | null;
  formatDuration: (sec: number) => string;
}

export function ProjectDetailModal({
  isOpen,
  onClose,
  video,
  formatDuration,
}: ProjectDetailModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const embedUrl = video?.embed_url
    ? `${video.embed_url.replace(/\/?$/, '')}?autoplay=1`
    : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pt-14 sm:pt-20 pb-4 bg-black/90 backdrop-blur-sm overflow-y-auto overscroll-contain"
      style={{ minHeight: '100dvh' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[calc(100dvh-5rem)] sm:max-h-[calc(100dvh-6rem)] flex flex-col lg:flex-row gap-3 sm:gap-6 bg-black/60 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors touch-manipulation"
          aria-label="Закрыть"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Левая панель — весь текст */}
        <div className="flex-1 min-h-0 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto order-2 lg:order-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 pr-10 sm:pr-12">
            {video?.title}
          </h2>
          {video?.author?.name && (
            <p className="text-white/60 text-sm mb-2 sm:mb-4">{video.author.name}</p>
          )}
          {video?.duration != null && (
            <p className="text-white/50 text-sm mb-2 sm:mb-4">{formatDuration(video.duration)}</p>
          )}
          <div className="text-white/80 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {video?.description || 'Без описания'}
          </div>
        </div>

        {/* Правая панель — плеер Rutube */}
        <div className="flex-shrink-0 w-full lg:w-[55%] xl:w-[50%] p-3 sm:p-4 lg:p-6 order-1 lg:order-2">
          <div className="aspect-video bg-black rounded-lg sm:rounded-xl overflow-hidden min-h-0">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={video?.title ?? ''}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60">
                Видео недоступно
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
