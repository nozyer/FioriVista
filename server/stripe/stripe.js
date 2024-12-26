const Stripe = require("stripe");
const config = require("../config");
const stripe = Stripe(config.stripe_secret_key);

const createPaymentIntent = async (amount) => {
  const amountInCents = Math.round(amount * 100);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
    });

    return paymentIntent;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createPaymentIntent };
