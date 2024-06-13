import { Card, Pagination } from "@windmill/react-ui";
import Product from "components/Product";
import Spinner from "components/Spinner";
import { useProduct } from "context/ProductContext";
import Layout from "../layout/Layout";
import Nav from "../components/Nav"
import Hero from "../components/Hero/Hero"
import Services from "../components/Services/Services";
import Banner from "../components/Banner/Banner";
import Testimonial from "../components/Testimonial/Testimonial"
import AppStore from "../components/AppStore/AppStore"
import Footer from "../components/Footer/Footer"

const ProductList = () => {
  const { products, setPage } = useProduct();

  const handleChange = (page) => {
    setPage(page);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  if (!products) {
    return (
      <>
        <Layout>
          <Spinner size={100} loading />
        </Layout>
      </>
    );
  }

  return (

    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Nav />
      <Hero />
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
        </div>
      </div>
      <div className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-20 place-items-center">
            {products?.map((prod) => (
              <div

                key={prod.product_id}
              >
                <Product product={prod} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Banner />
      <AppStore />
      <Testimonial />
      <Footer />
    </div>


  );
};

export default ProductList;


