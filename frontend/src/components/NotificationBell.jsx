import { useState, useEffect } from 'react';
import { FaBell, FaCheck, FaCheckDouble } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../apiConfig';

function NotificationBell({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) return;
    
    let isMounted = true;
    const fetchNotifications = () => {
      fetch(`${API_BASE_URL}/notifications/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (isMounted && Array.isArray(data)) {
            setNotifications(data);
          }
        })
        .catch(console.error);
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // 10s polling
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    fetch(`${API_BASE_URL}/notifications/${id}/read`, { method: 'PUT' })
      .then(() => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      })
      .catch(console.error);
  };

  const markAllAsRead = () => {
    fetch(`${API_BASE_URL}/notifications/user/${user.id}/readAll`, { method: 'PUT' })
      .then(() => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      })
      .catch(console.error);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button 
        className="flex items-center justify-center p-2 text-muted-text hover:text-gold transition-colors relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBell size={18} className={unreadCount > 0 ? 'text-gold' : ''} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gold text-black text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 bg-dark-card border border-dark-border rounded-lg shadow-2xl z-50 overflow-hidden animate-fade-in translate-x-12 sm:translate-x-0">
            <div className="flex justify-between items-center p-4 border-b border-dark-border bg-black/20">
              <h4 className="font-serif text-gold text-sm tracking-wider uppercase">{t('Notifications')}</h4>
              {unreadCount > 0 && (
                <button 
                  className="text-[10px] uppercase text-muted-text hover:text-gold transition-colors flex items-center gap-1" 
                  onClick={markAllAsRead}
                >
                  {t('Tout lire')} <FaCheckDouble size={8} />
                </button>
              )}
            </div>
            <div className="max-height-[350px] overflow-y-auto custom-scrollbar">
              {notifications.length === 0 ? (
                <p className="p-8 text-center text-muted-text italic text-xs uppercase tracking-widest">{t('Aucun message.')}</p>
              ) : (
                notifications.map(n => (
                  <div 
                    key={n.id} 
                    className={`p-4 border-b border-white/5 cursor-pointer transition-colors relative ${n.isRead ? 'opacity-60 grayscale' : 'bg-gold/5 group hover:bg-gold/10'}`}
                    onClick={() => !n.isRead && markAsRead(n.id)}
                  >
                    <p className="text-[13px] text-light-text leading-relaxed pr-4">{n.message}</p>
                    <div className="flex justify-between items-center mt-2">
                       <span className="text-[10px] text-muted-text font-mono">
                          {new Date(n.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                       </span>
                       {!n.isRead && <FaCheck className="text-gold" size={10} />}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationBell;
