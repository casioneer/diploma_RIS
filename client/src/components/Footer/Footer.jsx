import React from "react";
import { FaPaperPlane, FaReddit, FaVk, FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import footerLogo from "../../assets/mint.png";

const Footer = () => {
  const columns = [
    {
      title: "Контакты",
      items: [
        { icon: <FaLocationArrow />, text: "Санкт-Петербург, ул. Московская д.37" },
        { icon: <FaMobileAlt />, text: "+7(934)-345-45-65" },
        { icon: <FaReddit />, text: "Reddit", href: "#" },
        { icon: <FaPaperPlane />, text: "Telegram", href: "#" },
        { icon: <FaVk />, text: "VK", href: "#" },
      ],
    },
    {
      title: "Ссылки",
      items: [
        { text: "Главная", href: "#" },
        { text: "Меню", href: "#services" },
        { text: "Отзывы", href: "#testimonial" },
        { text: "Корзина", href: "#", onClick: (e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-cart')); } },
      ],
    },
    {
      title: "Интересное",
      items: [
        { text: "Почему готовим без перчаток", href: "/info/why-no-gloves" },
        { text: "Калорийность еды", href: "/info/calories" },
        { text: "Поставки", href: "/info/supplies" },
        { text: "Известные посетители", href: "/info/famous" },
      ],
    },
    {
      title: "Соцсети",
      items: [
        { text: "О пицце в Википедии", href: "https://ru.wikipedia.org/wiki/%D0%9F%D0%B8%D1%86%D1%86%D0%B0" },
        { text: "История пиццы", href: "https://www.britannica.com/topic/pizza" },
        { text: "Статьи о пицце", href: "https://www.seriouseats.com/pizza" },
        { text: "Рецепты пиццы", href: "https://www.bonappetit.com/recipes/slideshow/pizza-recipes" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-950 py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Логотип и название */}
        <div className="flex flex-col items-center mb-10">
          <img src={footerLogo} alt="Logo" className="w-16 h-16 mb-3" />
          <h1 className="text-3xl font-bold">МЯТА</h1>
        </div>

        {/* Колонки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold mb-2">{col.title}</h2>
              <ul className="flex flex-col gap-2">
                {col.items.map((item, i) =>
                  typeof item === "string" ? (
                    <li
                      key={i}
                      className="hover:text-green-500 cursor-pointer transition-colors"
                    >
                      {item}
                    </li>
                  ) : (
                    <li key={i}>
                      <a
                        href={item.href}
                        onClick={item.onClick}
                        className="flex items-center justify-center gap-2 hover:text-green-500 transition-colors"
                      >
                        {item.icon && <span>{item.icon}</span>}
                        {item.text}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Нижняя строка */}
        <div className="mt-12 border-t border-gray-300/50 pt-6 text-center text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} МЯТА. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;




