import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import NotificationBell from '../components/NotificationBell';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1523293115678-efa2e8250280?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
];

function Home() {
  const { cartCount, setIsCartOpen } = useCart();
  const [currentBg, setCurrentBg] = useState(0);
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));

    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // 6s per image
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="landing-container">
      {/* Background Image Slideshow wrapper for Zoom animation */}
      {HERO_IMAGES.map((img, index) => (
        <div 
          key={index} 
          className="landing-bg" 
          style={{ 
            backgroundImage: `url(${img})`,
            opacity: index === currentBg ? 1 : 0,
            transition: 'opacity 2.5s ease-in-out'
          }}
        ></div>
      ))}

      {/* Floating Header */}
      <header className="landing-header">
        <div className="brand-logo" style={{ animation: 'fadeIn 2s ease forwards' }}>
          Mahmoud Parfum
        </div>
        <nav style={{ animation: 'fadeIn 2.5s ease forwards', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/parfums" className="landing-btn-nav">
            {t('Nos Collections')}
          </Link>
          <Link to="/contact" className="landing-btn-nav" style={{ background: 'transparent', color: '#ccc' }}>
            {t('Contact')}
          </Link>
          {user ? (
            <div className="user-menu">
              <div className="user-profile">
                <FaUserCircle size={18} />
                <span>{user.fullName}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn" title={t('Quitter')}>
                <FaSignOutAlt size={16} />
                <span>{t('Quitter')}</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="landing-btn-nav" style={{ background: '#d4af37', color: '#000', border: 'none' }}>
              {t('Connexion')}
            </Link>
          )}
          <LanguageToggle />
          <NotificationBell user={user} />
          <button className="nav-cart-btn" onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </nav>
      </header>

      {/* Hero Content */}
      <main className="landing-content">
        <h1 className="landing-title serif" dangerouslySetInnerHTML={{ __html: t('hero_title').replace('<br />', '<br/>') }}></h1>
        <p className="landing-subtitle">{t('hero_subtitle')}</p>

        <Link to="/parfums" className="landing-btn-discover">
          {t('Découvrir Notre Collection')}
        </Link>
      </main>

    </div>
  );
}

export default Home;
