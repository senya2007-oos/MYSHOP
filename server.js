const express = require('express');
const stripe = require('stripe')(Secret key);sk_test_51QtawNCtOmCvtLjDiP7kiVWaLeWZ7zcYFJwiFk0j5KmFwwNEyznZxkpEGXr6U0uzbrjw2QqjIri4HvlqiIRYgGYP00arwIT7mN
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/checkout', async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // сумма в центах, т.е. 1000 = 10.00 EUR
            currency: currency,
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Ошибка при создании сессии оплаты:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

