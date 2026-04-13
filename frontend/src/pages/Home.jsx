import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));

    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col">
      {/* Background Image Slideshow with Zoom */}
      {HERO_IMAGES.map((img, index) => (
        <div 
          key={index} 
          className="absolute inset-0 bg-center bg-cover z-0 brightness-[0.35] animate-slow-zoom" 
          style={{ 
            backgroundImage: `url(${img})`,
            opacity: index === currentBg ? 1 : 0,
            transition: 'opacity 2.5s ease-in-out'
          }}
        ></div>
      ))}

      {/* Floating Header */}
      <header className="relative z-50 flex justify-between items-center px-6 py-4 md:px-12 md:py-8 lg:px-[5%]">
        <div className="font-serif text-2xl md:text-3xl tracking-[2px] text-gold uppercase animate-fade-in">
          Mahmoud Parfum
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Link to="/parfums" className="text-sm uppercase tracking-wider text-light-text hover:text-gold transition-colors">
            {t('Nos Collections')}
          </Link>
          <Link to="/contact" className="text-sm uppercase tracking-wider text-muted-text hover:text-gold transition-colors">
            {t('Contact')}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <div className="flex items-center gap-2 text-gold font-serif">
                <FaUserCircle size={18} />
                <span className="text-sm">{user.fullName}</span>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-[10px] uppercase tracking-tighter text-muted-text hover:text-red-500 transition-colors border border-white/10 rounded-full px-3 py-1">
                <FaSignOutAlt size={12} />
                <span>{t('Quitter')}</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-gold text-black text-xs font-bold uppercase tracking-widest px-6 py-2 rounded transition-transform hover:scale-105">
              {t('Connexion')}
            </Link>
          )}
          
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <NotificationBell user={user} />
            <button className="nav-cart-btn ml-2" onClick={() => setIsCartOpen(true)}>
              <FaShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Toggle & Cart */}
        <div className="flex md:hidden items-center gap-4 z-50">
          <button className="nav-cart-btn" onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart size={18} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="text-light-text text-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <Link to="/parfums" onClick={() => setIsMenuOpen(false)} className="text-xl uppercase tracking-widest text-light-text hover:text-gold">
            {t('Nos Collections')}
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-xl uppercase tracking-widest text-light-text hover:text-gold">
            {t('Contact')}
          </Link>
          {user ? (
            <div className="flex flex-col items-center gap-4">
              <div className="text-gold font-serif text-lg">{user.fullName}</div>
              <button onClick={handleLogout} className="text-red-500 uppercase tracking-widest">{t('Quitter')}</button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-gold text-black px-8 py-3 rounded font-bold uppercase tracking-widest">
              {t('Connexion')}
            </Link>
          )}
          <div className="flex items-center gap-6 mt-4">
             <LanguageToggle />
             <NotificationBell user={user} />
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative flex-1 flex flex-col justify-center items-center text-center px-6 z-10">
        <h1 
          className="text-4xl md:text-6xl lg:text-8xl text-light-text leading-tight mb-4 opacity-0 animate-fade-up font-serif"
          style={{ animationDelay: '0.8s' }}
          dangerouslySetInnerHTML={{ __html: t('hero_title').replace('<br />', '<br/>') }}
        ></h1>
        <p 
          className="text-sm md:text-lg lg:text-xl text-muted-text tracking-[4px] uppercase font-light mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: '1.2s' }}
        >
          {t('hero_subtitle')}
        </p>

        <Link 
          to="/parfums" 
          className="bg-light-text text-black px-8 py-3 md:px-12 md:py-4 rounded-sm font-sans uppercase tracking-[2px] text-xs md:text-sm transition-all hover:bg-gold hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] opacity-0 animate-fade-up"
          style={{ animationDelay: '1.5s' }}
        >
          {t('Découvrir Notre Collection')}
        </Link>
      </main>

    </div>
  );
}

export default Home;
