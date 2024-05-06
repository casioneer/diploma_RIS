import React, { useState } from "react";
import {
    FaPaperPlane,
    FaReddit,
    FaVk,
    FaLocationArrow,
    FaMobileAlt,
} from "react-icons/fa";
import footerLogo from "../../assets/mint.png";

const Footer = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-950">
            <section className="max-w-[1200px] mx-auto">
                <div className=" grid md:grid-cols-3 py-5">
                    <div className=" py-8 px-4 ">
                        <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
                            <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
                            МЯТА
                        </h1>
                        <p className="">
                            Найдите страницы нашей сети ресторанов в социальных сетях!
                            Не забудьте оставить отзыв!{" "}
                        </p>
                        <br />
                        <div className="flex items-center gap-3">
                            <FaLocationArrow />
                            <p>Санкт-Петербург, ул. Московская д.37</p>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                            <FaMobileAlt />
                            <p>+7(934)-345-45-65</p>
                        </div>

                        <div className="flex items-center gap-3 mt-6">
                            <a href="#">
                                <FaReddit className="text-3xl" />
                            </a>
                            <a href="#">
                                <FaPaperPlane className="text-3xl" />
                            </a>
                            <a href="#">
                                <FaVk className="text-3xl" />
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
                        <div className="">
                            <div className="py-8 px-4 ">
                                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                                    Ссылки
                                </h1>
                                <ul className={`flex flex-col gap-3`}>
                                    <li className="cursor-pointer">Главная</li>
                                    <li className="cursor-pointer">Меню</li>
                                    <li className="cursor-pointer">Информация</li>
                                    <li className="cursor-pointer">Заказ</li>
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div className="py-8 px-4 ">
                                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                                    Это интересно
                                </h1>
                                <ul className="flex flex-col gap-3">
                                    <li className="cursor-pointer">Почему готовим без перчаток</li>
                                    <li className="cursor-pointer">Калорийность еды</li>
                                    <li className="cursor-pointer">Поставки</li>
                                    <li className="cursor-pointer">Известные посетители</li>
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div className="py-8 px-4 ">
                                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                                    Социальные сети
                                </h1>

                                <ul className="flex flex-col gap-3">
                                    <li className="cursor-pointer">VK</li>
                                    <li className="cursor-pointer">Ask.FM</li>
                                    <li className="cursor-pointer">Telegram</li>
                                    <li className="cursor-pointer">Reddit</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-center py-10 border-t-2 border-gray-300/50">
                        Хорошее время - с МЯТОЙ!
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;

/* import React, { useState } from "react";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
    FaMobileAlt,
} from "react-icons/fa";
import footerLogo from "../../assets/mint.png";

const Footer = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-950">
            <section className="max-w-[1200px] mx-auto">
                <div className=" grid md:grid-cols-3 py-5">
                    <div className=" py-8 px-4 ">
                        <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
                            <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
                            FOODIE
                        </h1>
                        <p className="">
                            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Possimus, voluptate.{" "}
                        </p>
                        <br />
                        <div className="flex items-center gap-3">
                            <FaLocationArrow />
                            <p>Noida, Uttar Pradesh</p>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                            <FaMobileAlt />
                            <p>+91 123456789</p>
                        </div>

                        <div className="flex items-center gap-3 mt-6">
                            <a href="#">
                                <FaInstagram className="text-3xl" />
                            </a>
                            <a href="#">
                                <FaFacebook className="text-3xl" />
                            </a>
                            <a href="#">
                                <FaLinkedin className="text-3xl" />
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
                        <div className="">
                            <div className="py-8 px-4 ">
                                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                                    Important Links
                                </h1>
                                <ul className={`flex flex-col gap-3`}>
                                    <li className="cursor-pointer">Home</li>
                                    <li className="cursor-pointer">About</li>
                                    <li className="cursor-pointer">Services</li>
                                    <li className="cursor-pointer">Login</li>
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div className="py-8 px-4 ">
                                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                                    Links
                                </h1>
                                <ul className="flex flex-col gap-3">
                                    <li className="cursor-pointer">Home</li>
                                    <li className="cursor-pointer">About</li>
                                    <li className="cursor-pointer">Services</li>
                                    <li className="cursor-pointer">Login</li>
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div className="py-8 px-4 ">
                                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                                    Links
                                </h1>

                                <ul className="flex flex-col gap-3">
                                    <li className="cursor-pointer">Home</li>
                                    <li className="cursor-pointer">About</li>
                                    <li className="cursor-pointer">Services</li>
                                    <li className="cursor-pointer">Login</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-center py-10 border-t-2 border-gray-300/50">
                        @copyright 2024 All rights reserved || Made with ❤️ by Dilshad
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer; */