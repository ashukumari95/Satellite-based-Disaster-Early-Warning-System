import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Alerts from '../pages/Alerts';
import Map from '../pages/Map';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Settings from '../pages/Settings';
import AlertDetail from '../pages/alerts/AlertDetail';
import NotFound from '../pages/NotFound';
import MainLayout from '../layouts/MainLayout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/alerts" element={<MainLayout><Alerts /></MainLayout>} />
        <Route path="/map" element={<MainLayout><Map /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
  <Route path="/alerts/:type" element={<MainLayout><AlertDetail /></MainLayout>} />
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
