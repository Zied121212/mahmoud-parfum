import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import NotificationBell from '../components/NotificationBell';

function Parfums() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Homme');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('50ml');
  const { addToCart, cartCount, setIsCartOpen } = useCart();
  const [user, setUser] = useState(null);
  const { t, i18n } = useTranslation();

  // Nouveaux états de filtre
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetchProducts();
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  useEffect(() => {
    // Réinitialisation lors d'un changement de catégorie
    setMinPrice(0);
    setMaxPrice(2000);
    setSelectedBrands([]);
  }, [activeCategory]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
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

  const uniqueBrands = [...new Set(filteredByCategory.map(p => p.brand || t('Autre')))];

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
    return passesPrice && passesBrand;
  });

  displayedProducts.sort((a, b) => {
    if (sortOption === 'A-Z') return a.name.localeCompare(b.name);
    if (sortOption === 'Z-A') return b.name.localeCompare(a.name);
    if (sortOption === 'PRICE_ASC') return Number(a.price) - Number(b.price);
    if (sortOption === 'PRICE_DESC') return Number(b.price) - Number(a.price);
    return 0;
  });

  // Pour formater le tableau de composants (séparé par des virgules)
  const renderComponents = (componentsStr) => {
    if (!componentsStr) return null;
    const comps = componentsStr.split(',');
    return comps.map((c, idx) => (
      <span key={idx} className="component-tag">{c.trim()}</span>
    ));
  };

  return (
    <>
      <nav className="navbar" style={{ position: 'relative', background: '#0a0a0a' }}>
        <Link to="/" className="brand-logo">Mahmoud Parfum</Link>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#ccc' }}>{t('Accueil')}</Link>
          <Link to="/contact" style={{ color: '#ccc' }}>{t('Contact')}</Link>
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
          <NotificationBell user={user} />
          <button className="nav-cart-btn" onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      <main style={{ minHeight: '100vh', padding: '100px 5% 50px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeInUp 1s ease-out' }}>
          <h1 className="serif" style={{ fontSize: '3rem', color: '#d4af37', marginBottom: '1rem' }}>{t('Nos Collections')}</h1>
          <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            {t('description_hero')}
          </p>
        </div>

        <div className="tabs-container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '4rem', borderBottom: '1px solid #222', paddingBottom: '1rem' }}>
          {['Homme', 'Femme', 'Unisexe'].map(cat => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {t(`Collection ${cat}`)}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#d4af37' }}>Extraction des essences en cours...</div>
        ) : (
          <div className="catalog-layout">
            <aside className="filters-sidebar fade-in-section">
              <div className="filter-section">
                <h4 className="filter-title">{t('Fourchette de prix (TND)')}</h4>
                <div className="price-inputs">
                  <input type="number" value={minPrice} onChange={e => setMinPrice(Number(e.target.value) || 0)} min="0" />
                  <span>—</span>
                  <input type="number" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value) || 0)} min="0" />
                </div>
                <input 
                  type="range" 
                  min="0" max="2000" 
                  value={maxPrice} 
                  onChange={e => setMaxPrice(Number(e.target.value) || 0)}
                  style={{ width: '100%', accentColor: '#d4af37' }} 
                />
              </div>

              <div className="filter-section">
                <h4 className="filter-title">{t('Marques')}</h4>
                {uniqueBrands.map(brand => (
                  <label key={brand} className="brand-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      style={{ accentColor: '#d4af37' }}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </aside>

            <div className="main-content fade-in-section">
              <div className="sort-bar">
                <span style={{ color: '#aaa' }}>{displayedProducts.length} {t('produits au total')}</span>
                <select 
                  className="sort-select" 
                  value={sortOption} 
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">{t('Trier par Défaut')}</option>
                  <option value="A-Z">{t('De A à Z')}</option>
                  <option value="Z-A">{t('De Z à A')}</option>
                  <option value="PRICE_ASC">{t('Prix : Ordre croissant')}</option>
                  <option value="PRICE_DESC">{t('Prix : Ordre décroissant')}</option>
                </select>
              </div>

              <div className="products-grid">
                {displayedProducts.map(product => (
                  <article key={product.id} className="product-card">
                    <div style={{ overflow: 'hidden' }}>
                      <img src={product.imageUrl} alt={product.name} className="product-image" />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name serif">{i18n.language === 'ar' && product.nameAr ? product.nameAr : product.name}</h3>
                      <p className="product-notes" style={{ height: '40px', overflow: 'hidden' }}>{i18n.language === 'ar' && product.notesAr ? product.notesAr : product.notes}</p>
                      <button className="btn-buy" onClick={() => { setSelectedProduct(product); setSelectedSize('50ml'); }}>{t('Découvrir')}</button>
                    </div>
                  </article>
                ))}
                {displayedProducts.length === 0 && (
                  <p style={{ color: '#a0a0a0', gridColumn: '1 / -1', textAlign: 'center', margin: '3rem 0' }}>
                    {t('Aucun parfum ne correspond à vos filtres.')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- LUXURY MODAL OVERLAY --- */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>&times;</button>

            <div className="modal-split">
              <div className="modal-image-container">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
              </div>
              <div className="modal-details">
                <p className="modal-category">{t(`Collection ${selectedProduct.category}`)}</p>
                <h2 className="modal-title serif">{i18n.language === 'ar' && selectedProduct.nameAr ? selectedProduct.nameAr : selectedProduct.name}</h2>
                <p className="modal-date">{t('Date de création :')} {selectedProduct.createdAt}</p>

                {/* Sélecteur de Taille */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                  <button 
                    onClick={() => setSelectedSize('50ml')}
                    style={{ 
                      padding: '0.6rem 1.5rem', 
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: '1px solid #d4af37',
                      background: selectedSize === '50ml' ? '#d4af37' : 'transparent', 
                      color: selectedSize === '50ml' ? '#000' : '#d4af37',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    50 ML
                  </button>
                  <button 
                    onClick={() => setSelectedSize('100ml')}
                    style={{ 
                      padding: '0.6rem 1.5rem', 
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: '1px solid #d4af37',
                      background: selectedSize === '100ml' ? '#d4af37' : 'transparent', 
                      color: selectedSize === '100ml' ? '#000' : '#d4af37',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    100 ML
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <p className="modal-price" style={{ margin: 0 }}>
                    {Number(selectedSize === '50ml' ? selectedProduct.price : (selectedProduct.price100ml || selectedProduct.price * 1.8)).toFixed(2)} TND
                  </p>
                  <button 
                    className="btn-buy" 
                    style={{ width: 'auto', padding: '0.8rem 1.5rem' }} 
                    onClick={() => {
                      const finalPrice = selectedSize === '50ml' ? selectedProduct.price : (selectedProduct.price100ml || selectedProduct.price * 1.8);
                      addToCart(selectedProduct, selectedSize, finalPrice);
                      setSelectedProduct(null);
                    }}
                  >
                    {t('Ajouter au Panier')}
                  </button>
                </div>

                <div className="modal-divider"></div>

                <h4 className="modal-subtitle">{t('Notes Olfactives')}</h4>
                <p className="modal-desc">{i18n.language === 'ar' && selectedProduct.notesAr ? selectedProduct.notesAr : selectedProduct.notes}</p>

                <h4 className="modal-subtitle" style={{ marginTop: '1.5rem' }}>{t('Composants Nobles')}</h4>
                <div className="modal-components">
                  {renderComponents(i18n.language === 'ar' && selectedProduct.componentsAr ? selectedProduct.componentsAr : selectedProduct.components)}
                </div>

                <div className="modal-divider"></div>
                <h4 className="modal-subtitle">{t("L'Histoire")}</h4>
                <p className="modal-desc" style={{ fontStyle: 'italic', lineHeight: '1.8' }}>
                  "{i18n.language === 'ar' && selectedProduct.descriptionAr ? selectedProduct.descriptionAr : selectedProduct.description}"
                </p>

              </div>
            </div>
          </div>
        </div>
      )}

      <footer id="contact" style={{ background: '#0a0a0a', padding: '3rem' }}>
        <p className="serif" style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>MAHMOUD PARFUM</p>
        <p>&copy; {new Date().getFullYear()} Mahmoud Parfum. Tous droits réservés.</p>
      </footer>
    </>
  );
}

export default Parfums;
