import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import CartSidebar from './components/CartSidebar';
import LuxuryBackground from './components/LuxuryBackground';
import Home from './pages/Home';
import Parfums from './pages/Parfums';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProduits from './pages/admin/AdminProduits';
import AdminCatalogue from './pages/admin/AdminCatalogue';
import AdminUtilisateurs from './pages/admin/AdminUtilisateurs';
import AdminCommandes from './pages/admin/AdminCommandes';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <Routes>
        {/* Landing Page ultra Luxe */}
        <Route path="/" element={<Home />} />
        {/* Boutique Parfums */}
        <Route path="/parfums" element={<Parfums />} />
        {/* Espace Administrateur Cache */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="produits" element={<AdminProduits />} />
          <Route path="catalogue" element={<AdminCatalogue />} />
          <Route path="utilisateurs" element={<AdminUtilisateurs />} />
          <Route path="commandes" element={<AdminCommandes />} />
        </Route>
        {/* Contact Us Page */}
        <Route path="/contact" element={<Contact />} />
        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <LuxuryBackground />
      <CartSidebar />
    </Router>
  );
}

export default App;
