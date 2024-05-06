/* import React from "react";
import PizzaPeppperoni from "../../assets/pizza-pepperoni.png";
import PizzaMargarita from "../../assets/pizza-margarita.png";
import PizzaMushrooms from "../../assets/pizza-mushrooms.png";
import bgImg from "../../assets/vector3.png";

const ImageList = [
    {
        id: 1,
        img: PizzaPeppperoni,
    },
    {
        id: 2,
        img: PizzaMargarita,
    },
    {
        id: 3,
        img: PizzaMushrooms,
    },
];

const bgImage = {
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
};

const Hero = () => {
    const [imageId, setImageId] = React.useState(PizzaPeppperoni);
    return (
        <>
            <div
                className="min-h-[550px] sm:min-h-[600px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200"
                style={bgImage}
            >
                <div className="container pb-8 sm:pb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                                Welcome{" "}
                                <span class="bg-clip-text text-transparent bg-gradient-to-b from-primary to-secondary">
                                    Foodie
                                </span>{" "}
                                Zone
                            </h1>
                            <p className="text-sm ">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                                reiciendis inventore iste ratione ex alias quis magni at optio
                            </p>
                            <div>
                                <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                                    Order Now
                                </button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <img src={imageId}
                                    alt=""
                                    className="w-[300px] sm:w-[450px] 
                                mx-auto spin" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    )
};

export default Hero;

*/


import React from "react";
import PizzaPeppperoni from "../../assets/pizza-pepperoni.png";
import PizzaMargarita from "../../assets/pizza-margarita.png";
import PizzaMushrooms from "../../assets/pizza-mushrooms.png";
import bgImg from "../../assets/vector3.png";

const ImageList = [
    {
        id: 1,
        img: PizzaPeppperoni,
    },
    {
        id: 2,
        img: PizzaMargarita,
    },
    {
        id: 3,
        img: PizzaMushrooms,
    },
];

const Hero = () => {
    const [imageId, setImageId] = React.useState(PizzaMargarita);

    const bgImage = {
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
    };

    return (
        <>
            <div
                className="min-h-[550px] sm:min-h-[600px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200"
                style={bgImage}
            >
                <div className="container pb-8 sm:pb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div
                            data-aos="zoom-out"
                            data-aos-duration="400"
                            data-aos-once="true"
                            className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1"
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                                Добро пожаловать в{" "}
                                <span class="bg-clip-text text-transparent bg-gradient-to-b from-primary to-secondary">
                                    Мятную
                                </span>{" "}
                                зону
                            </h1>
                            <p className="text-sm ">
                                Место изысканных вкусов лучших пицц
                                города по доступной цене
                            </p>
                            <div>
                                <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                                    Закажи сейчас
                                </button>
                            </div>
                        </div>
                        <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
                            <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                                <img
                                    data-aos="zoom-in"
                                    data-aos-duration="300"
                                    data-aos-once="true"
                                    src={imageId}
                                    alt="biryani img"
                                    className="w-[300px] sm:w-[450px] sm:scale-125  mx-auto spin "
                                />
                            </div>
                            <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute bottom-[0px] lg:-right-10 bg-white/30 rounded-full">
                                {ImageList.map((item) => (
                                    <img
                                        data-aos="zoom-in"
                                        data-aos-duration="400"
                                        data-aos-once="true"
                                        src={item.img}
                                        onClick={() => {
                                            setImageId(
                                                item.id === 1
                                                    ? PizzaPeppperoni
                                                    : item.id === 2
                                                        ? PizzaMargarita
                                                        : PizzaMushrooms
                                            );
                                        }}
                                        alt="biryani img"
                                        className="max-w-[80px] h-[80px] object-contain inline-block hover:scale-105 duration-200"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
