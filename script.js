document.addEventListener("DOMContentLoaded", function () {
    // Проверяем, есть ли контейнер для товаров
    const productsContainer = document.getElementById("products");
    if (productsContainer) {
        fetch("products.json")
            .then(response => response.json())
            .then(products => {
                products.forEach(product => {
                    const productElement = document.createElement("div");
                    productElement.classList.add("product");
                    productElement.innerHTML = `
                        <h2>${product.name}</h2>
                        <p>Цена: ${product.price} ₽</p>
                        <button onclick="addToCart('${product.id}', '${product.name}', ${product.price})">
                            Добавить в корзину
                        </button>
                    `;
                    productsContainer.appendChild(productElement);
                });
            })
            .catch(error => console.error("Ошибка загрузки товаров:", error));
    }

    // Функция добавления товара в корзину
    window.addToCart = function (id, name, price) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ id, name, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Товар добавлен в корзину!");
    };

    // Проверяем, есть ли корзина на странице
    const cartItemsContainer = document.getElementById("cart-items");
    if (cartItemsContainer) {
        updateCart();
    }

    // Обновление корзины
    function updateCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = ""; // Очищаем перед обновлением

        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `<p>${item.name} - ${item.price} ₽</p>`;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Проверяем кнопку оплаты (чтобы ошибка не появлялась)
    const payButton = document.getElementById("pay-button");
    if (payButton) {
        payButton.addEventListener("click", function () {
            alert("Оплата ещё не реализована.");
        });
    }
});

[
    {
        "id": 1,
        "name": "Футболка",
        "price": 20,
        "image": "tshirt.jpg"
    },
    {
        "id": 2,
        "name": "Кроссовки",
        "price": 50,
        "image": "shoes.jpg"
    },
    {
        "id": 3,
        "name": "Кепка",
        "price": 15,
        "image": "cap.jpg"
    }
]
document.addEventListener("DOMContentLoaded", function () {
    // Проверяем, есть ли кнопка оплаты перед добавлением обработчика
    const payButton = document.getElementById("pay-button");
    if (payButton) {
        payButton.addEventListener("click", function () {
            alert("Оплата ещё не реализована.");
        });
    }
});


