import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUsers, FaTrash, FaUserShield } from 'react-icons/fa';
import { API_BASE_URL } from '../../apiConfig';

function AdminUtilisateurs() {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`${API_BASE_URL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Erreur:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm(t("Êtes-vous sûr de vouloir supprimer ce compte ?"))) {
      fetch(`${API_BASE_URL}/users/${id}`, {
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
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <FaUsers className="text-gold text-2xl" />
          <h2 className="font-serif text-3xl text-light-text uppercase tracking-tighter">
            {t('Gestion des Utilisateurs')} <span className="text-gold">({users.length})</span>
          </h2>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-black/40 text-gold text-[10px] uppercase tracking-[3px] font-bold">
                <th className="px-6 py-5 border-b border-dark-border">{t('ID')}</th>
                <th className="px-6 py-5 border-b border-dark-border">{t('Profil')}</th>
                <th className="px-6 py-5 border-b border-dark-border">{t('Email')}</th>
                <th className="px-6 py-5 border-b border-dark-border">{t('Téléphone')}</th>
                <th className="px-6 py-5 border-b border-dark-border text-center">{t('Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-[10px] text-muted-text font-mono">#{u.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                         <FaUserShield size={14} />
                      </div>
                      <span className="font-serif text-lg text-light-text group-hover:text-gold transition-colors">
                        {u.fullName || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-light text-muted-text">{u.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-light text-muted-text font-mono">{u.phone || t('Non renseigné')}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleDelete(u.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/20 text-red-500 border border-red-500/20 rounded text-[10px] uppercase font-bold tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <FaTrash size={12} /> {t('Bannir')}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-muted-text italic font-serif text-lg bg-black/10">
                    {t('Aucun utilisateur enregistré.')}
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

export default AdminUtilisateurs;
