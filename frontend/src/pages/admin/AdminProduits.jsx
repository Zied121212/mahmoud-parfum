import { useState } from 'react';

function AdminProduits() {
  const [formData, setFormData] = useState({
    name: '', nameAr: '', description: '', descriptionAr: '', price: '', price100ml: '', imageUrl: '', notes: '', notesAr: '', category: 'Homme', components: '', componentsAr: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(() => {
      setFormData({ name: '', nameAr: '', description: '', descriptionAr: '', price: '', price100ml: '', imageUrl: '', notes: '', notesAr: '', category: 'Homme', components: '', componentsAr: '' });
      setIsSubmitting(false);
      alert('Parfum ajouté avec succès !');
    })
    .catch(err => {
      console.error("Erreur d'ajout:", err);
      setIsSubmitting(false);
      alert('Erreur lors de l\'ajout.');
    });
  };

  return (
    <div style={{ background: '#151515', padding: '3rem', borderRadius: '12px', border: '1px solid #333' }}>
      <h2 className="serif" style={{ color: '#d4af37', marginBottom: '3rem' }}>Ajouter un Nouveau Parfum</h2>
      <form onSubmit={handleSubmit} style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '2.5rem' 
      }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Nom du parfum (FR)</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="admin-input" style={{ width: '100%', padding: '0.8rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Nom du parfum (AR)</label>
            <input type="text" name="nameAr" value={formData.nameAr} onChange={handleChange} required className="admin-input" style={{ width: '100%', padding: '0.8rem', direction: 'rtl' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Catégorie</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="admin-input" style={{ width: '100%', padding: '0.8rem' }}>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Unisexe">Unisexe</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Prix 50ml (TND)</label>
            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required className="admin-input" style={{ width: '100%', padding: '0.8rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Prix 100ml (TND)</label>
            <input type="number" step="0.01" name="price100ml" value={formData.price100ml} onChange={handleChange} required className="admin-input" style={{ width: '100%', padding: '0.8rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>URL de l'image</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required placeholder="Ex: /images/luxe.png" className="admin-input" style={{ width: '100%', padding: '0.8rem' }} />
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Notes Olfactives (FR)</label>
            <input type="text" name="notes" value={formData.notes} onChange={handleChange} required placeholder="Ex: Floral, Boisé..." className="admin-input" style={{ width: '100%', padding: '0.8rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Notes Olfactives (AR)</label>
            <input type="text" name="notesAr" value={formData.notesAr} onChange={handleChange} required placeholder="Ex: زهور، خشب..." className="admin-input" style={{ width: '100%', padding: '0.8rem', direction: 'rtl' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Composants (FR)</label>
            <input type="text" name="components" value={formData.components} onChange={handleChange} required placeholder="Ex: Musc, Essence de Rose..." className="admin-input" style={{ width: '100%', padding: '0.8rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Composants (AR)</label>
            <input type="text" name="componentsAr" value={formData.componentsAr} onChange={handleChange} required placeholder="Ex: مسك..." className="admin-input" style={{ width: '100%', padding: '0.8rem', direction: 'rtl' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Description (FR)</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required className="admin-input" style={{ width: '100%', padding: '0.8rem', resize: 'none', flex: 1, minHeight: '80px' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Description (AR)</label>
            <textarea name="descriptionAr" value={formData.descriptionAr} onChange={handleChange} required className="admin-input" style={{ width: '100%', padding: '0.8rem', resize: 'none', flex: 1, minHeight: '80px', direction: 'rtl' }} />
          </div>
        </div>

        {/* Full width button */}
        <div style={{ gridColumn: '1 / -1', marginTop: '1rem', textAlign: 'right' }}>
          <button type="submit" className="btn-buy" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }} disabled={isSubmitting}>
            {isSubmitting ? 'Ajout en cours...' : 'Enregistrer le Produit'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default AdminProduits;
