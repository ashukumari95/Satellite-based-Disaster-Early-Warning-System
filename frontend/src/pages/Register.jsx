import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import axios from 'axios';
import heroImg from '../assets/hero.png';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Error messages ke liye ek state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Purana error saaf karein
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // Data object banayein
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      // Headers ko explicitly define karein (Best Practice)
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // API call me data aur config, dono bhejein
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        userData,
        config
      );

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Registration successful!');
        navigate('/'); // Homepage par redirect karein
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      console.error('Registration Error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div> 
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-xl bg-transparent flex flex-col md:flex-row">
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
                  className="text-2xl font-bold text-center mb-6 text-slate-800"
                >
                  {t('register.title')}
                </motion.h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Message Display */}
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}

                  {/* Form Inputs */}
                  <div>
                    <label htmlFor="name" className="block text-slate-600 text-sm mb-1">{t('register.name')}</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-600 text-sm mb-1">{t('register.email')}</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-slate-600 text-sm mb-1">{t('register.password')}</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-3 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-slate-600 text-sm mb-1">{t('register.confirmPassword')}</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full p-3 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  
                  <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 font-medium disabled:bg-blue-300">
                    {loading ? 'Registering...' : t('register.submit')}
                  </button>
                </form>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className="mt-4 text-center text-slate-600 text-sm"
                >
                  {t('register.alreadyHaveAccount')} <Link to="/login" className="text-blue-600 hover:underline">{t('navbar.login')}</Link>
                </motion.p>
              </motion.div>
            </Tilt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

