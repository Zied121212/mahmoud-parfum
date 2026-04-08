import { useState, useEffect } from 'react';

function AdminCatalogue() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erreur:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir retirer ce produit du catalogue ? Cette action supprimera définitivement le produit.")) {
      fetch(`http://localhost:5000/api/products/${id}`, {
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
    <div>
      <h2 className="serif" style={{ color: '#f5f5f5', marginBottom: '2rem' }}>Catalogue Récent ({products.length})</h2>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Image</th><th>Nom</th><th>Catégorie</th><th>Prix</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td><img src={p.imageUrl} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                <td>{p.name}</td><td>{p.category}</td><td>{Number(p.price).toFixed(2)} TND</td>
                <td>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    style={{ padding: '4px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan="5" style={{ textAlign:'center' }}>Aucun produit.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCatalogue;
