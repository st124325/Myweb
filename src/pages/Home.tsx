import { ShaderAnimation } from '@/components/ui/shader-animation';
import { SparklesCore } from '@/components/ui/sparkles';
import { useNavigate } from 'react-router-dom';
import { StarButton } from '@/components/ui/star-button';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <ShaderAnimation />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Разработка
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-white/90 mb-8">
            Telegram ботов и сайтов
          </h2>
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl">
            Создам современные решения для вашего бизнеса с использованием передовых технологий
          </p>
          <div className="absolute bottom-12">
            <StarButton
              onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
              lightColor="#FF2056"
              className="px-8 py-3 text-lg"
            >
              Узнать подробнее ↓
            </StarButton>
          </div>
        </div>
      </section>

      {/* Почему нужен бот */}
      <section id="why-us" className="relative w-full min-h-screen flex items-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/85" aria-hidden="true" />
        <SparklesCore
          id="sparkles-bot"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          speed={1}
          particleDensity={100}
          particleColor="#FFFFFF"
          className="absolute inset-0"
        />
        <div className="container mx-auto max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">
            Зачем вам Telegram-бот?
          </h2>
          <div className="space-y-6 text-white/85 text-lg leading-relaxed">
            <p>
              <strong className="text-white">Автоматизация без отрыва от мессенджера.</strong> Клиенты уже в Telegram — не нужно заставлять их переходить на сайт или звонить. Бот принимает заказы, отвечает на вопросы, собирает заявки 24/7, пока вы занимаетесь делами.
            </p>
            <p>
              <strong className="text-white">Меньше рутины, больше продаж.</strong> Один бот может заменить менеджера на типовых запросах: каталог, цены, запись на услугу, доставка. Вы тратите время только на нестандартные задачи и личные переговоры.
            </p>
            <p>
              <strong className="text-white">Прямой канал связи с клиентом.</strong> Рассылки, напоминания, акции — всё в одном чате. Вы не зависите от соцсетей и их алгоритмов: подписчик бота остаётся вашей аудиторией.
            </p>
            <p>
              Бот под ключ — это не «игрушка», а рабочий инструмент: приём оплаты, интеграция с CRM, выгрузка в таблицы, уведомления вам в личку. Всё под ваши процессы.
            </p>
          </div>
        </div>
      </section>

      {/* Почему нужен сайт */}
      <section className="relative w-full min-h-screen flex items-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/85" aria-hidden="true" />
        <SparklesCore
          id="sparkles-site"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          speed={1}
          particleDensity={100}
          particleColor="#FFFFFF"
          className="absolute inset-0"
        />
        <div className="container mx-auto max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">
            Зачем вам свой сайт?
          </h2>
          <div className="space-y-6 text-white/85 text-lg leading-relaxed">
            <p>
              <strong className="text-white">Видимость и доверие.</strong> Поисковики приводят клиентов по запросам «услуги в вашем городе», «заказать то-то». Сайт — это визитка, которая работает круглосуточно и показывает, что у вас есть оффер, контакты и кейсы.
            </p>
            <p>
              <strong className="text-white">Один источник правды.</strong> Все актуальные цены, условия, контакты — в одном месте. Не нужно обновлять десятки карточек в разных сервисах: поменяли на сайте — информация везде корректна.
            </p>
            <p>
              <strong className="text-white">Лидогенерация и продажи.</strong> Формы заявок, кнопки «Заказать» или «Записаться», интеграция с оплатой — сайт может не только рассказывать, но и приводить заявки и деньги.
            </p>
            <p>
              Адаптивная вёрстка, быстрая загрузка и понятная структура — то, что ожидают и пользователи, и поисковики. Сайт, сделанный под ваши цели, окупается за счёт новых клиентов и экономии времени на ручных ответах.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/85" aria-hidden="true" />
        <SparklesCore
          id="sparkles-cta"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          speed={1}
          particleDensity={100}
          particleColor="#FFFFFF"
          className="absolute inset-0"
        />
        <div className="text-center relative z-10">
          <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-xl mx-auto">
            Готовы обсудить бота или сайт под ваши задачи?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <StarButton
              onClick={() => navigate('/portfolio')}
              lightColor="#FF2056"
              className="px-8 py-3 text-lg"
            >
              Смотреть портфолио →
            </StarButton>
            <StarButton
              onClick={() => navigate('/order')}
              lightColor="#4CAF50"
              className="px-8 py-3 text-lg"
            >
              Оставить заявку
            </StarButton>
          </div>
        </div>
      </section>
    </div>
  );
}
