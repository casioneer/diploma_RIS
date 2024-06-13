import React from "react";
import Logo from "../assets/mint.png";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";

import { Badge, Button, Dropdown, DropdownItem, Transition } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import { useUser } from "context/UserContext";
import { useState } from "react";
import { LogOut, ShoppingCart, User } from "react-feather";
import { Link } from "react-router-dom";

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
    link: "/#footer",
  },
];

const Nav = () => {
  const { cartTotal } = useCart();
  const { isLoggedIn, userData, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
      <div className="container py-3 sm:py-0">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
            <img src={Logo} alt="Logo" className="w-10" />
            Мята
          </Link>
          <ul className="flex justify-between items-center gap-4">
            {!isLoggedIn && (
              <>
                <li>
                  <DarkMode />
                </li>
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
                <li>
                  <Link to="/login">
                    <Button layout="link">
                      <span>Войти</span>
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                    <Button layout="link" className="bg-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
                      <span className="lg:block hidden">Корзина</span>
                      <ShoppingCart className="lg:hidden" />
                      <Badge className="ml-2" type="danger">
                        {cartTotal}
                      </Badge>{" "}
                    </Button>
                  </Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li>
                  <DarkMode />
                </li>
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
                <li>
                  <Link to="/cart">
                    <Button layout="link" className="bg-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
                      <span className="lg:block hidden">Корзина</span>
                      <ShoppingCart className="lg:hidden" />
                      <Badge className="ml-2" type="danger">
                        {cartTotal}
                      </Badge>{" "}
                    </Button>
                  </Link>
                </li>
                <li className="relative">
                  <Button layout="link" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <span className="lg:block hidden">Аккаунт</span>
                    <User className="lg:hidden" />
                  </Button>
                  <Transition
                    show={isDropdownOpen}
                    enter="transition ease-out duration-150 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dropdown align="right" isOpen={isDropdownOpen} className="z-10">
                      <DropdownItem className="cursor-not-allowed text-gray-400 border-b flex flex-col items-start justify-start">
                        <p className="self-start">{userData?.fullname?.split(" ").join(" ")}</p>
                        <p className="self-start">@{userData?.username}</p>
                      </DropdownItem>
                      <DropdownItem tag="a">
                        <Link className="w-full" to="/profile">
                          Профиль
                        </Link>
                      </DropdownItem>
                      <DropdownItem tag="a">
                        <Link className="w-full" to="/orders">
                          Заказы
                        </Link>
                      </DropdownItem>
                      <DropdownItem tag="a" className="border-t">
                        <Link className="w-full" onClick={() => logout()} to="/login">
                          <Button iconRight={LogOut} block className=" bg-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
                            Выйти
                          </Button>
                        </Link>
                      </DropdownItem>
                    </Dropdown>
                  </Transition>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
