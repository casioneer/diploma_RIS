import React, { useState } from "react";
import Logo from "../../assets/mint.png";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import DarkMode from "./DarkMode";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Menu = [
    {
        id: 1,
        name: "Главная",
        link: "#",
    },
    {
        id: 2,
        name: "Меню",
        link: "#services",
    },
    {
        id: 3,
        name: "Отзывы",
        link: "#testimonial",
    },
];
const Navbar = ({ onCartClick, onNavigate }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { getTotalItems } = useCart();
    
    const cartCount = getTotalItems();

    const handleLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    const handleRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
    };

    return (
        <>
            <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
                <div className="container py-3 sm:py-0">
                    <div className="flex justify-between items-center">
                        <div className="min-w-0">
                            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("home"); }} className="font-bold text-2xl sm:text-3xl flex items-center gap-2 truncate max-w-[60vw] sm:max-w-none">
                                <img src={Logo} alt="Logo" className="w-10 flex-shrink-0" />
                                <span className="truncate">Мята</span>
                            </a>
                        </div>
                        <div className="flex justify-between items-center gap-2 sm:gap-4 flex-shrink-0">
                            <div className="hidden xs:block">
                                <DarkMode />
                            </div>
                            <ul className="hidden sm:flex items-center gap-4">
                                {Menu.map((menu) => (
                                    <li key={menu.id}>
                                        <a
                                            href={menu.link}
                                            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(menu.link.replace('#','')); }}
                                            className="inline-block py-4 px-4 hover:text-green-500"
                                        >
                                            {menu.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Auth buttons or user menu */}
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button 
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors"
                                    >
                                        <FaUser className="text-xl" />
                                        <span className="hidden sm:block">{user?.fullname || user?.username}</span>
                                    </button>
                                    
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                                            <a
                                                href="/orders"
                                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Мои заказы
                                            </a>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                            >
                                                <FaSignOutAlt />
                                                Выйти
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={handleLogin}
                                        className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors px-3 py-1"
                                    >
                                        Войти
                                    </button>
                                    <button 
                                        onClick={handleRegister}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                                    >
                                        Регистрация
                                    </button>
                                </div>
                            )}
                            
                            <button onClick={onCartClick} className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-3 sm:px-4 rounded-full flex items-center gap-2 sm:gap-3">
                                Заказ
                                <FaShoppingCart className="text-xl text-white drop-shadow-sm cursor-pointer" />
                                <span className="ml-1 bg-white/20 rounded-full px-2 text-sm">{cartCount}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Auth modals */}
            {showLogin && (
                <Login 
                    onClose={() => setShowLogin(false)} 
                    onSwitchToRegister={handleRegister}
                />
            )}
            {showRegister && (
                <Register 
                    onClose={() => setShowRegister(false)} 
                    onSwitchToLogin={handleLogin}
                />
            )}
        </>
    );
};

export default Navbar;

/* import React, { useState } from 'react';
import style from './Navbar.module.css';
import Logo from '../../assets/logo.png';
import LogoText from '../../assets/logo_text.png';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import DarkMode from '../Navbar/DarkMode';

export default function Navbar() {
    const [nav, setNav] = useState(false)
    return (
        <header className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
            <div className="container">
                <div className={style.box}>
                    <div className={style.logo_image}>
                        <img src={Logo} alt="/" />
                        <img src={LogoText} alt="/" />
                    </div>

                    <ul
                        className={
                            nav ? [style.menu, style.active].join(' ') : [style.menu]
                        }
                    >   <DarkMode />
                        <div className="flex items-center">
                        </div>
                        <li>
                            <a href="##">Главная</a>
                        </li>
                        <li>
                            <a href="##">Меню</a>
                        </li>
                        <li>
                            <a href="##">О нас</a>
                        </li>
                        <li>
                            <a href="##">Контакты</a>
                        </li>
                        <li>
                            <a href="##">Войти</a>
                        </li>
                    </ul>

                    <div onClick={() => setNav(!nav)} className={style.mobile_btn}>
                        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
                    </div>
                </div>
            </div>
        </header >
    )
} */