import { Button, CardBody } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import { useState } from "react";
import { ShoppingCart } from "react-feather";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { formatCurrency } from "../helpers/formatCurrency";

import React from "react";
//import useFetch from "../../hooks/useFetch";
//import { useState, useEffect } from "react";

import Modal from 'react-modal';

const Product = ({ product }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addItem(product, 1);
      toast.success("Добавлено в корзину");
    } catch (error) {
      console.log(error);
      toast.error("Ошибка добавления в корзину");
    } finally {
      setIsLoading(false);
    }
  };
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

      <div className="group">
        <span className="block relative h-48 rounded overflow-hidden">
          <img
            className="w-full h-full object-contain object-center"
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            decoding="async"
            title={product.name}
          />
        </span>
        <CardBody className="flex flex-col items-stretch mt-4">
          <h2 className="title-font text-lg font-medium overflow-ellipsis whitespace-nowrap overflow-hidden">
            {product.name}
          </h2>
          <p className="">{formatCurrency(product.price)}</p>
          <Button

            className="mt-4 transition duration-200 ease-out lg:bg-opacity-0 group-hover:bg-opacity-100"
            onClick={(e) => addToCart(e)}
          >

          </Button>
        </CardBody>
      </div>

    </>
  );
};

export default Product;
