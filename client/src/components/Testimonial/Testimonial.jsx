import React from "react";
import Slider from "react-slick";
import Img1 from "../../assets/man1.jpg";
import Img from "../../assets/woman.jpg";
import Img2 from "../../assets/man2.jpg";

const testimonialData = [
    {
        id: 1,
        name: "Александр",
        text: "Пиццерия Мята - место, где каждый кусочек пиццы просто невероятно вкусен. Спасибо за прекрасную еду!",
        img: Img1,
    },
    {
        id: 1,
        name: "Анастасия",
        text: " В Мяте я всегда нахожу что-то новое и интересное. Очень рекомендую!",
        img: Img,
    },
    {
        id: 1,
        name: "Дмитрий",
        text: "Служба доставки в Мяте отличная, пицца приходит вовремя. Отличный выбор!",
        img: Img2,
    },
];

const Testimonial = () => {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
    };
    return (
        <>
            <div data-aos="fade-up" data-aos-duration="300" className="py-10">
                <div className="container">
                    <div className="text-center mb-20 max-w-[400px] mx-auto">
                        <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Что о нас говорят
                        </p>
                        <h1 className="text-3xl font-bold">Ваши отзывы!</h1>
                        <p className="text-xs text-gray-400">
                            Присылайте Ваши отзывы о нас в личных сообщениях
                            Будем рады услышать о качестве нашей работы!
                        </p>
                    </div>
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="300"
                        className="grid grid-cols-1 max-w-[600px] mx-auto gap-6"
                    >
                        <Slider {...settings}>
                            {testimonialData.map((data) => {
                                return (
                                    <div className="my-6">
                                        <div
                                            key={data.id}
                                            className="flex flex-col justify-center items-center gap-4 text-center   shadow-lg p-4 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative"
                                        >
                                            <img
                                                className="rounded-full block mx-auto max-w-[200px]"
                                                src={data.img}
                                                alt=""
                                            />
                                            <p className="text-gray-500 text-sm">{data.text}</p>
                                            <h1 className="text-xl font-bold">{data.name}</h1>
                                            <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                                                ,,
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Testimonial;
