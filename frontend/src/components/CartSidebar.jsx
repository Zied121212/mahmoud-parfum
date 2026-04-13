import { useCart } from '../context/CartContext';
import { FaTimes, FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../apiConfig';

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
        const response = await fetch(`${API_BASE_URL}/orders`, {
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
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Overlay sombre avec flou */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={() => setIsCartOpen(false)}
      ></div>
      
      {/* Tiroir du panier */}
      <div className="relative w-full max-w-md h-full bg-dark-bg border-l border-dark-border flex flex-col shadow-2xl animate-slide-in-right">
        <div className="flex justify-between items-center p-6 border-b border-dark-border">
          <h2 className="font-serif text-2xl text-gold flex items-center gap-2">
            <FaShoppingBag size={20} />
            {t('Votre Panier')}
          </h2>
          <button 
            className="text-muted-text hover:text-gold transition-colors p-2" 
            onClick={() => setIsCartOpen(false)}
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <FaShoppingBag size={48} className="text-dark-border" />
              <p className="font-serif italic text-muted-text">{t('Votre panier est vide.')}</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 pb-6 border-b border-dark-border/50 animate-fade-in">
                <div className="w-20 h-24 bg-white rounded overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-2" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-serif text-lg leading-tight">
                      {i18n.language === 'ar' && item.nameAr ? item.nameAr : item.name}
                    </h4>
                    <p className="text-gold text-sm font-mono mt-1">{Number(item.price).toFixed(2)} TND</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-4 bg-black/40 border border-dark-border rounded-full px-3 py-1">
                      <button 
                        className="text-muted-text hover:text-gold transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        className="text-muted-text hover:text-gold transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                    <button 
                      className="text-muted-text hover:text-red-500 transition-colors p-2" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 bg-dark-card border-t border-dark-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm uppercase tracking-widest text-muted-text">{t('Total Estimé')}</span>
              <span className="font-serif text-2xl text-gold">
                {cartTotal.toFixed(2)} <span className="text-xs font-sans">TND</span>
              </span>
            </div>
            <button 
              className="w-full bg-gold text-black py-4 font-bold uppercase tracking-[2px] transition-all hover:bg-[#b5952f] hover:translate-y-[-2px] active:translate-y-0" 
              onClick={handleCheckout}
            >
              {t('Passer la Commande')}
            </button>
            <p className="text-[10px] text-center text-muted-text italic">
              {t('Livraison gratuite partout en Tunisie.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSidebar;
