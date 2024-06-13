import { Button, CardBody } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import { useState } from "react";
import { ShoppingCart } from "react-feather";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { formatCurrency } from "../helpers/formatCurrency";

const Product = ({ product }) => {
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
    <Link to={`/products/${product.slug}`}>
      <div
        key={product.product_id}
        id={product.product_id}
        data-aos="zoom-in"
        data-aos-duration="300"
        className="rounded-2xl bg-white dark:bg-gray-800  hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
      >
        <div className="h-[100px]">
          <img
            src={product.image_url}
            alt=""
            className="max-w-[180px] block mx-auto transform -translate-y-14
                  group-hover:scale-105 group-hover:rotate-6 duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="text-center flex items-center justify-center p-4">
          <h1 className="pr-2">{formatCurrency(product.price)}</h1>
          <button id={product.product_id} onClick={(e) => addToCart(e)} className=" bg-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
            Добавить
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
