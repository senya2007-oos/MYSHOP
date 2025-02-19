const express = require("express");
const stripe = require("stripe")("sk_test_51QtawNCtOmCvtLjDiP7kiVWaLeWZ7zcYFJwiFk0j5KmFwwNEyznZxkpEGXr6U0uzbrjw2QqjIri4HvlqiIRYgGYP00arwIT7mN");
const app = express();
app.use(express.static("public"));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price_data: { currency: "usd", product_data: { name: "Заказ" }, unit_amount: 5000 }, quantity: 1 }],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });
    res.json({ url: session.url });
});

app.listen(3000, () => console.log("✅ Сервер запущен на порту 3000"));
