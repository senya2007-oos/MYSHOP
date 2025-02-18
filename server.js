require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json()); // Важно!
app.use(cors());

// Проверка сервера
app.get("/", (req, res) => {
    res.send("🚀 Сервер Stripe работает!");
});

// Маршрут для оплаты
app.post("/checkout", async (req, res) => {
    try {
        console.log("Получен запрос:", req.body); // Логирование
        const { amount, currency } = req.body;

        if (!amount || !currency) {
            return res.status(400).json({ error: "Нужно указать сумму и валюту!" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Ошибка на сервере:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`));

