import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSave, FaMagic } from 'react-icons/fa';
import { API_BASE_URL } from '../../apiConfig';

function AdminProduits() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '', nameAr: '', description: '', descriptionAr: '', price: '', price100ml: '', imageUrl: '', notes: '', notesAr: '', category: 'Homme', components: '', componentsAr: '', brand: '', brandAr: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'price') {
        updated.price100ml = value ? (Number(value) * 2).toFixed(2) : '';
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(() => {
      setFormData({ name: '', nameAr: '', description: '', descriptionAr: '', price: '', price100ml: '', imageUrl: '', notes: '', notesAr: '', category: 'Homme', components: '', componentsAr: '', brand: '', brandAr: '' });
      setIsSubmitting(false);
      alert('Parfum ajouté avec succès !');
    })
    .catch(err => {
      console.error("Erreur d'ajout:", err);
      setIsSubmitting(false);
      alert('Erreur lors de l\'ajout.');
    });
  };

  const InputGroup = ({ label, name, value, type = "text", required = true, rtl = false, placeholder = "", readOnly = false }) => (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-muted-text pl-1">{label}</label>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={handleChange} 
        required={required} 
        placeholder={placeholder}
        readOnly={readOnly}
        step={type === "number" ? "0.01" : undefined}
        className={`w-full bg-black/40 border border-dark-border text-light-text p-3 rounded focus:border-gold outline-none transition-all placeholder:text-white/10 ${rtl ? 'text-right' : ''} ${readOnly ? 'opacity-50 cursor-not-allowed' : ''}`} 
      />
    </div>
  );

  return (
    <div className="bg-dark-card p-6 md:p-10 border border-dark-border rounded-xl shadow-2xl animate-fade-in">
      <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
        <FaMagic className="text-gold text-2xl" />
        <h2 className="font-serif text-3xl text-gold uppercase tracking-tighter">{t('Ajouter un Nouveau Parfum')}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          
          {/* Identity Section */}
          <div className="space-y-6">
            <h3 className="text-gold text-[10px] uppercase tracking-[4px] border-l-2 border-gold pl-3 mb-6">{t('Identité & Marketing')}</h3>
            <InputGroup label="Nom (FR)" name="name" value={formData.name} placeholder="Ex: Bois d'Argent" />
            <InputGroup label="Nom (AR)" name="nameAr" value={formData.nameAr} rtl placeholder="Ex: خشب الفضة" />
            
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="Marque (FR)" name="brand" value={formData.brand} placeholder="Ex: Dior" />
              <InputGroup label="Marque (AR)" name="brandAr" value={formData.brandAr} rtl placeholder="Ex: ديور" />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-text pl-1">{t('Catégorie')}</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required 
                className="w-full bg-black/40 border border-dark-border text-light-text p-3 rounded focus:border-gold outline-none transition-all uppercase text-xs tracking-widest cursor-pointer"
              >
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Unisexe">Unisexe</option>
              </select>
            </div>

            <InputGroup label="URL de l'image" name="imageUrl" value={formData.imageUrl} placeholder="https://..." />
          </div>

          {/* Details & Pricing */}
          <div className="space-y-6">
            <h3 className="text-gold text-[10px] uppercase tracking-[4px] border-l-2 border-gold pl-3 mb-6">{t('Composition & Tarifs')}</h3>
            
            <div className="grid grid-cols-2 gap-4">
               <InputGroup label="Prix 50ml (TND)" name="price" value={formData.price} type="number" />
               <InputGroup label="Prix 100ml (TND)" name="price100ml" value={formData.price100ml} type="number" readOnly={true} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <InputGroup label="Notes (FR)" name="notes" value={formData.notes} placeholder="Floral, Ambré..." />
               <InputGroup label="Notes (AR)" name="notesAr" value={formData.notesAr} rtl placeholder="زهور..." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <InputGroup label="Composants (FR)" name="components" value={formData.components} placeholder="Musc, Rose..." />
               <InputGroup label="Composants (AR)" name="componentsAr" value={formData.componentsAr} rtl placeholder="مسك..." />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-text pl-1">{t('Description (FR)')}</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                required 
                className="w-full bg-black/40 border border-dark-border text-light-text p-3 rounded focus:border-gold outline-none transition-all resize-none h-24 text-sm" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-text pl-1 text-right block">{t('Description (AR)')}</label>
              <textarea 
                name="descriptionAr" 
                value={formData.descriptionAr} 
                onChange={handleChange} 
                required 
                dir="rtl"
                className="w-full bg-black/40 border border-dark-border text-light-text p-3 rounded focus:border-gold outline-none transition-all resize-none h-24 text-sm" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-white/5">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center gap-3 bg-gold text-black px-10 py-4 rounded font-bold uppercase tracking-[2px] text-sm transition-all hover:bg-[#b5952f] hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <FaSave />
            {isSubmitting ? t('Enregistrement...') : t('Enregistrer le Produit')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProduits;
