import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // form state
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [language, setLanguage] = useState('English');
  const [avatar, setAvatar] = useState(null);

  // active section refs for scrolling
  const generalRef = useRef(null);
  const notificationsRef = useRef(null);
  const privacyRef = useRef(null);
  const securityRef = useRef(null);

  // helper: scroll to ref
  const scrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // sidebar click handlers
  const handleGeneralClick = () => {
    scrollTo(generalRef);
  };
  const handleNotificationsClick = () => {
    scrollTo(notificationsRef);
  };
  const handlePrivacyClick = () => {
    scrollTo(privacyRef);
  };
  const handleSecurityClick = () => {
    scrollTo(securityRef);
  };

  // file input ref for avatar change
  const fileInputRef = useRef(null);
  const handleChangePhoto = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  // save settings
  const handleSaveChanges = () => {
    const payload = { firstName, lastName, email, language, avatar };
    try {
      localStorage.setItem('settings', JSON.stringify(payload));
      alert('Settings saved');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // on mount, if url has hash, navigate to that section
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'notifications') handleNotificationsClick();
    if (hash === 'privacy') handlePrivacyClick();
    if (hash === 'security') handleSecurityClick();
    if (!hash) handleGeneralClick();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">{t('settings.title')}</h3>
          <nav className="space-y-2">
            <button onClick={handleGeneralClick} className="flex items-center w-full text-left p-2 rounded-md bg-indigo-50 text-indigo-600">
              <span className="ml-2">{t('settings.general')}</span>
            </button>
            <button onClick={handleNotificationsClick} className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-100">{t('settings.notifications')}</button>
            <button onClick={handlePrivacyClick} className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-100">{t('settings.privacy')}</button>
            <button onClick={handleSecurityClick} className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-100">{t('settings.security')}</button>
            <button onClick={() => alert('Users settings - not implemented')} className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-100">{t('settings.users')}</button>
          </nav>
          <div className="mt-6 border-t pt-4">
            <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded">{t('navbar.logout')}</button>
          </div>
        </aside>

        {/* Main content */}
        <main className="md:col-span-3 space-y-6">
          <section ref={generalRef} id="general" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-2">{t('settings.generalSettings')}</h2>
            <p className="text-sm text-gray-500 mb-6">{t('settings.manageGeneral')}</p>

            <div className="border rounded-md p-6 bg-gray-50">
              <h4 className="font-medium mb-4">{t('settings.profile')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="p-3 border rounded" placeholder={t('settings.firstName')} />
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-3 border rounded" placeholder={t('settings.lastName')} />
              </div>
              <div className="mt-4">
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded" placeholder={t('settings.emailAddress')} />
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-200 to-rose-200 flex items-center justify-center overflow-hidden">
                  {avatar ? (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-medium">{(firstName[0] || 'J') + (lastName[0] || 'D')}</span>
                  )}
                </div>
                <div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  <button onClick={handleChangePhoto} className="px-3 py-2 border rounded bg-white">{t('settings.change')}</button>
                </div>
              </div>
              <div className="mt-6 text-right">
                <button onClick={handleSaveChanges} className="px-4 py-2 bg-indigo-600 text-white rounded">{t('settings.saveChanges')}</button>
              </div>
            </div>
          </section>

          <section ref={notificationsRef} id="notifications" className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-2">{t('settings.notifications')}</h3>
            <p className="text-sm text-gray-500 mb-4">{t('settings.controlNotifications')}</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <span>{t('settings.emailAlerts')}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" />
                <span>{t('settings.smsAlerts')}</span>
              </label>
            </div>
            <div className="mt-4 text-right">
              <button onClick={() => alert('Notification preferences saved')} className="px-4 py-2 bg-indigo-600 text-white rounded">{t('settings.save')}</button>
            </div>
          </section>

          <section ref={privacyRef} id="privacy" className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-2">{t('settings.privacy')}</h3>
            <p className="text-sm text-gray-500 mb-4">{t('settings.managePrivacy')}</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <span>{t('settings.showProfile')}</span>
              </label>
            </div>
            <div className="mt-4 text-right">
              <button onClick={() => alert('Privacy settings saved')} className="px-4 py-2 bg-indigo-600 text-white rounded">{t('settings.save')}</button>
            </div>
          </section>

          <section ref={securityRef} id="security" className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-2">{t('settings.security')}</h3>
            <p className="text-sm text-gray-500 mb-4">{t('settings.updateSecurity')}</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" />
                <span>{t('settings.enable2FA')}</span>
              </label>
            </div>
            <div className="mt-4 text-right">
              <button onClick={() => alert('Security settings saved')} className="px-4 py-2 bg-indigo-600 text-white rounded">{t('settings.save')}</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Settings;
