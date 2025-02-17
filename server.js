require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "google_pay", "apple_pay"],
            line_items: [{
                price_data: {
                    currency: "eur", // Можно изменить на "usd"
                    product_data: { name: "Тестовый товар" },
                    unit_amount: 5000 // 50.00 EUR
                },
                quantity: 1
            }],
            mode: "payment",
            success_url: "https://your-website.com/success.html",
            cancel_url: "https://your-website.com/cancel.html",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Ошибка при создании сессии:", error);
        res.status(500).send("Ошибка сервера");
    }
});

app.listen(3000, () => console.log("✅ Сервер запущен на порту 3000"));

