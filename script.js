document.getElementById("pay-button").addEventListener("click", async function () {
    try {
        const response = await fetch("http://localhost:3000/checkout", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 1000, currency: "eur" }) 
        });

        const data = await response.json();
        console.log("Ответ от сервера:", data); // Добавим лог для отладки

        if (data.clientSecret) {
            const stripe = Stripe("pk_test_51QtawNCtOmCvtLjD5xEdYM76krTh6cZ4CBTRMnLv49joqSYoeK60X8hJehuAvbVtHFBNkqcMKxXpYufFlKVwy3zA00utdLHQrb");
            const { error } = await stripe.redirectToCheckout({ sessionId: data.clientSecret });

            if (error) {
                console.error("Ошибка редиректа:", error);
            }
        } else {
            console.error("Ошибка: сервер не вернул clientSecret", data);
        }
    } catch (err) {
        console.error("Ошибка при запросе на сервер:", err);
    }
});

