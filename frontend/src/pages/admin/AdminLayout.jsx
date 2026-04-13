import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { FaThLarge, FaPlusCircle, FaListUl, FaUsers, FaClipboardList, FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';
import LanguageToggle from '../../components/LanguageToggle';
import { API_BASE_URL } from '../../apiConfig';

function AdminLayout() {
  const location = useLocation();
  const { t } = useTranslation();
  const [pendingCount, setPendingCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let lastCount = 0;
    const fetchPendingOrders = () => {
      fetch(`${API_BASE_URL}/orders/pending/count`)
        .then(res => res.json())
        .then(data => {
          if (data.count > lastCount && lastCount !== 0) {
            alert(t('Nouvelle commande reçue !'));
          }
          lastCount = data.count;
          setPendingCount(data.count);
        })
        .catch(console.error);
    };

    fetchPendingOrders();
    const interval = setInterval(fetchPendingOrders, 10000);
    return () => clearInterval(interval);
  }, [t]);

  const navItems = [
    { path: '/admin', label: t("Vue d'ensemble"), icon: <FaThLarge /> },
    { path: '/admin/produits', label: t('Ajouter un produit'), icon: <FaPlusCircle /> },
    { path: '/admin/catalogue', label: t('Catalogue'), icon: <FaListUl /> },
    { path: '/admin/utilisateurs', label: t('Gérer les Utilisateurs'), icon: <FaUsers /> },
    { path: '/admin/commandes', label: t('Gérer les Commandes'), icon: <FaClipboardList />, badge: pendingCount },
  ];

  return (
    <div className="min-h-screen bg-black text-light-text flex flex-col">
      {/* Top Bar */}
      <nav className="h-16 luxury-glass fixed top-0 w-full z-[100] flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden text-gold p-2" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <Link to="/" className="font-serif text-lg tracking-widest text-gold uppercase">Mahmoud Parfum Admin</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-[10px] uppercase tracking-widest text-muted-text hover:text-gold flex items-center gap-2 transition-colors">
            <FaArrowLeft size={10} /> {t('Retour au site')}
          </Link>
          <LanguageToggle />
        </div>
      </nav>

      <div className="flex flex-1 pt-16 h-screen">
        {/* Navigation Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-dark-card border-r border-dark-border transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full flex flex-col p-6">
             <h3 className="font-serif text-gold text-lg mb-8 pb-4 border-b border-white/5 uppercase tracking-widest">{t('Menu Admin')}</h3>
             
             <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      flex items-center justify-between p-4 rounded-lg transition-all group
                      ${(location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))) 
                        ? 'bg-gold/10 text-gold border border-gold/20 font-bold' 
                        : 'text-muted-text hover:bg-white/5 hover:text-light-text'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg opacity-70">{item.icon}</span>
                      <span className="text-[13px] uppercase tracking-wide">{item.label}</span>
                    </div>
                    {item.badge > 0 && (
                      <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
             </nav>

             <div className="mt-auto pt-6 border-t border-white/5 text-[10px] text-muted-text uppercase tracking-widest text-center">
                Système de Gestion v2.0
             </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scrollbar-thin scrollbar-thumb-gold/20">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
