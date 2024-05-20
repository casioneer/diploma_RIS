// import Spinner from "components/Spinner";
// import Layout from "layout/Layout";
// import {
//   Account,
//   Cart,
//   Checkout,
//   Confirmation,
//   Login,
//   NotFound,
//   OrderDetails,
//   Orders,
//   ProductDetails,
//   ProductList,
//   Register,
//   ResetPassword,
// } from "pages";

// import Test from "./pages/Test";
import Product from "./components/Product"
import Navbar from "./components/Navbar/Navbar"
import Hero from "./components/Hero/Hero"
import Services from "components/Services/Services";
import Banner from "components/Banner/Banner";
import Testimonial from "components/Testimonial/Testimonial"
import AppStore from "components/AppStore/AppStore"
import Footer from "components/Footer/Footer"

import Nav from "components/Nav"

// import ProductDetails from "pages/ProductDetails"

import useFetch from "hooks/useFetch";

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
// import { ProtectedRoute } from "routes/protected.route";

import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  // useState ID

  const { data: products, isPending: productsIsPending, error: productsError } = useFetch({
    url: 'http://localhost:9000/api/product',
    //url: 'http://172.24.158.120:9000/api/product',
    defaultData: [],
    trigger: false
  });

  // const { data: product, isPending: productIsPending, error: productError } = useFetch({
  //     // url: 'http://localhost:9000/api/product?id=1',
  //     url: `http://172.24.158.120:9000/api/product?id=${ID}`,
  //     defaultData: [],
  //     trigger: false
  // });

  // handler(event) { event.target.id }




  return (

    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Nav />
      <Hero />
      <Services
        ServicesData={products}
        isPending={productsIsPending}
        error={productsError}
      />
      <Product />
      <Banner />
      <AppStore />
      <Testimonial />
      <Footer />
    </div>

  );

  //     <Suspense
  //       fallback={
  //         <Layout>
  //           <Spinner size={100} />
  //         </Layout>
  //       }
  //     >

  // {/* 
  //       <Routes>
  //         <Route path="/" element={<Test />}/>
  //       </Routes> */}
  //       {/* <Toaster position="top-right" />
  //       <Routes>
  //         <Route element={<ProtectedRoute />}>
  //           <Route path="/profile" element={<Account />} />
  //           <Route path="/cart/checkout" element={<Checkout />} />
  //           <Route path="/cart/success" element={<Confirmation />} />
  //           <Route path="/orders" element={<Orders />} />
  //           <Route path="/orders/:id/" element={<OrderDetails />} />
  //         </Route>

  //         <Route path="/signup" element={<Register />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route index element={<ProductList />} />
  //         <Route path="/products/:slug/" element={<ProductDetails />} />
  //         <Route path="/cart" element={<Cart />} />
  //         <Route path="/reset-password" element={<ResetPassword />} />
  //         <Route path="*" element={<NotFound />}></Route>
  //       </Routes> */}
  //     </Suspense>

}

export default App;

/* import Spinner from "components/Spinner";
import Layout from "layout/Layout";
import {
  Account,
  Cart,
  Checkout,
  Confirmation,
  Login,
  NotFound,
  OrderDetails,
  Orders,
  ProductDetails,
  ProductList,
  Register,
  ResetPassword,
} from "pages";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "routes/protected.route";

function App() {
  return (
    <Suspense
      fallback={
        <Layout>
          <Spinner size={100} />
        </Layout>
      }
    >
      <Toaster position="top-right" />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Account />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/cart/success" element={<Confirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id/" element={<OrderDetails />} />
        </Route>

        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route index element={<ProductList />} />
        <Route path="/products/:slug/" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App; */
