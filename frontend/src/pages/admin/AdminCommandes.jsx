import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaClipboardList, FaCheck, FaTimes, FaInbox } from 'react-icons/fa';
import { API_BASE_URL } from '../../apiConfig';

function AdminCommandes() {
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`${API_BASE_URL}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Erreur:", err));
  }, []);

  const updateStatus = (id, newStatus) => {
    fetch(`${API_BASE_URL}/orders/${id}/status`, {
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

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-sm";
    switch(status) {
      case 'CONFIRMED': return <span className={`${baseClasses} bg-green-900/40 text-green-400 border border-green-500/20`}>{t('Confirmée')}</span>;
      case 'REJECTED': return <span className={`${baseClasses} bg-red-900/40 text-red-400 border border-red-500/20`}>{t('Rejetée')}</span>;
      default: return <span className={`${baseClasses} bg-amber-900/40 text-amber-400 border border-amber-500/20 animate-pulse`}>{t('En attente')}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <FaClipboardList className="text-gold text-2xl" />
          <h2 className="font-serif text-3xl text-light-text uppercase tracking-tighter">
            {t('Gestion des Commandes')} <span className="text-gold">({orders.length})</span>
          </h2>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-black/40 text-gold text-[10px] uppercase tracking-[3px] font-bold">
                <th className="px-6 py-5 border-b border-dark-border">{t('Référence')}</th>
                <th className="px-6 py-5 border-b border-dark-border">{t('Date')}</th>
                <th className="px-6 py-5 border-b border-dark-border">{t('Client')}</th>
                <th className="px-6 py-5 border-b border-dark-border">{t('Montant')}</th>
                <th className="px-6 py-5 border-b border-dark-border">{t('Statut')}</th>
                <th className="px-6 py-5 border-b border-dark-border text-center">{t('Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-[10px] text-muted-text font-mono">#ORD-{o.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-light-text">{new Date(o.orderDate).toLocaleDateString([], { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                       <span className="text-sm font-bold group-hover:text-gold transition-colors">{o.User?.fullName || t('Invité')}</span>
                       <span className="text-[10px] text-muted-text lowercase">{o.User?.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-serif text-gold text-lg">{Number(o.totalAmount).toFixed(2)} <span className="text-xs">TND</span></span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(o.status || 'PENDING')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {(!o.status || o.status === 'PENDING') ? (
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => updateStatus(o.id, 'CONFIRMED')}
                          className="p-2 bg-green-600/20 text-green-500 border border-green-500/20 rounded hover:bg-green-600 hover:text-white transition-all"
                          title={t('Confirmer')}
                        >
                          <FaCheck size={12} />
                        </button>
                        <button 
                          onClick={() => updateStatus(o.id, 'REJECTED')}
                          className="p-2 bg-red-600/20 text-red-500 border border-red-500/20 rounded hover:bg-red-600 hover:text-white transition-all"
                          title={t('Rejeter')}
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[9px] uppercase tracking-widest text-muted-text italic">{t('Traitée')}</span>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-muted-text italic font-serif text-lg bg-black/10">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                       <FaInbox size={48} />
                       {t('Aucune commande enregistrée.')}
                    </div>
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

export default AdminCommandes;
