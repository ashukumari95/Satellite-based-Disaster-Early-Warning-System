import axios from 'axios';

// Backend का URL सेट करें
const API_URL = 'http://localhost:5000/api';

// एक axios इंस्टेंस बनाएँ
const api = axios.create({
  baseURL: API_URL,
});

// (महत्वपूर्ण) एक इंटरसेप्टर जोड़ें जो हर अनुरोध के साथ टोकन भेजेगा
api.interceptors.request.use((req) => {
  // localStorage से उपयोगकर्ता की जानकारी प्राप्त करें
  const profile = localStorage.getItem('profile');
  if (profile) {
    const token = JSON.parse(profile).token;
    // हर अनुरोध के Authorization हेडर में टोकन जोड़ें
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Authentication से जुड़े API कॉल्स
export const login = (formData) => api.post('/auth/login', formData);
export const register = (formData) => api.post('/auth/register', formData);

// Alerts से जुड़े API कॉल्स
export const fetchAlerts = () => api.get('/alerts');
export const getAlertById = (id) => api.get(`/alerts/${id}`);
// ... आप यहाँ और भी API कॉल्स जोड़ सकते हैं

export default api;