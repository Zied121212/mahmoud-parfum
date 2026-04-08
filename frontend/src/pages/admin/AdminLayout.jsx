import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import LanguageToggle from '../../components/LanguageToggle';

function AdminLayout() {
  const location = useLocation();
  const { t } = useTranslation();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    let lastCount = 0;
    const fetchPendingOrders = () => {
      fetch('http://localhost:5000/api/orders/pending/count')
        .then(res => res.json())
        .then(data => {
          if (data.count > lastCount && lastCount !== 0) {
            // Custom notification logic: here a simple alert when a new order arrives
            // Can be replaced by react-toastify or a custom popup if needed
            alert(t('Nouvelle commande reçue !'));
          }
          lastCount = data.count;
          setPendingCount(data.count);
        })
        .catch(console.error);
    };

    fetchPendingOrders();
    const interval = setInterval(fetchPendingOrders, 10000); // 10 secondes
    return () => clearInterval(interval);
  }, [t]);

  return (
    <>
      <nav className="navbar" style={{ position: 'relative', background: '#0a0a0a' }}>
        <Link to="/" className="brand-logo">Mahmoud Parfum</Link>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">{t('Retour au site')}</Link>
          <LanguageToggle />
        </div>
      </nav>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: '#000' }}>
        
        {/* Navigation Sidebar (Left Panel) */}
        <div style={{ 
          width: '300px', 
          background: '#111', 
          borderRight: '1px solid #333',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <h3 className="serif" style={{ color: '#d4af37', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>{t('Menu Admin')}</h3>
          
          <Link 
            to="/admin" 
            style={{ 
              color: location.pathname === '/admin' || location.pathname === '/admin/' ? '#d4af37' : '#fff',
              textDecoration: 'none',
              fontWeight: location.pathname === '/admin' || location.pathname === '/admin/' ? 'bold' : 'normal'
            }}
          >
            {t("Vue d'ensemble")}
          </Link>

          <Link 
            to="/admin/produits" 
            style={{ 
              color: location.pathname.includes('produits') ? '#d4af37' : '#fff',
              textDecoration: 'none',
              fontWeight: location.pathname.includes('produits') ? 'bold' : 'normal'
            }}
          >
            {t('Ajouter un produit')}
          </Link>

          <Link 
            to="/admin/catalogue" 
            style={{ 
              color: location.pathname.includes('catalogue') ? '#d4af37' : '#fff',
              textDecoration: 'none',
              fontWeight: location.pathname.includes('catalogue') ? 'bold' : 'normal'
            }}
          >
            {t('Catalogue')}
          </Link>

          <Link 
            to="/admin/utilisateurs" 
            style={{ 
              color: location.pathname.includes('utilisateurs') ? '#d4af37' : '#fff',
              textDecoration: 'none',
              fontWeight: location.pathname.includes('utilisateurs') ? 'bold' : 'normal'
            }}
          >
            {t('Gérer les Utilisateurs')}
          </Link>

          <Link 
            to="/admin/commandes" 
            style={{ 
              color: location.pathname.includes('commandes') ? '#d4af37' : '#fff',
              textDecoration: 'none',
              fontWeight: location.pathname.includes('commandes') ? 'bold' : 'normal',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {t('Gérer les Commandes')}
            {pendingCount > 0 && (
              <span style={{
                background: '#ff4d4d',
                color: '#fff',
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: 'bold'
              }}>
                {pendingCount}
              </span>
            )}
          </Link>
        </div>

        {/* Main Content Area (Right) */}
        <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
          <Outlet />
        </div>

      </div>
    </>
  );
}

export default AdminLayout;
