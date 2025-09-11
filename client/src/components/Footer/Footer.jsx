import React, { useState } from "react";
import { FaPaperPlane, FaReddit, FaVk, FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import footerLogo from "../../assets/mint.png";

const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-950">
      <section className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
          {/* Левая колонка */}
          <div className="py-2 px-0 w-full min-w-0">
            <h1 className="sm:text-3xl text-xl font-bold text-left mb-3 flex items-center gap-3">
              <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
              МЯТА
            </h1>
            <p className="text-left">
              Найдите страницы нашей сети ресторанов в социальных сетях! Не забудьте оставить отзыв!
            </p>
            <div className="flex items-center gap-3 mt-4">
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

          {/* Правая часть */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full min-w-0">
            {/* Первая колонка */}
            <div className="w-full">
              <h1 className="sm:text-xl text-xl font-bold mb-3">Ссылки</h1>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#">Главная</a>
                </li>
                <li>
                  <a href="#services">Меню</a>
                </li>
                <li>
                  <a href="#about">Информация</a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Заказ
                  </a>
                </li>
              </ul>
            </div>

            {/* Вторая колонка */}
            <div className="w-full">
              <h1 className="sm:text-xl text-xl font-bold mb-3">Это интересно</h1>
              <ul className="flex flex-col gap-3">
                <li>Почему готовим без перчаток</li>
                <li>Калорийность еды</li>
                <li>Поставки</li>
                <li>Известные посетители</li>
              </ul>
            </div>

            {/* Третья колонка */}
            <div className="w-full">
              <h1 className="sm:text-xl text-xl font-bold mb-3">Социальные сети</h1>
              <ul className="flex flex-col gap-3">
                <li>VK</li>
                <li>Ask.FM</li>
                <li>Telegram</li>
                <li>Reddit</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center py-10 border-t-2 border-gray-300/50">
          Хорошее время - с МЯТОЙ!
        </div>
      </section>
    </div>
  );
};

export default Footer;
