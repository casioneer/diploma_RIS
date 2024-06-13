import { Windmill } from "@windmill/react-ui";
import { GlobalHistory } from "components/GlobalHistory";
import { CartProvider } from "context/CartContext";
import { OrderProvider } from "context/OrderContext";
import { ProductProvider } from "context/ProductContext";
import { ReviewProvider } from "context/ReviewContext";
import { UserProvider } from "context/UserContext";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <Windmill>
      <UserProvider>
        <ProductProvider>
          <ReviewProvider>
            <CartProvider>
              <OrderProvider>
                <BrowserRouter>
                  <GlobalHistory />
                  <App />
                </BrowserRouter>
              </OrderProvider>
            </CartProvider>
          </ReviewProvider>
        </ProductProvider>
      </UserProvider>
    </Windmill>
  </HelmetProvider>
);
