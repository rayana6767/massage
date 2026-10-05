import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, ExternalLink, RotateCcw } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
}) => {
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      setScale(1);
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.3, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.3, 0.7));
  const handleResetZoom = () => setScale(1);

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="lightbox-container"
        className="relative max-w-5xl w-full bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl border border-[#E3D8C8] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#EBE3D7] bg-[#F4EDE2]">
          <div className="flex items-center space-x-2 min-w-0 pr-2">
            <ZoomIn className="w-5 h-5 text-[#707C64] shrink-0" />
            <h4 className="text-sm sm:text-base font-semibold text-[#2D2926] truncate">{title}</h4>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Zoom Controls */}
            <div className="flex items-center bg-white/70 rounded-lg border border-[#DDD3C2] p-0.5 text-xs text-[#554E46]">
              <button
                onClick={handleZoomOut}
                aria-label="Уменьшить"
                title="Уменьшить"
                className="p-1.5 hover:bg-white rounded transition-colors cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                title="Сброс масштаба"
                className="px-1.5 text-[11px] font-mono hover:bg-white rounded transition-colors cursor-pointer"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                aria-label="Увеличить"
                title="Увеличить"
                className="p-1.5 hover:bg-white rounded transition-colors cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Open Original in New Tab */}
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Открыть оригинал в новой вкладке"
              className="p-1.5 rounded-lg text-[#6D675F] hover:text-[#2D2926] hover:bg-[#EBE3D7] transition-colors flex items-center gap-1 text-xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden md:inline text-[11px] font-medium">Оригинал</span>
            </a>

            <button
              id="lightbox-close-btn"
              onClick={onClose}
              aria-label="Закрыть просмотр"
              className="p-1.5 rounded-full text-[#6D675F] hover:text-[#2D2926] hover:bg-[#EBE3D7] transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Display with Zoom */}
        <div className="relative flex-1 min-h-[350px] max-h-[68vh] bg-[#1a1a1a] flex items-center justify-center overflow-auto p-2">
          <img
            src={imageUrl}
            alt={title}
            style={{ transform: `scale(${scale})`, transition: 'transform 0.15s ease-out' }}
            className="max-w-full max-h-full object-contain select-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption */}
        {description && (
          <div className="px-5 py-3.5 bg-[#FAF7F2] border-t border-[#EBE3D7]">
            <p className="text-xs sm:text-sm text-[#554E46] leading-relaxed">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
