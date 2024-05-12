import React from "react";
import Img from "../../assets/pizza-pepperoni.png";
import Img2 from "../../assets/pizza-margarita.png";
import Img3 from "../../assets/pizza-mushrooms.png";
import Img4 from "../../assets/pizza-hawaii.png";
import Img5 from "../../assets/pizza-heart.png";
import Img6 from "../../assets/pizza-4-cheese.png";
const ServicesData = [
    {
        id: 1,
        img: Img2,
        name: "4 СЫРА",
        description:
            "Пицца с пармезаном, моцареллой и чеддером - все что нужно!",
        price: "450 ₽",
    },
    {
        id: 2,
        img: Img,
        name: "ПЕППЕРОНИ",
        description:
            "Пицца с пепперони и травами - остро и сочно!",
        price: "680 ₽",
    },
    {
        id: 3,
        img: Img3,
        name: "ГРИБНАЯ",
        description:
            "Шампиньоны, оливки и травы - непередоваемо свежо!",
        price: "600 ₽",
    },
    {
        id: 4,
        img: Img4,
        name: "ГАВАЙСКАЯ",
        description:
            "Пицца с ананасами и свежими оващами - яркий вкус!",
        price: "550 ₽",
    },
    {
        id: 5,
        img: Img5,
        name: "СЕРДЦЕ",
        description:
            "Пицца в виде сердца - удиви своих близких!",
        price: "660 ₽",
    },
    {
        id: 6,
        img: Img6,
        name: "8 СЫРОВ",
        description:
            "Пицца с восьмью сырами, ведь сыра много не бывает!",
        price: "610 ₽",
    },
];
const Services = () => {
    return (
        <>
            <span id="services"></span>
            <div className="py-10">
                <div className="container">
                    <div className="text-center mb-20 max-w-[400px] mx-auto">
                        <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary ">
                            Наше меню
                        </p>
                        <h1 className="text-3xl font-bold">Пиццы</h1>
                        <p className="text-xs text-gray-400">
                            Большой выбор пиц на любой вкус и кошелек.
                            Добавляте в корзину и заказывайте!
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-20 place-items-center">
                        {ServicesData.map((service) => (
                            <div
                                data-aos="zoom-in"
                                data-aos-duration="300"
                                className="rounded-2xl bg-white dark:bg-gray-800  hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                            >
                                <div className="h-[100px]">
                                    <img
                                        src={service.img}
                                        alt=""
                                        className="max-w-[180px] block mx-auto transform -translate-y-14
                  group-hover:scale-105 group-hover:rotate-6 duration-300"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h1 className="text-xl font-bold">{service.name}</h1>
                                    <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                                        {service.description}
                                    </p>
                                </div>
                                <div className="text-center flex items-center justify-center p-4">
                                    <h1 className="pr-2">{service.price}</h1>
                                    <button className=" bg-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
                                        Добавить
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="text-center mb-20 max-w-[400px] mx-auto m-8">

                        <h1 className="text-3xl font-bold">Пиццы</h1>
                        <p className="text-xs text-gray-400">
                            Большой выбор пиц на любой вкус и кошелек.
                            Добавляте в корзину и заказывайте!
                        </p>
                    </div>

                </div>

            </div>
        </>
    );
};

export default Services;