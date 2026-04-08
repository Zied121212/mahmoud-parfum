import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('mahmoud_parfum_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('mahmoud_parfum_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size = '50ml', selectedPrice = product.price) => {
    const cartItemId = `${product.id}-${size}`;
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.id === cartItemId);
      if (existingProduct) {
        return prevItems.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { 
        ...product, 
        id: cartItemId, 
        originalId: product.id, 
        size, 
        price: selectedPrice, 
        quantity: 1, 
        name: `${product.name} (${size})` 
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};
