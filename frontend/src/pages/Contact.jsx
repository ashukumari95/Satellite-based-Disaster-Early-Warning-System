import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    alert(t('contact.thankYouMessage'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{t('contact.title')}</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">{t('contact.description')}</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('contact.getInTouch')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">{t('contact.name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('contact.namePlaceholder')}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">{t('contact.email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('contact.emailPlaceholder')}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">{t('contact.subject')}</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('contact.subjectPlaceholder')}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">{t('contact.message')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('contact.messagePlaceholder')}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {t('contact.sendMessage')}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('contact.contactInformation')}</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">{t('contact.emailLabel')}</p>
                <p className="text-gray-600">{t('contact.emailValue')}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">{t('contact.addressLabel')}</p>
                <p className="text-gray-600">{t('contact.addressValue')}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">{t('contact.phoneLabel')}</p>
                <p className="text-gray-600">{t('contact.phoneValue')}</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">{t('contact.emergencyHotline')}</h3>
            <p className="text-gray-600 mb-2">{t('contact.emergencyDescription')}</p>
            <p className="text-red-600 font-bold text-lg">{t('contact.emergencyNumber')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
