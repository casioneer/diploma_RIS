import React from "react";
//import Img from "../../assets/pizza-pepperoni.png";
//import Img2 from "../../assets/pizza-margarita.png";
//import Img3 from "../../assets/pizza-mushrooms.png";
//import Img4 from "../../assets/pizza-hawaii.png";
//import Img5 from "../../assets/pizza-heart.png";
//import Img6 from "../../assets/pizza-4-cheese.png";

import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";



// const { data, isPending, error } = useFetch({
//     url: 'http://localhost:9000/api/product?id=1',
//     defaultData: [],
//     trigger: false
// });


// const ServicesData = [
//     { product_id: 4, name: 'pizza-hawaii', slug: 'pizza-hawaii', price: 550, description: 'Пицца с ананасами и свежими оващами - яркий вкус!' },
//     { product_id: 3, name: 'pizza-mushrooms', slug: 'pizza-mushrooms', price: 600, description: 'Шампиньоны, оливки и травы - непередоваемо свежо!' },
//     { product_id: 6, name: 'pizza-4-cheese', slug: 'pizza-4-cheeze', price: 610, description: 'Пицца с восьмью сырами, ведь сыра много не бывает!' },
//     { product_id: 2, name: 'pizza-pepperoni', slug: 'pizza-pepperoni', price: 680, description: 'Пицца с пепперони и травами - остро и сочно!' },
//     { product_id: 5, name: 'pizza-heart', slug: 'pizza-heart', price: 660, description: 'Пицца в виде сердца - удиви своих близких!' },
//     { product_id: 1, name: 'pizza-margarita', slug: 'pizza-margarita', price: 450, description: 'Пицца с пармезаном, моцареллой и чеддером - все что нужно!' }
// ]



import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const Services = ({ ServicesData, isPending, isError }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const navigate = useNavigate();

    const handleAddClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    let menuCards;

    (!isPending && !isError) ? menuCards = ServicesData.map((service) => (
        <div
            key={service.product_id}
            id={service.product_id}
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
                <button id={service.product_id} onClick={() => handleAddClick(service.product_id)} className=" bg-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
                    Добавить
                </button>
            </div>
            <div className="text-center flex items-center justify-center p-4">
                <button onClick={() => openModal({ id: service.product_id, name: service.name, price: service.price, description: service.description, image: service.img })}>
                    Подробнее
                </button>
            </div>
        </div>
    )) : "Loading";

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
                        {menuCards}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Product Details"
                style={{
                    overlay: {
                        zIndex: 1000,
                    },
                    content: {
                        width: '25%', // Уменьшенная ширина
                        height: 'auto',
                        margin: '0 auto',
                        padding: '10px',
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    },
                }}
            >
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>{selectedProduct?.name}</h2>
                    <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}>ID: {selectedProduct?.id}</p>
                    <p style={{ color: '#999', fontSize: '16px', marginBottom: '20px' }}>Цена: {selectedProduct?.price}</p>
                    <p style={{ color: '#777', fontSize: '16px', marginBottom: '20px' }}>Описание: {selectedProduct?.description}</p>
                    <img src={selectedProduct?.image} alt={selectedProduct?.name} style={{ maxWidth: '100%', display: 'block', margin: '20px auto' }} />
                    <button onClick={closeModal} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Закрыть</button>
                </div>
            </Modal>



        </>
    );
};

export default Services;