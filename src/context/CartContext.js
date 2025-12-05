import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Normalize product properties to handle both English and Spanish names
      const normalizedProduct = {
        id: product.id,
        nombre: product.nombre || product.name,
        precio: product.precio || product.price,
        imagen: product.imagen || product.imageUrl,
        category: product.category || product.categoria,
        quantity: 1
      };
      return [...prevItems, normalizedProduct];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      let price = 0;
      if (typeof item.precio === 'number') {
        price = item.precio;
      } else if (typeof item.precio === 'string') {
        price = parseFloat(item.precio.replace('$', '').replace(/\./g, ''));
      }
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    showCart,
    setShowCart,
    toggleCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
