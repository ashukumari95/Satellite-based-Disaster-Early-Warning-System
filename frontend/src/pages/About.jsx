import React from 'react';
import { useTranslation } from 'react-i18next';
import heroImg from '../assets/hero.png';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Hero */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center gap-6 p-6 mb-8">
        <img src={heroImg} alt="globe" className="w-36 h-36 md:w-48 md:h-48 rounded-lg shadow-lg object-cover" />
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">{t('about.title')}</h1>
          <p className="text-slate-600 text-lg mb-4">{t('about.subtitle')}</p>
          <div className="flex gap-3">
            <a href="#features" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">{t('about.exploreFeatures')}</a>
            <a href="#how" className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50">{t('about.howItWorks')}</a>
          </div>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('about.keyFeatures')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-3xl mb-3">🛰️</div>
            <h3 className="font-semibold text-slate-800">{t('about.satelliteMonitoring')}</h3>
            <p className="text-sm text-slate-600 mt-2">{t('about.satelliteMonitoringDesc')}</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-3xl mb-3">⚠️</div>
            <h3 className="font-semibold text-slate-800">{t('about.realTimeAlerts')}</h3>
            <p className="text-sm text-slate-600 mt-2">{t('about.realTimeAlertsDesc')}</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="font-semibold text-slate-800">{t('about.interactiveMaps')}</h3>
            <p className="text-sm text-slate-600 mt-2">{t('about.interactiveMapsDesc')}</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-slate-800">{t('about.analyticsInsights')}</h3>
            <p className="text-sm text-slate-600 mt-2">{t('about.analyticsInsightsDesc')}</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-semibold text-slate-800">{t('about.multilingualSupport')}</h3>
            <p className="text-sm text-slate-600 mt-2">{t('about.multilingualSupportDesc')}</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-slate-800">{t('about.secureReliable')}</h3>
            <p className="text-sm text-slate-600 mt-2">{t('about.secureReliableDesc')}</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('about.howItWorksTitle')}</h2>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <ol className="space-y-4 list-decimal list-inside text-slate-700">
            <li>
              {t('about.dataCollection')}
            </li>
            <li>
              {t('about.processingDetection')}
            </li>
            <li>
              {t('about.alertGeneration')}
            </li>
            <li>
              {t('about.visualizationDistribution')}
            </li>
          </ol>
        </div>
      </section>

      {/* Tech stack & Data sources */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">{t('about.techStack')}</h3>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>{t('about.frontend')}</li>
            <li>{t('about.mapping')}</li>
            <li>{t('about.backend')}</li>
            <li>{t('about.dataProcessing')}</li>
            <li>{t('about.storageHosting')}</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">{t('about.dataSources')}</h3>
          <p className="text-slate-700 text-sm">{t('about.dataSourcesDesc')}</p>
        </div>
      </section>

      {/* Impact & CTA */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white rounded-lg p-8 shadow-lg flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{t('about.protectCommunities')}</h3>
            <p className="text-white/90">{t('about.protectCommunitiesDesc')}</p>
          </div>
          <div>
            <a href="/register" className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-semibold shadow hover:opacity-95">{t('about.getStarted')}</a>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-slate-500">{t('about.questions')}</footer>
    </div>
  );
};

export default About;
