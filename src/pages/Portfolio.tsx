import { useState, useEffect } from 'react';
import { SpiralAnimation } from '@/components/ui/spiral-animation';
import { useNavigate } from 'react-router-dom';
import { StarButton } from '@/components/ui/star-button';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';

/** Ссылка на канал Rutube или ID канала (из ссылки https://rutube.ru/video/person/123456/ → 123456) */
const RUTUBE_CHANNEL_URL_OR_ID = (import.meta.env.VITE_RUTUBE_CHANNEL_URL || import.meta.env.VITE_RUTUBE_CHANNEL_ID || '').trim();

/** Из ссылки на канал извлекаем ID (число). Пример: https://rutube.ru/video/person/62316078/ → 62316078 */
function parseChannelId(value: string): string {
  if (!value) return '';
  const match = value.match(/rutube\.ru\/video\/person\/(\d+)/i)
    || value.match(/rutube\.ru\/channel\/(\d+)/i)
    || value.match(/^(\d+)$/);
  return match ? match[1] : value;
}

const RUTUBE_CHANNEL_ID = parseChannelId(RUTUBE_CHANNEL_URL_OR_ID);

/** ID плейлиста (альтернатива каналу). Пример: plst/973044 → 973044 */
const RUTUBE_PLAYLIST_ID = (import.meta.env.VITE_RUTUBE_PLAYLIST_ID || '').trim();

interface RutubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  embed_url: string;
  video_url: string;
  duration?: number;
  author?: { name: string };
}

interface RutubePlaylistResponse {
  results: RutubeVideo[];
  has_next?: boolean;
  next?: string | null;
  page?: number;
  per_page?: number;
  num_pages?: number;
}

/** Ответ API канала может быть results или videos */
interface RutubeChannelResponse {
  results?: RutubeVideo[];
  videos?: RutubeVideo[];
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function buildApiUrl(path: string): string {
  const base = 'https://rutube.ru/api';
  const full = `${base}${path}`;
  if (import.meta.env.DEV) {
    return `/api/rutube${path}`;
  }
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(full)}`;
}

export function Portfolio() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<RutubeVideo[]>([]);
  const [loading, setLoading] = useState(!!(RUTUBE_CHANNEL_ID || RUTUBE_PLAYLIST_ID));
  const [useFallback, setUseFallback] = useState(!(RUTUBE_CHANNEL_ID || RUTUBE_PLAYLIST_ID));
  const [playingVideo, setPlayingVideo] = useState<RutubeVideo | null>(null);

  useEffect(() => {
    const source = RUTUBE_CHANNEL_ID ? 'channel' : RUTUBE_PLAYLIST_ID ? 'playlist' : null;
    if (!source) {
      setLoading(false);
      setUseFallback(true);
      return;
    }

    const tryFetch = (apiPath: string): Promise<RutubeVideo[]> => {
      return fetch(buildApiUrl(apiPath))
        .then((res) => res.json())
        .then((data: RutubePlaylistResponse | RutubeChannelResponse) => {
          const list =
            (data as RutubePlaylistResponse).results
            ?? (data as RutubeChannelResponse).videos
            ?? [];
          return Array.isArray(list) ? list : [];
        })
        .catch(() => []);
    };

    if (source === 'channel') {
      (async () => {
        const paths = [
          `/metainfo/userchannel/${RUTUBE_CHANNEL_ID}/video/`,
          `/video/person/${RUTUBE_CHANNEL_ID}/`,
        ];
        let list: RutubeVideo[] = [];
        for (const p of paths) {
          list = await tryFetch(p);
          if (list.length > 0) break;
        }
        if (list.length > 0) {
          setVideos(list);
          setUseFallback(false);
        } else {
          setUseFallback(true);
        }
        setLoading(false);
      })();
    } else {
      tryFetch(`/playlist/custom/${RUTUBE_PLAYLIST_ID}/videos/`)
        .then((list) => {
          if (list.length > 0) {
            setVideos(list);
            setUseFallback(false);
          } else {
            setUseFallback(true);
          }
        })
        .catch(() => setUseFallback(true))
        .finally(() => setLoading(false));
    }
  }, []);

  const hasSource = !!(RUTUBE_CHANNEL_ID || RUTUBE_PLAYLIST_ID);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="fixed inset-0">
        <SpiralAnimation />
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-4">
            Портфолио
          </h1>
          {hasSource && (
            <p className="text-white/70 text-center mb-16 max-w-2xl mx-auto">
              Видео из портфолио
            </p>
          )}

          {loading && (
            <div className="text-center text-white/70 py-12">
              Загрузка видео...
            </div>
          )}

          {!loading && !useFallback && videos.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {videos.map((video) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => setPlayingVideo(video)}
                    className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all hover:scale-[1.02] flex flex-col text-left group"
                  >
                    <div className="rounded-xl overflow-hidden mb-4 aspect-video bg-black relative">
                      <img
                        src={video.thumbnail_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white ml-1" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {video.duration != null && (
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white/90 text-xs">
                          {formatDuration(video.duration)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-white/70 flex-1 line-clamp-3 text-sm leading-relaxed">
                      {video.description || 'Без описания'}
                    </p>
                  </button>
                ))}
              </div>
              <ProjectDetailModal
                isOpen={!!playingVideo}
                onClose={() => setPlayingVideo(null)}
                video={playingVideo}
                formatDuration={formatDuration}
              />
            </>
          )}

          <div className="text-center">
            <p className="text-2xl text-white/90 mb-8">
              Готовы начать свой проект?
            </p>
            <StarButton
              onClick={() => navigate('/order')}
              lightColor="#FF2056"
              className="px-8 py-3 text-lg"
            >
              Оформить заказ →
            </StarButton>
          </div>
        </div>
      </div>
    </div>
  );
}
