import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate को इम्पोर्ट करें
import Tilt from 'react-parallax-tilt';
import  {motion} from 'framer-motion';
import heroImg from '../assets/hero.png';
import api  from '../services/api'; // हमारी API सर्विस को इम्पोर्ट करें

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // रीडायरेक्ट करने के लिए navigate हुक का उपयोग करें
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // लोडिंग और एरर को संभालने के लिए स्टेट बनाएँ
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handleSubmit को async बनाएँ ताकि हम API कॉल का इंतजार कर सकें
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // लोडिंग शुरू करें
    setError(''); // पुरानी त्रुटियों को साफ़ करें

    try {
      // '/auth/login' एंडपॉइंट पर POST अनुरोध भेजें
      const { data } = await api.post('/auth/login', formData);
      
      // सफल लॉगिन पर, उपयोगकर्ता की जानकारी और टोकन को localStorage में सहेजें
      localStorage.setItem('profile', JSON.stringify(data));
      
      // उपयोगकर्ता को होम पेज पर भेजें
      navigate('/');

    } catch (err) {
      // यदि कोई त्रुटि होती है, तो उसे दिखाएँ
      setError(
        err.response?.data?.message ||
        'Login failed. Please check your credentials.'
      );
      console.error(err);
    } finally {
      setIsLoading(false); // लोडिंग समाप्त करें
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-xl bg-transparent flex flex-col md:flex-row">
        {/* Left hero panel */}
        <div className="hidden md:flex md:w-1/2 bg-slate-900 text-white p-10 flex-col items-center justify-center space-y-6">
          <img src={heroImg} alt="hero" className="w-56 h-56 object-cover rounded-full shadow-2xl" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center">{t('home.stayAhead')}</h2>
          <p className="text-center text-slate-300 max-w-sm">{t('home.description')}</p>
        </div>

        {/* Right form card */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex items-center justify-center">
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            perspective={1000}
            scale={1.02}
            transitionSpeed={400}
            className="w-full max-w-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="text-2xl font-bold text-center mb-4 text-slate-800"
              >
                {t('login.title')}
              </motion.h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* एरर संदेश दिखाने के लिए */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <div>
                  <label htmlFor="email" className="block text-slate-600 text-sm mb-1">{t('login.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-slate-600 text-sm mb-1">{t('login.password')}</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading} // लोडिंग के दौरान बटन को डिसेबल करें
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {/* लोडिंग के दौरान बटन का टेक्स्ट बदलें */}
                  {isLoading ? t('login.loading') : t('login.submit')}
                </button>
              </form>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-4 text-center text-slate-600 text-sm"
              >
                {t('login.noAccount')} <Link to="/register" className="text-blue-600 hover:underline">{t('navbar.register')}</Link>
              </motion.p>
            </motion.div>
          </Tilt>
        </div>
      </div>
    </div>
  );
};

export default Login;
