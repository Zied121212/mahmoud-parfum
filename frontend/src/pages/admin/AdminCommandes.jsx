import { useState, useEffect } from 'react';

function AdminCommandes() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Erreur:", err));
  }, []);

  const updateStatus = (id, newStatus) => {
    fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(data => {
      if (data.order) {
        setOrders(orders.map(o => ({ ...o, status: o.id === id ? data.order.status : o.status })));
      }
    })
    .catch(console.error);
  };

  return (
    <div>
      <h2 className="serif" style={{ color: '#d4af37', marginBottom: '2rem' }}>Gérer les Commandes</h2>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Utilisateur</th>
              <th>Total (TND)</th>
              <th>Détails</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{new Date(o.orderDate).toLocaleString()}</td>
                <td>{o.User?.email || '-'}</td>
                <td>{Number(o.totalAmount).toFixed(2)}</td>
                <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {o.orderDetails}
                </td>
                <td>
                  <span style={{
                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold',
                    backgroundColor: o.status === 'CONFIRMED' ? '#28a745' : o.status === 'REJECTED' ? '#dc3545' : '#ffc107',
                    color: o.status === 'PENDING' ? '#000' : '#fff'
                  }}>
                    {o.status || 'PENDING'}
                  </span>
                </td>
                <td>
                  {(!o.status || o.status === 'PENDING') && (
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button onClick={() => updateStatus(o.id, 'CONFIRMED')} style={{ padding: '4px 8px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Confirmer</button>
                      <button onClick={() => updateStatus(o.id, 'REJECTED')} style={{ padding: '4px 8px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Rejeter</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan="7" style={{ textAlign:'center' }}>Aucune commande.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCommandes;
