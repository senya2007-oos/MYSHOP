document.getElementById("pay-button").addEventListener("click", async function () {
    try {
        // Отправляем запрос на сервер
        const response = await fetch("http://localhost:3000/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 1000, currency: "eur" })
        });

        // Проверка успешности ответа от сервера
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Ответ от сервера:", data);

        // Проверяем наличие clientSecret в ответе
        if (data.clientSecret) {
            const stripe = Stripe("pk_test_51QtawNCtOmCvtLjD5xEdYM76krTh6cZ4CBTRMnLv49joqSYoeK60X8hJehuAvbVtHFBNkqcMKxXpYufFlKVwy3zA00utdLHQrb");
            
            // Перенаправляем на Stripe Checkout
            const { error } = await stripe.redirectToCheckout({ sessionId: data.clientSecret });

            if (error) {
                console.error("Ошибка редиректа:", error);
                alert("Ошибка при переходе на страницу оплаты. Попробуйте снова.");
            }
        } else {
            console.error("Ошибка: сервер не вернул clientSecret", data);
            alert("Не удалось создать сессию для оплаты. Попробуйте снова.");
        }
    } catch (err) {
        console.error("Ошибка при запросе на сервер:", err);
        alert("Произошла ошибка при запросе к серверу. Попробуйте позже.");
    }
});
