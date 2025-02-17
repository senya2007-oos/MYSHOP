require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
            price_data: {
                currency: "eur",
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
});

app.listen(3000, () => console.log("✅ Сервер запущен на порту 3000"));
