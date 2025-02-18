require("dotenv").config(); // Подключаем dotenv

const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // sk_test_51QtawNCtOmCvtLjDiP7kiVWaLeWZ7zcYFJwiFk0j5KmFwwNEyznZxkpEGXr6U0uzbrjw2QqjIri4HvlqiIRYgGYP00arwIT7mN

app.use(express.json());
app.use(cors());

// Эндпоинт для оплаты
app.post("/create-payment-intent", async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency || process.env.CURRENCY, // EUR
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Запуск сервера
app.listen(3000, () => {
    console.log("Сервер запущен на http://localhost:3000");
});


