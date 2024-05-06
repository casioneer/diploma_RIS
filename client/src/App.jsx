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

import Test from "./pages/Test";
import Navbar from "./components/Navbar/Navbar"
import Hero from "./components/Hero/Hero"
import Services from "components/Services/Services";
import Banner from "components/Banner/Banner";
import Testimonial from "components/Testimonial/Testimonial"
import AppStore from "components/AppStore/AppStore"
import Footer from "components/Footer/Footer"

// import App1 from "./App1"

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
// import { ProtectedRoute } from "routes/protected.route";

function App() {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar />
        <Hero />
        <Services />
        <Banner />
        <AppStore />
        <Testimonial />
        <Footer />

      </div>
    </>
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
  );
}

export default App;
