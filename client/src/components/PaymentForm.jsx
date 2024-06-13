import { CardElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button, HelperText } from "@windmill/react-ui";
import API from "api/axios.config";
import { useCart } from "context/CartContext";
import { formatCurrency } from "helpers/formatCurrency";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import OrderService from "services/order.service";
import OrderSummary from "./OrderSummary";
import PaystackBtn from "./PaystackBtn";

const PaymentForm = ({ previousStep, addressData, nextStep }) => {
  const { cartSubtotal, cartTotal, cartData, setCartData } = useCart();
  const [error, setError] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    setError();
    const { fullname, email, address, city, state } = addressData;
    if (!stripe || !elements) {
      return;
    }
    try {
      setIsProcessing(true);
      const { data } = await API.post("/payment", {
        amount: (cartSubtotal * 100).toFixed(),
        email,
      });

      const card = elements.getElement(CardElement);
      OrderService.createOrder(cartSubtotal, cartTotal, data.id, "TEST").then(() => {
        setCartData({ ...cartData, items: [] });
        setIsProcessing(false);
        navigate("/cart/success", {
          state: {
            fromPaymentPage: true,
          },
        });
      });
    } catch (error) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-3xl font-semibold text-center mb-2">Итог</h1>
      <OrderSummary />
      <h1 className="font-medium text-2xl">Заплатите доступной картой</h1>
      <Button onClick={previousStep} layout="outline" size="small">
        Назад
      </Button>
      <Button>
        Pay
      </Button>
    </div>
  );
};

export default PaymentForm;
