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

// import App1 from "./App1"

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
// import { ProtectedRoute } from "routes/protected.route";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    const exists = cart.find((x) => x.id === item.id);
    if (exists) {
      setCart(cart.map((x) => (x.id === item.id ? { ...x, amount: x.amount + 1 } : x)));
    } else {
      setCart([...cart, { ...item, amount: item.amount ?? 1 }]);
    }
  };

  const handleChange = (item, delta) => {
    setCart((prev) => {
      return prev
        .map((x) => (x.id === item.id ? { ...x, amount: Math.max(1, (x.amount ?? 1) + delta) } : x))
        .filter((x) => x.amount > 0);
    });
  };

  const cartCount = cart.reduce((sum, x) => sum + (x.amount ?? 1), 0);

  React.useEffect(() => {
    const handler = (e) => {
      const item = e.detail;
      handleAddToCart(item);
    };
    window.addEventListener('add-to-cart', handler);
    return () => window.removeEventListener('add-to-cart', handler);
  }, [cart]);

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

  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar onCartClick={() => setShowCart((v) => !v)} cartCount={cartCount} onNavigate={handleNavigate} />
        {!showCart && (
          <>
            <Hero />
            <Services />
            <Banner />
            <AppStore />
            <Testimonial />
            <span id="about"></span>
          </>
        )}
        {showCart && <Cart cart={cart} setCart={setCart} handleChange={handleChange} />}
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
