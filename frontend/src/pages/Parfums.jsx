import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt, FaFilter, FaTimes, FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import NotificationBell from '../components/NotificationBell';
import { API_BASE_URL } from '../apiConfig';

const INTERNATIONAL_BRANDS = [
  'Chanel', 'Dior', 'Gucci', 'Prada', 'Tom Ford', 
  'Creed', 'Lancôme', 'Versace', 'Armani', 'Yves Saint Laurent',
  'Paco Rabanne', 'Bvlgari', 'Hermès'
];

function Parfums() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Homme');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart, cartCount, setIsCartOpen } = useCart();
  const [user, setUser] = useState(null);
  const { t, i18n } = useTranslation();

  // Nouveaux états de filtre
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  useEffect(() => {
    setMinPrice(0);
    setMaxPrice(2000);
    setSelectedBrands([]);
    setSearchQuery('');
  }, [activeCategory]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const fetchProducts = () => {
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur:", err);
        setLoading(false);
      });
  };

  const filteredByCategory = products.filter(p => p.category === activeCategory);

  // Fusionner les marques réelles en stock avec les marques internationales suggérées
  const uniqueBrands = [...new Set([
    ...filteredByCategory.map(p => p.brand || t('Autre')),
    ...INTERNATIONAL_BRANDS
  ])].sort();

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  let displayedProducts = filteredByCategory.filter(p => {
    const price = Number(p.price) || 0;
    const passesPrice = price >= minPrice && price <= maxPrice;
    const brandLabel = p.brand || t('Autre');
    const passesBrand = selectedBrands.length === 0 || selectedBrands.includes(brandLabel);
    
    const searchLower = searchQuery.toLowerCase();
    const passesSearch = p.name.toLowerCase().includes(searchLower) || 
                         (p.nameAr && p.nameAr.includes(searchQuery));

    return passesPrice && passesBrand && passesSearch;
  });

  displayedProducts.sort((a, b) => {
    if (sortOption === 'A-Z') return a.name.localeCompare(b.name);
    if (sortOption === 'Z-A') return b.name.localeCompare(a.name);
    if (sortOption === 'PRICE_ASC') return Number(a.price) - Number(b.price);
    if (sortOption === 'PRICE_DESC') return Number(b.price) - Number(a.price);
    return 0;
  });

  const renderComponents = (componentsStr) => {
    if (!componentsStr) return null;
    const comps = componentsStr.split(',');
    return comps.map((c, idx) => (
      <span key={idx} className="bg-black/40 border border-dark-border text-light-text px-3 py-1 text-xs rounded-full tracking-wider">{c.trim()}</span>
    ));
  };

  return (
    <div className="min-h-screen bg-dark-bg text-light-text font-sans selection:bg-gold/30">
      {/* Navbar Minimaliste */}
      <nav className="fixed top-0 w-full z-50 luxury-glass flex justify-between items-center px-6 py-4 md:px-[5%]">
        <Link to="/" className="font-serif text-xl md:text-2xl tracking-widest text-gold uppercase">Mahmoud Parfum</Link>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex gap-6">
            <Link to="/" className="text-xs uppercase tracking-widest hover:text-gold transition-colors">{t('Accueil')}</Link>
            <Link to="/contact" className="text-xs uppercase tracking-widest hover:text-gold transition-colors">{t('Contact')}</Link>
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
            <NotificationBell user={user} />
            <button className="nav-cart-btn" onClick={() => setIsCartOpen(true)}>
              <FaShoppingCart size={18} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 md:px-[5%]">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-6xl text-gold mb-4 uppercase tracking-tighter">{t('Nos Collections')}</h1>
          <p className="text-muted-text text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed italic">
            {t('description_hero')}
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex justify-center flex-wrap gap-4 md:gap-12 mb-12 border-b border-dark-border pb-4">
          {['Homme', 'Femme', 'Unisexe'].map(cat => (
            <button
              key={cat}
              className={`text-xs md:text-sm uppercase tracking-[3px] pb-2 transition-all relative ${activeCategory === cat ? 'text-gold' : 'text-muted-text hover:text-light-text'}`}
              onClick={() => setActiveCategory(cat)}
            >
              {t(`Collection ${cat}`)}
              {activeCategory === cat && <div className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-gold" />}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center justify-center gap-2 w-full py-4 border border-dark-border rounded bg-dark-card text-gold uppercase tracking-widest text-xs"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> {showFilters ? t('Masquer les Filtres') : t('Afficher les Filtres')}
          </button>

          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-8 animate-fade-in`}>
             <div className="bg-dark-card p-6 border border-dark-border rounded-lg space-y-8">
                {/* Search */}
                <div>
                   <h4 className="font-serif text-gold text-lg mb-4 tracking-wider">{t('Rechercher')}</h4>
                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder={t("Quelle fragrance ?")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black/40 border border-dark-border text-white text-sm py-3 px-4 rounded focus:border-gold outline-none transition-all pl-10"
                      />
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" size={12} />
                   </div>
                </div>

                {/* Price Range */}
                <div>
                   <h4 className="font-serif text-gold text-lg mb-4 tracking-wider">{t('Budget (TND)')}</h4>
                   <div className="flex items-center gap-3 mb-4">
                      <input type="number" value={minPrice} onChange={e => setMinPrice(Number(e.target.value))} className="w-1/2 bg-black/40 border border-dark-border text-xs p-2 rounded text-center" />
                      <span className="text-muted-text">—</span>
                      <input type="number" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-1/2 bg-black/40 border border-dark-border text-xs p-2 rounded text-center" />
                   </div>
                   <input 
                      type="range" 
                      min="0" max="2500" 
                      value={maxPrice} 
                      onChange={e => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-gold cursor-pointer" 
                   />
                </div>

                {/* Brands */}
                <div>
                   <h4 className="font-serif text-gold text-lg mb-4 tracking-wider">{t('Les Maisons')}</h4>
                   <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {uniqueBrands.map(brand => (
                        <label key={brand} className="flex items-center gap-3 mb-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="w-4 h-4 accent-gold bg-transparent border-dark-border"
                          />
                          <span className={`text-[11px] uppercase tracking-widest transition-colors ${selectedBrands.includes(brand) ? 'text-gold' : 'text-muted-text group-hover:text-light-text'}`}>
                            {brand}
                          </span>
                        </label>
                      ))}
                   </div>
                </div>
             </div>
          </aside>

          {/* Main Content Area */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-dark-card border border-dark-border p-4 rounded-lg gap-4">
              <span className="text-xs uppercase tracking-widest text-muted-text">
                {displayedProducts.length} <span className="text-gold">{t('essences trouvées')}</span>
              </span>
              <select 
                className="bg-black/40 border border-dark-border text-xs text-light-text px-4 py-2 rounded focus:border-gold outline-none cursor-pointer uppercase tracking-widest"
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">{t('Trier par Défaut')}</option>
                <option value="A-Z">{t('De A à Z')}</option>
                <option value="Z-A">{t('De Z à A')}</option>
                <option value="PRICE_ASC">{t('Prix Croissant')}</option>
                <option value="PRICE_DESC">{t('Prix Décroissant')}</option>
              </select>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                 <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-gold font-serif italic">{t('Extraction en cours...')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {displayedProducts.map(product => (
                  <article key={product.id} className="group relative bg-dark-card border border-dark-border rounded overflow-hidden transition-all hover:border-gold hover:-translate-y-2 duration-500">
                    <div className="aspect-[4/5] relative bg-[#0a0a0a] p-0 flex justify-center items-center overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,195,150,0.05)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none border-b border-dark-border"></div>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-10" 
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 backdrop-blur-[2px]">
                         <button 
                            className="bg-light-text text-black px-8 py-3 text-xs uppercase font-bold tracking-widest shadow-2xl transition-transform hover:scale-105"
                            onClick={() => { setSelectedProduct(product); setSelectedSize('50ml'); }}
                          >
                            {t('Détails')}
                          </button>
                      </div>
                    </div>
                    <div className="p-6 text-center space-y-2">
                       <h3 className="font-serif text-xl tracking-wide group-hover:text-gold transition-colors">
                          {i18n.language === 'ar' && product.nameAr ? product.nameAr : product.name}
                       </h3>
                       <p className="text-[10px] uppercase text-gold tracking-[3px] opacity-70">
                          {product.brand || t('Private Collection')}
                       </p>
                       <p className="text-xl font-serif text-light-text pt-2">
                          {Number(product.price).toFixed(2)} <span className="text-sm font-sans tracking-tight">TND</span>
                       </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {!loading && displayedProducts.length === 0 && (
              <div className="text-center py-32 border border-dashed border-dark-border rounded-lg">
                 <p className="text-muted-text italic font-serif text-lg">{t('Aucune fragrance ne correspond à cette recherche.')}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in" onClick={() => setSelectedProduct(null)}>
           <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
           <div 
             className="relative w-full max-w-5xl bg-dark-bg border border-dark-border rounded-xl shadow-2xl overflow-hidden animate-slide-up-fade"
             onClick={e => e.stopPropagation()}
           >
              <button className="absolute top-6 right-6 text-3xl font-light hover:text-gold z-10" onClick={() => setSelectedProduct(null)}>&times;</button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
                 <div className="bg-[#0a0a0a] relative flex items-center justify-center p-0 overflow-hidden h-full min-h-[400px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,195,150,0.05)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none border-r border-dark-border hidden md:block"></div>
                    <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover relative z-10" />
                 </div>
                 <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                    <div className="space-y-2">
                       <span className="text-gold text-[10px] uppercase tracking-[4px]">{t(`Collection ${selectedProduct.category}`)}</span>
                       <h2 className="font-serif text-4xl md:text-5xl">{i18n.language === 'ar' && selectedProduct.nameAr ? selectedProduct.nameAr : selectedProduct.name}</h2>
                       <p className="text-[10px] text-muted-text font-mono border-b border-dark-border pb-4">{t('IDENTIFIANT :')} #PARF-{selectedProduct.id}</p>
                    </div>

                    <div className="flex gap-4">
                       {['50ml', '100ml'].map(size => (
                          <button 
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-6 py-2 border rounded text-xs font-bold transition-all ${selectedSize === size ? 'bg-gold border-gold text-black' : 'border-dark-border text-muted-text hover:border-gold'}`}
                          >
                            {size.toUpperCase()}
                          </button>
                       ))}
                    </div>

                    <div className="flex items-center justify-between gap-8">
                       <p className="font-serif text-3xl text-gold">
                          {Number(selectedSize === '50ml' ? selectedProduct.price : (selectedProduct.price100ml || selectedProduct.price * 2)).toFixed(2)} <span className="text-sm font-sans">TND</span>
                       </p>
                       <button 
                          className="flex-1 bg-gold text-black py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-all"
                          onClick={() => {
                            const finalPrice = selectedSize === '50ml' ? selectedProduct.price : (selectedProduct.price100ml || selectedProduct.price * 2);
                            addToCart(selectedProduct, selectedSize, finalPrice);
                            setSelectedProduct(null);
                          }}
                        >
                          {t('Ajouter au Panier')}
                        </button>
                    </div>

                    <div className="space-y-4 pt-4">
                       <div>
                          <h4 className="text-[10px] uppercase tracking-[3px] text-gold mb-2">{t('Pyramide Olfactive')}</h4>
                          <p className="text-sm text-gray-300 font-light leading-relaxed">{i18n.language === 'ar' && selectedProduct.notesAr ? selectedProduct.notesAr : selectedProduct.notes}</p>
                       </div>
                       <div>
                          <h4 className="text-[10px] uppercase tracking-[3px] text-gold mb-2">{t('Notes de Coeur')}</h4>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {renderComponents(i18n.language === 'ar' && selectedProduct.componentsAr ? selectedProduct.componentsAr : selectedProduct.components)}
                          </div>
                       </div>
                       <div className="pt-4 border-t border-dark-border">
                          <h4 className="text-[10px] uppercase tracking-[3px] text-muted-text mb-2 italic">{t("L'Ame du Parfum")}</h4>
                          <p className="text-xs text-muted-text italic leading-relaxed">"{i18n.language === 'ar' && selectedProduct.descriptionAr ? selectedProduct.descriptionAr : selectedProduct.description}"</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Simple Footer */}
      <footer className="mt-20 py-12 border-t border-dark-border bg-black/20 text-center space-y-4">
        <h3 className="font-serif text-2xl text-gold tracking-widest uppercase">Mahmoud Parfum</h3>
        <p className="text-xs text-muted-text max-w-md mx-auto leading-relaxed">
          &copy; {new Date().getFullYear()} Mahmoud Parfum. {t('Luxe, élégance et tradition tunisienne depuis 2024.')}
        </p>
      </footer>
    </div>
  );
}

export default Parfums;
