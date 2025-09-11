import React, { useState, useEffect } from "react";
import "../styles/cart.css";

const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
  };

  const handlePrice = () => {
    let ans = 0;
    cart.forEach((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  }, [cart]);

  return (
    <article className="max-w-[1200px] mx-auto px-4 py-6 min-h-[60vh] flex flex-col">
      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-gray-500 text-lg">Корзина пуста</p>
          <p className="text-gray-400 text-sm">Добавьте что-нибудь в корзину</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div className="cart_box flex flex-col md:flex-row justify-between items-center gap-4" key={item.id}>
                <div className="cart_img flex items-center gap-4">
                  <img src={item.img} alt="" className="w-20 h-20 object-cover" />
                  <p>{item.title}</p>
                </div>
  
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <button className="bg-gray-200 px-3 py-1 rounded" onClick={() => handleChange(item, -1)}>-</button>
                  <span className="px-3 py-1 border rounded">{item.amount}</span>
                  <button className="bg-gray-200 px-3 py-1 rounded" onClick={() => handleChange(item, 1)}>+</button>
                </div>
  
                <div className="flex items-center gap-3 mt-2 md:mt-0">
                  <span className="font-semibold">{item.price} ₽</span>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleRemove(item.id)}>Удалить</button>
                </div>
              </div>
            ))}
          </div>
  
          <div className="total mt-6 flex justify-between text-lg font-semibold">
            <span>Итоговая сумма</span>
            <span>{price} ₽</span>
          </div>
        </>
      )}
    </article>
  );
  
};

export default Cart;
