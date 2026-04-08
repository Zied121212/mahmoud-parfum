import { useState, useEffect } from 'react';
import { FaBell, FaCheck, FaCheckDouble } from 'react-icons/fa';

function NotificationBell({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    let isMounted = true;
    const fetchNotifications = () => {
      fetch(`http://localhost:5000/api/notifications/${user.id}`)
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
    fetch(`http://localhost:5000/api/notifications/${id}/read`, { method: 'PUT' })
      .then(() => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      })
      .catch(console.error);
  };

  const markAllAsRead = () => {
    fetch(`http://localhost:5000/api/notifications/user/${user.id}/readAll`, { method: 'PUT' })
      .then(() => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      })
      .catch(console.error);
  };

  if (!user) return null;

  return (
    <div className="notification-bell-container" style={{ position: 'relative' }}>
      <button 
        className="nav-btn" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'transparent', border: 'none', color: '#ccc', cursor: 'pointer', position: 'relative', fontSize: '1.2rem', marginLeft: '1rem', display: 'flex', alignItems: 'center' }}
      >
        <FaBell style={{ color: unreadCount > 0 ? '#d4af37' : '#ccc', transition: 'color 0.3s' }} />
        {unreadCount > 0 && <span className="cart-badge" style={{ top: '-8px', right: '-8px' }}>{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h4>Notifications</h4>
            {unreadCount > 0 && (
              <button className="read-all-btn" onClick={markAllAsRead}>
                Tout marquer comme lu <FaCheckDouble size={10} />
              </button>
            )}
          </div>
          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="no-notifications">Aucune notification.</p>
            ) : (
              notifications.map(n => (
                <div 
                  key={n.id} 
                  className={`notification-item ${n.isRead ? 'read' : 'unread'}`}
                  onClick={() => !n.isRead && markAsRead(n.id)}
                >
                  <p>{n.message}</p>
                  <span className="notification-time">{new Date(n.createdAt).toLocaleString()}</span>
                  {!n.isRead && <FaCheck className="check-icon" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
