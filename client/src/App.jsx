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
import React, { useState } from "react";
import Cart from "./components/cart";
import App1 from "./App1"
import Hero from "./components/Hero/Hero"
import Services from "components/Services/Services";
import Banner from "components/Banner/Banner";
import Testimonial from "components/Testimonial/Testimonial"
import AppStore from "components/AppStore/AppStore"
import Footer from "components/Footer/Footer"
import Orders from "./pages/Orders";
import InfoWhyNoGloves from "./pages/InfoWhyNoGloves";
import InfoCalories from "./pages/InfoCalories";
import InfoSupplies from "./pages/InfoSupplies";
import InfoFamousGuests from "./pages/InfoFamousGuests";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// import App1 from "./App1"

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
// import { ProtectedRoute } from "routes/protected.route";

function App() {
  const [showCart, setShowCart] = useState(false);

  const handleNavigate = (target) => {
    setShowCart(false);
    const id = target === 'home' || target === '' ? undefined : target;
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  React.useEffect(() => {
    const openCartHandler = () => setShowCart(true);
    window.addEventListener('open-cart', openCartHandler);
    document.addEventListener('open-cart', openCartHandler);
    return () => {
      window.removeEventListener('open-cart', openCartHandler);
      document.removeEventListener('open-cart', openCartHandler);
    }
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
          <Routes>
            <Route path="/" element={
              <>
                <Navbar onCartClick={() => setShowCart((v) => !v)} onNavigate={handleNavigate} />
                {!showCart && (
                  <>
                    <Hero />
                    <Services />
                    <Banner />
                    <AppStore />
                    <div id="testimonial"><Testimonial /></div>
                    <span id="about"></span>
                  </>
                )}
                {showCart && <Cart onClose={() => setShowCart(false)} />}
                <Footer />
              </>
            } />
            <Route path="/orders" element={<Orders />} />
            <Route path="/info/why-no-gloves" element={<InfoWhyNoGloves />} />
            <Route path="/info/calories" element={<InfoCalories />} />
            <Route path="/info/supplies" element={<InfoSupplies />} />
            <Route path="/info/famous" element={<InfoFamousGuests />} />
            <Route path="/test" element={<Test />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </CartProvider>
    </AuthProvider>
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
