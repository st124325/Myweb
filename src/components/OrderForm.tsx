import { useState } from 'react';
import { StarButton } from './ui/star-button';

interface OrderFormData {
  name: string;
  contact: string;
  service: string;
  description: string;
}

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
}

export function OrderForm({ onSubmit }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    contact: '',
    service: 'telegram-bot',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6 p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
      <div>
        <label htmlFor="name" className="block text-white/80 mb-2 text-sm font-medium">
          Ваше имя *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
          placeholder="Ваше имя"
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-white/80 mb-2 text-sm font-medium">
          Контакт (телефон, email, telegram) *
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          required
          value={formData.contact}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
          placeholder="@username или email@example.com"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-white/80 mb-2 text-sm font-medium">
          Тип услуги *
        </label>
        <select
          id="service"
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors"
        >
          <option value="telegram-bot" className="bg-black">Telegram бот</option>
          <option value="website" className="bg-black">Сайт</option>
          <option value="both" className="bg-black">Бот и Сайт</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-white/80 mb-2 text-sm font-medium">
          Описание проекта *
        </label>
        <div className="text-white/60 text-sm mb-3 leading-relaxed space-y-4">
          {(formData.service === 'website' || formData.service === 'both') && (
            <div>
              <strong className="text-white/80">Для сайта:</strong>
              <p className="mt-1">
                Опишите структуру страниц и основные разделы, приложите примеры похожих сайтов (референсы) и объясните, какие элементы должны быть на каждом экране. Отдельно пропишите, как пользователь перемещается по сайту, какие кнопки куда ведут и какой контент должен отображаться в зависимости от действий посетителя.
              </p>
              <p className="mt-2">
                ✨ Если планируете дальнейшую поддержку — просто отметьте это в ТЗ, чтобы с первого дня предусмотреть стабильный хостинг и возможность оперативно вносить правки.
              </p>
            </div>
          )}
          {(formData.service === 'telegram-bot' || formData.service === 'both') && (
            <div>
              <strong className="text-white/80">Для бота:</strong>
              <p className="mt-1">
                Распишите сценарий шаг за шагом: с чего начинается общение, какие кнопки и команды видит пользователь, что бот отвечает на каждое сообщение. Укажите все данные, которые бот должен запрашивать и сохранять, а также опишите интеграции (например, отправка заявок в Telegram или Google Таблицы).
              </p>
              <p className="mt-2">
                🚀 Добавьте пару слов, планируете ли подключить ежемесячное обслуживание — тогда бот сразу будет размещён на надёжном сервере с готовностью к любым доработкам.
              </p>
            </div>
          )}
        </div>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={8}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors resize-y min-h-[120px]"
          placeholder="Опишите ваш проект по инструкции выше..."
        />
      </div>

      <div className="flex justify-center pt-4">
        <StarButton 
          lightColor="#FF2056"
          className="px-8 py-3 text-base"
        >
          Отправить заявку
        </StarButton>
      </div>
    </form>
  );
}
