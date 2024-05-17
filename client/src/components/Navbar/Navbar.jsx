import React from "react";
import Logo from "../../assets/mint.png";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";

const Menu = [
    {
        id: 1,
        name: "Главная",
        link: "/#",
    },
    {
        id: 2,
        name: "Меню",
        link: "/#services",
    },
    {
        id: 3,
        name: "Информация",
        link: "/#about",
    },
];
const Navbar = () => {

    return (
        <>
            <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
                <div className="container py-3 sm:py-0">
                    <div className="flex justify-between items-center">
                        <div>
                            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
                                <img src={Logo} alt="Logo" className="w-10" />
                                Мята
                            </a>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <div>
                                <DarkMode />
                            </div>
                            <ul className="hidden sm:flex items-center gap-4">
                                {Menu.map((menu) => (
                                    <li key={menu.id}>
                                        <a
                                            href={menu.link}
                                            className="inline-block py-4 px-4 hover:text-green-500"
                                        >
                                            {menu.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
                                Заказ
                                <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />

                            </button>
                        </div>
                    </div>
                </div>
            </div>
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