// Функция для загрузки товаров на главную страницу
document.addEventListener("DOMContentLoaded", function() {
    const products = [
        { id: 1, name: "Товар 1", price: 1000 },
        { id: 2, name: "Товар 2", price: 1500 },
        { id: 3, name: "Товар 3", price: 2000 }
    ];

    const productsContainer = document.getElementById("products");
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Цена: ${product.price} ₽</p>
            <button onclick="addToCart(${product.id}, ${product.price})">Добавить в корзину</button>
        `;
        productsContainer.appendChild(productElement);
    });
});

let cart = [];

// Функция добавления товара в корзину
function addToCart(id, price) {
    cart.push({ id, price });
    updateCart();
}

// Функция обновления корзины
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += item.price;
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `Товар ${item.id} - ${item.price} ₽`;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById("total-amount").innerText = totalAmount;
}

// Отправка данных на сервер для создания сессии Stripe
document.getElementById("pay-with-card").addEventListener("click", async function () {
    try {
        const response = await fetch("http://localhost:3000/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 1000, currency: "eur" })
        });
        const data = await response.json();

        if (data.clientSecret) {
            const stripe = Stripe("Publishable key");pk_test_51QtawNCtOmCvtLjD5xEdYM76krTh6cZ4CBTRMnLv49joqSYoeK60X8hJehuAvbVtHFBNkqcMKxXpYufFlKVwy3zA00utdLHQrb
            const { error } = await stripe.redirectToCheckout({ sessionId: data.clientSecret });

            if (error) {
                console.error("Ошибка при редиректе на Stripe:", error);
            }
        } else {
            console.error("Ошибка: сервер не вернул clientSecret");
        }
    } catch (err) {
        console.error("Ошибка при запросе на сервер:", err);
    }
});


