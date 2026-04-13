import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrash, FaListUl, FaImage } from 'react-icons/fa';
import { API_BASE_URL } from '../../apiConfig';

function AdminCatalogue() {
  const [products, setProducts] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erreur:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm(t("Êtes-vous sûr de vouloir retirer ce produit du catalogue ?"))) {
      fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setProducts(products.filter(p => p.id !== id));
        }
      })
      .catch(console.error);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <FaListUl className="text-gold text-2xl" />
          <h2 className="font-serif text-3xl text-light-text uppercase tracking-tighter">
            {t('Catalogue')} <span className="text-gold">({products.length})</span>
          </h2>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-black/40 text-gold text-[10px] uppercase tracking-[3px] font-bold">
                <th className="px-6 py-5 border-b border-dark-border">{t('Image')}</th>
                <th className="px-6 py-5 border-b border-dark-border">{t('Nom')}</th>
                <th className="px-6 py-5 border-b border-dark-border">{t('Marque')}</th>
                <th className="px-6 py-5 border-b border-dark-border">{t('Catégorie')}</th>
                <th className="px-6 py-5 border-b border-dark-border">{t('Prix (50ml)')}</th>
                <th className="px-6 py-5 border-b border-dark-border text-center">{t('Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="w-12 h-16 bg-white rounded border border-dark-border flex items-center justify-center overflow-hidden">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain p-1" />
                      ) : (
                        <FaImage className="text-gray-300" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-serif text-lg text-light-text group-hover:text-gold transition-colors">
                        {i18n.language === 'ar' && p.nameAr ? p.nameAr : p.name}
                      </span>
                      <span className="text-[10px] text-muted-text font-mono">ID: #P-{p.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs uppercase tracking-widest text-muted-text">{p.brand || t('Private')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded text-[10px] uppercase font-bold tracking-tighter ${
                      p.category === 'Homme' ? 'bg-blue-900/40 text-blue-300 border border-blue-500/20' : 
                      p.category === 'Femme' ? 'bg-pink-900/40 text-pink-300 border border-pink-500/20' : 
                      'bg-purple-900/40 text-purple-300 border border-purple-500/20'
                    }`}>
                      {t(p.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-serif text-gold text-lg">{Number(p.price).toFixed(2)} <span className="text-xs">TND</span></span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/20 text-red-500 border border-red-500/20 rounded text-[10px] uppercase font-bold tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <FaTrash size={12} /> {t('Supprimer')}
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-muted-text italic font-serif text-lg bg-black/10">
                    {t('Le catalogue est vide.')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminCatalogue;
