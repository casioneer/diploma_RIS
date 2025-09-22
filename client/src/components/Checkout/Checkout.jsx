import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const { user, isAuthenticated } = useAuth();
  const { cart, getTotalPrice, clearCart } = useCart();

  const totalPrice = getTotalPrice();
  // Суммарное количество единиц товаров, включая повторяющиеся
  const itemTotal = cart.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast.error('Войдите в систему для оформления заказа');
      return;
    }

    if (cart.length === 0) {
      toast.error('Корзина пуста');
      return;
    }

    try {
      setLoading(true);

      // Create order
      const orderData = {
        amount: totalPrice * 100, // Convert to cents for Stripe
        itemTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        ref: `order_${Date.now()}`
      };

      const orderResponse = await axios.post('/orders/create', orderData);
      
      if (paymentMethod === 'stripe') {
        // Initialize Stripe payment
        const paymentResponse = await axios.post('/payment', {
          email: user.email,
          amount: totalPrice * 100
        });

        // Here you would typically redirect to Stripe Checkout
        // For now, we'll just show success
        toast.success('Заказ создан! Оплата обрабатывается...');
      }

      // Clear cart after successful order and redirect to orders page
      clearCart();
      window.location.href = '/orders';
      
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Ошибка при оформлении заказа');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Войдите в систему
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Для оформления заказа необходимо войти в систему
          </p>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Закрыть
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Оформление заказа
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Товары в заказе
            </h3>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.product_id || item.id} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image_url || item.img} 
                      alt={item.name || item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.name || item.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Количество: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.price * item.quantity} ₽
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Способ оплаты
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === 'stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-900 dark:text-white">Банковская карта (Stripe)</span>
              </label>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center text-lg font-semibold text-gray-900 dark:text-white">
              <span>Итого к оплате:</span>
              <span>{totalPrice} ₽</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Товаров: {itemTotal} шт.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 px-4 rounded-md transition duration-200"
            >
              Отмена
            </button>
            <button
              onClick={handlePayment}
              disabled={loading || cart.length === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-md transition duration-200"
            >
              {loading ? 'Обработка...' : `Оплатить ${totalPrice} ₽`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
