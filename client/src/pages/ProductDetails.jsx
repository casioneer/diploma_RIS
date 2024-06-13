import { Button } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import { formatCurrency } from "helpers/formatCurrency";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import productService from "services/product.service";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

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

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const { data: product } = await productService.getProduct(slug);
        setProduct(product);
      } catch (error) {
        return navigate("/404", {
          replace: true,
        });
      } finally {
        setIsFetching(false);
      }
    }
    fetchData();
  }, [slug]);

  return (
    <Layout loading={isFetching} title={product?.name}>
      <section className="body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              decoding="async"
              loading="lazy"
              src={product?.image_url}
              alt={product?.name}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-contain md:object-cover object-center rounded"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-3xl title-font font-medium mb-1">{product?.name}</h1>

              <p className="leading-relaxed pb-6 border-b-2 border-gray-800">
                {product?.description}
              </p>
              <div className="flex mt-4 justify-between">
                <span className="title-font font-medium text-2xl">
                  {formatCurrency(product?.price)}
                </span>
                <Button
                  className="bg-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"
                  onClick={(e) => addToCart(e)}
                >
                  {isLoading ? (
                    <ClipLoader
                      cssOverride={{
                        margin: "0 auto",
                      }}
                      color="#123abc"
                      size={20}
                    />
                  ) : (
                    "Добавить в корзину"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
