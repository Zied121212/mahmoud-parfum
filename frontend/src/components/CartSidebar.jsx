import { useCart } from '../context/CartContext';
import { FaTimes, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function CartSidebar() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert("Veuillez vous connecter ou créer un compte pour finaliser votre commande.");
      setIsCartOpen(false);
      navigate('/login');
      return;
    }

    const user = JSON.parse(userStr);
    const details = cartItems.map(item => `${item.quantity}x ${i18n.language === 'ar' && item.nameAr ? item.nameAr : item.name}`).join(', ');

    const payload = {
        userId: user.id,
        totalAmount: cartTotal,
        orderDetails: details
    };

    try {
        const response = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Commande validée et sauvegardée avec succès !");
            clearCart();
            setIsCartOpen(false);
        } else {
            const errData = await response.json();
            alert("Erreur lors de la commande : " + (errData.message || "Requête invalide"));
        }
    } catch (error) {
        alert("Erreur serveur lors de la connexion à l'API.");
    }
  };

  return (
    <>
      {/* Overlay sombre */}
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
      
      {/* Tiroir du panier */}
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2 className="serif">{t('Votre Panier')}</h2>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="cart-empty">{t('Votre panier est vide.')}</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4 className="serif">{i18n.language === 'ar' && item.nameAr ? item.nameAr : item.name}</h4>
                  <p className="cart-item-price">{Number(item.price).toFixed(2)} TND</p>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FaMinus size={10} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FaPlus size={10} /></button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>{t('Total:')}</span>
              <span className="serif" style={{ color: '#d4af37', fontSize: '1.2rem' }}>
                {cartTotal.toFixed(2)} TND
              </span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              {t('Passer la Commande')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
