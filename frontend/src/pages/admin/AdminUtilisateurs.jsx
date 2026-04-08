import { useState, useEffect } from 'react';

function AdminUtilisateurs() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Erreur:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce compte ? Cette action supprimera également toutes ses commandes et notifications.")) {
      fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setUsers(users.filter(u => u.id !== id));
        }
      })
      .catch(console.error);
    }
  };

  return (
    <div>
      <h2 className="serif" style={{ color: '#d4af37', marginBottom: '2rem' }}>Gérer les Utilisateurs</h2>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom Complet</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.fullName || "-"}</td>
                <td>{u.email}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(u.id)}
                    style={{ padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan="4" style={{ textAlign:'center' }}>Aucun utilisateur.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUtilisateurs;
