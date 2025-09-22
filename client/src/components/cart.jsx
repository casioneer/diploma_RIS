import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Checkout from "./Checkout/Checkout";
import "../styles/cart.css";

const Cart = ({ onClose }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, loading } = useCart();
  const { isAuthenticated } = useAuth();

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (item, delta) => {
    updateQuantity(item.product_id || item.id, delta);
  };

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <>
      <article className="max-w-[1200px] mx-auto px-4 py-6 min-h-[60vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Корзина</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Загрузка корзины...</p>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <p className="text-gray-500 text-lg">Корзина пуста</p>
            <p className="text-gray-400 text-sm">Добавьте что-нибудь в корзину</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div className="cart_box grid grid-cols-1 md:grid-cols-12 items-center gap-4 p-3 rounded-lg bg-white/70 dark:bg-gray-800/70" key={item.product_id || item.id}>
                  <div className="cart_img md:col-span-7 flex items-center gap-4 min-w-0">
                    <img 
                      src={item.image_url || item.img} 
                      alt={item.name || item.title} 
                      className="w-20 h-20 object-cover rounded flex-shrink-0" 
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {item.name || item.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {item.price} ₽ за шт.
                      </p>
                    </div>
                  </div>
    
                  <div className="md:col-span-3 flex items-center gap-2 mt-2 md:mt-0 justify-center order-3 md:order-none">
                    <button 
                      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded transition-colors flex-shrink-0" 
                      onClick={() => handleQuantityChange(item, -1)}
                      disabled={loading}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border rounded min-w-[3rem] text-center flex-shrink-0">
                      {item.quantity}
                    </span>
                    <button 
                      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded transition-colors flex-shrink-0" 
                      onClick={() => handleQuantityChange(item, 1)}
                      disabled={loading}
                    >
                      +
                    </button>
                  </div>

                  <div className="md:col-span-2 flex items-center gap-3 mt-2 md:mt-0 justify-end min-w-0">
                    <span className="font-semibold text-gray-900 dark:text-white whitespace-nowrap text-right flex-shrink-0">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </span>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors" 
                      onClick={() => handleRemove(item.product_id || item.id)}
                      disabled={loading}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
    
            <div className="total mt-6 flex justify-between text-lg font-semibold border-t border-gray-200 dark:border-gray-700 pt-4">
              <span className="text-gray-900 dark:text-white">
                Итого ({totalItems} {totalItems === 1 ? 'товар' : 'товаров'}):
              </span>
              <span className="text-gray-900 dark:text-white">{totalPrice} ₽</span>
            </div>

            {isAuthenticated ? (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 px-4 rounded-md transition duration-200"
                >
                  Продолжить покупки
                </button>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
                >
                  Оформить заказ
                </button>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                <p className="text-yellow-800 dark:text-yellow-200 text-center">
                  Войдите в систему для оформления заказа
                </p>
              </div>
            )}
          </>
        )}
      </article>

      {showCheckout && (
        <Checkout onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
  
};

export default Cart;
