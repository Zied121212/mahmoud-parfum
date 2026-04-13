import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaShoppingCart, FaUserCircle, FaSignOutAlt, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
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
    <div className="min-h-screen bg-dark-bg text-light-text selection:bg-gold/30 flex flex-col">
      <nav className="fixed top-0 w-full z-50 luxury-glass flex justify-between items-center px-6 py-4 md:px-[5%]">
        <Link to="/" className="font-serif text-xl md:text-2xl tracking-widest text-gold uppercase">Mahmoud Parfum</Link>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex gap-6">
            <Link to="/" className="text-xs uppercase tracking-widest hover:text-gold transition-colors">{t('Accueil')}</Link>
            <Link to="/parfums" className="text-xs uppercase tracking-widest hover:text-gold transition-colors">{t('Nos Collections')}</Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                <FaUserCircle className="text-gold" />
                <span className="text-[10px] uppercase hidden sm:block">{user.fullName}</span>
                <button onClick={handleLogout} className="text-muted-text hover:text-red-500 transition-colors"><FaSignOutAlt size={14} /></button>
              </div>
            ) : (
              <Link to="/login" className="text-xs uppercase tracking-widest text-gold hover:underline">{t('Connexion')}</Link>
            )}
            <LanguageToggle />
            <button className="nav-cart-btn" onClick={() => setIsCartOpen(true)}>
              <FaShoppingCart size={18} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-32 pb-16 px-6 md:px-[5%] flex flex-col items-center">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-6xl text-gold mb-4 uppercase tracking-tighter">{t('Contactez-Nous')}</h1>
          <p className="text-muted-text text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            {t("Nous sommes à votre disposition pour toute demande d'information.")}
          </p>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          {/* Info Card */}
          <div className="bg-dark-card border border-dark-border p-8 md:p-12 rounded-xl space-y-12">
            <div>
              <h3 className="font-serif text-2xl text-gold mb-8 tracking-wider">{t('Nos Coordonnées')}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-gold mt-1" />
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-[3px] text-muted-text">{t('Boutique')}</span>
                    <span className="text-sm font-light">Espace Mahmoud, Centre Ville Tunis, Tunisie</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaPhoneAlt className="text-gold mt-1" />
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-[3px] text-muted-text">{t('Téléphone')}</span>
                    <span className="text-sm font-light">+216 22 123 456</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaEnvelope className="text-gold mt-1" />
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-[3px] text-muted-text">{t('E-mail')}</span>
                    <span className="text-sm font-light font-mono">contact@mahmoudparfum.tn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Card */}
          <div className="bg-dark-card border border-dark-border p-8 md:p-12 rounded-xl flex flex-col justify-center">
             <h3 className="font-serif text-2xl text-gold mb-8 tracking-wider">{t('Suivez-Nous')}</h3>
             <div className="space-y-4">
                {[
                  { icon: <FaFacebook size={24} />, label: '@MahmoudParfum', link: 'https://www.facebook.com/profile.php?id=61587825218852' },
                  { icon: <FaInstagram size={24} />, label: '@mahmoud_parfum', link: 'https://www.instagram.com/fragrance_by_jabeur/' },
                  { icon: <FaTiktok size={24} />, label: '@mahmoudparfum_officiel', link: 'https://tiktok.com' },
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex justify-between items-center group p-4 border border-white/5 rounded-lg hover:border-gold hover:bg-gold/5 transition-all"
                  >
                    <span className="text-gold group-hover:scale-110 transition-transform">{social.icon}</span>
                    <span className="text-xs tracking-widest group-hover:text-gold">{social.label}</span>
                  </a>
                ))}
             </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-dark-border bg-black/20 text-center space-y-4 mt-auto">
        <h3 className="font-serif text-xl text-gold tracking-widest uppercase">MAHMOUD PARFUM</h3>
        <p className="text-[10px] text-muted-text uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Mahmoud Parfum. {t('Tous droits réservés.')}
        </p>
      </footer>
    </div>
  );
}

export default Contact;
