import { useState } from 'react';
import { StarButton } from './ui/star-button';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function OrderModal({ isOpen, onClose, message }: OrderModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-4 bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Заявка принята!</h2>
          <p className="text-white/70 mb-1">Скопируйте сообщение и напишите мне в Telegram</p>
          <a 
            href="https://t.me/dolepp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            @dolepp
          </a>
        </div>

        <div className="bg-black/40 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
          <pre className="text-white/90 text-sm whitespace-pre-wrap font-mono">{message}</pre>
        </div>

        <div className="flex gap-4 justify-center">
          <StarButton
            onClick={handleCopy}
            lightColor="#4CAF50"
            className="px-6"
          >
            {copied ? '✓ Скопировано' : 'Скопировать'}
          </StarButton>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl text-white transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
