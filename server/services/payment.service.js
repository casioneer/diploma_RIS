const Stripe = require("stripe");
const { ErrorHandler } = require("../helpers/error");
const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

class PaymentService {
  payment = async (amount, email) => {
    try {
      if (!stripe) {
        // Dev fallback: simulate payment intent when key missing
        return {
          id: `pi_dev_${Date.now()}`,
          amount,
          currency: "rub",
          status: "succeeded",
          receipt_email: email,
          client_secret: `cs_dev_${Date.now()}`,
        };
      }
      return await stripe.paymentIntents.create({
        amount,
        currency: "rub",
        payment_method_types: ["card"],
        receipt_email: email,
      });
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

module.exports = new PaymentService();
