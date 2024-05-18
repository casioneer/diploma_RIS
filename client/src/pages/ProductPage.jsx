import { useLocation } from 'react-router-dom';
import productService from 'services/product.service';
import ProductDetails from './ProductDetails';

const ProductPage = () => {
    const location = useLocation();
    const { product } = location.state;

    // Здесь вы можете использовать foodId для загрузки деталей продукта

    return (
        <div>
            <h1>Product Page</h1>
            <p>Food ID: {product}</p>
            {/* Отображение деталей продукта */}
        </div>
    );
};

export default ProductPage;


