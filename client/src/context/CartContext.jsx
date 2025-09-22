import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, token } = useAuth();

  // Load cart from backend when user is authenticated and token is ready
  useEffect(() => {
    if (isAuthenticated && token) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated, token]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/cart');
      setCart(response.data.items || []);
    } catch (error) {
      // Скрываем уведомление при 401 на старте, просто подождём валидный токен
      if (error?.response?.status !== 401) {
        console.error('Failed to load cart:', error);
        toast.error('Не удалось загрузить корзину');
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error('Войдите в систему для добавления товаров в корзину');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/cart/add', {
        product_id: product.product_id || product.id,
        quantity: 1,
        name: product.name || product.title,
        price: Number(product.price) || 0,
        image_url: product.image_url || product.img,
      });
      
      // Reload cart to get updated data
      await loadCart();
      toast.success('Товар добавлен в корзину');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Не удалось добавить товар в корзину');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, delta) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      if (delta > 0) {
        await axios.put('/cart/increment', { product_id: productId });
      } else {
        await axios.put('/cart/decrement', { product_id: productId });
      }
      
      await loadCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error('Не удалось обновить количество');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      await axios.delete('/cart/delete', { data: { product_id: productId } });
      await loadCart();
      toast.success('Товар удален из корзины');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast.error('Не удалось удалить товар из корзины');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
