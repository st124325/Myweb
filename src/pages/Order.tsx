import { useState } from 'react';
import { EtheralShadow } from '@/components/ui/etheral-shadow';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';
import { OrderForm } from '@/components/OrderForm';
import { OrderModal } from '@/components/OrderModal';

interface OrderFormData {
  name: string;
  contact: string;
  service: string;
  description: string;
}

export function Order() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');

  const handleSubmit = (data: OrderFormData) => {
    const serviceNames = {
      'telegram-bot': 'Telegram бот',
      'website': 'Сайт',
      'both': 'Бот и Сайт'
    };

    const message = `🎯 Новая заявка на разработку

👤 Имя: ${data.name}
📞 Контакт: ${data.contact}
🛠 Услуга: ${serviceNames[data.service as keyof typeof serviceNames]}

📝 Описание проекта:
${data.description}

---
Пожалуйста, свяжитесь со мной для обсуждения деталей!`;

    setOrderMessage(message);
    setIsModalOpen(true);
  };

  const motivationalWords = [
    "ВОПЛОТИТЕ",
    "СВОЮ ИДЕЮ",
    "В РЕАЛЬНОСТЬ",
    "ПРЯМО",
    "СЕЙЧАС"
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0">
        <EtheralShadow
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Particle Text Effect Section */}
          <div className="flex justify-center mb-12">
            <ParticleTextEffect 
              words={motivationalWords}
              className="border border-gray-800 rounded-lg shadow-2xl"
            />
          </div>

          {/* Motivational Text */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Закажите разработку прямо сейчас
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Заполните форму ниже, и я свяжусь с вами для обсуждения деталей вашего проекта
            </p>
          </div>

          {/* Order Form */}
          <OrderForm onSubmit={handleSubmit} />
        </div>
      </div>

      {/* Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={orderMessage}
      />
    </div>
  );
}
