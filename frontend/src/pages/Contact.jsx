import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaShoppingCart, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';

function Contact() {
  const { cartCount, setIsCartOpen } = useCart();
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <nav className="navbar" style={{ position: 'relative', background: '#0a0a0a' }}>
        <Link to="/" className="brand-logo">Mahmoud Parfum</Link>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#ccc' }}>{t('Accueil')}</Link>
          <Link to="/parfums" style={{ color: '#ccc' }}>{t('Nos Collections')}</Link>
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
            <Link to="/login" style={{ color: '#d4af37' }}>{t('Connexion')}</Link>
          )}
          <LanguageToggle />
          <button className="nav-cart-btn" onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      <main style={{ minHeight: '100vh', padding: '100px 5% 50px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeIn 1s ease-out' }}>
          <h1 className="serif" style={{ fontSize: '3rem', color: '#d4af37', marginBottom: '1rem' }}>{t('Contactez-Nous')}</h1>
          <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            {t("Nous sommes à votre disposition pour toute demande d'information.")}
          </p>
        </div>

        <div className="contact-box" style={{ background: '#151515', border: '1px solid #333', padding: '3rem', borderRadius: '8px', maxWidth: '800px', width: '100%', animation: 'fadeIn 1s ease-out 0.3s both' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            
            <div>
              <h3 className="serif" style={{ color: '#d4af37', marginBottom: '1.5rem', fontSize: '1.5rem', letterSpacing: '1px' }}>{t('Nos Coordonnées')}</h3>
              <p style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{t('Localisation')}</span> 
                <span style={{ fontSize: '1.1rem' }}>12 Avenue Montaigne, 75008 Paris, France</span>
              </p>
              <p style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{t('Numéro de téléphone')}</span> 
                <span style={{ fontSize: '1.1rem' }}>+33 1 40 50 60 70</span>
              </p>
              <p style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{t('Adresse E-mail')}</span> 
                <span style={{ fontSize: '1.1rem' }}>contact@mahmoudparfum.com</span>
              </p>
            </div>

            <div>
              <h3 className="serif" style={{ color: '#d4af37', marginBottom: '1.5rem', fontSize: '1.5rem', letterSpacing: '1px' }}>{t('Suivez-Nous')}</h3>
              <p style={{ marginBottom: '2rem', color: '#aaa', lineHeight: '1.6' }}></p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem', transition: 'all 0.3s' }} onMouseOver={(e) => {e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = '#d4af37';}} onMouseOut={(e) => {e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#333';}}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px' }}><FaFacebook size={24} /></span>
                  <span>@MahmoudParfum</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem', transition: 'all 0.3s' }} onMouseOver={(e) => {e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = '#d4af37';}} onMouseOut={(e) => {e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#333';}}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px' }}><FaInstagram size={24} /></span>
                  <span>@mahmoud_parfum</span>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.5rem', transition: 'all 0.3s' }} onMouseOver={(e) => {e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = '#d4af37';}} onMouseOut={(e) => {e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#333';}}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px' }}><FaTiktok size={24} /></span>
                  <span>@mahmoudparfum_officiel</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer style={{ background: '#0a0a0a', padding: '3rem', textAlign: 'center', borderTop: '1px solid #222', marginTop: 'auto' }}>
        <p className="serif" style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#d4af37' }}>MAHMOUD PARFUM</p>
        <p style={{ color: '#666' }}>&copy; {new Date().getFullYear()} Mahmoud Parfum. Tous droits réservés.</p>
      </footer>
    </>
  );
}

export default Contact;
