const express = require("express");
const { createPaymentIntent } = require("../stripe/stripe"); // Import from stripe.js

const router = express.Router();

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  console.log(amount);

  try {
    const paymentIntent = await createPaymentIntent(amount);

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
