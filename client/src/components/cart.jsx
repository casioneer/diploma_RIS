import React, { useState, useEffect } from "react";
import "../styles/cart.css";

const Cart = ({ cart, setCart, handleChange }) => {
    const [price, setPrice] = useState(0);

    const handleRemove = (id) => {
        const arr = cart.filter((item) => item.id !== id);
        setCart(arr);
        handlePrice();
    };

    const handlePrice = () => {
        let ans = 0;
        cart.map((item) => (ans += item.amount * item.price));
        setPrice(ans);
    };

    useEffect(() => {
        handlePrice();
    });

    return (
        <article className="max-w-[1200px] mx-auto px-4 py-6">
            {cart.map((item) => (
                <div className="cart_box" key={item.id}>
                    <div className="cart_img">
                        <img src={item.img} alt="" />
                        <p>{item.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-gray-200 px-3 py-1 rounded" onClick={() => handleChange(item, -1)}>-</button>
                        <button className="px-3 py-1 border rounded cursor-default">{item.amount}</button>
                        <button className="bg-gray-200 px-3 py-1 rounded" onClick={() => handleChange(item, 1)}>+</button>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-semibold">{item.price} ₽</span>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleRemove(item.id)}>Удалить</button>
                    </div>
                </div>
            ))}
            <div className="total">
                <span>Итоговая сумма</span>
                <span>{price} рублей</span>
            </div>
        </article>
    );
};

export default Cart;