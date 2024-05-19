/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams(); // Получаем ID товара из URL
    const [product, setProduct] = useState(null);

    //const location = useLocation();
    //const { productId } = location.state;

    useEffect(() => {
        fetch(`http://localhost:9000/api/product/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Ошибка:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.img} alt={product.name} />
            <p>{product.description}</p>
            <p>Цена: {product.price}</p>

        </div>
    );
};

export default ProductDetails; */
