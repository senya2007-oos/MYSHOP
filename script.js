document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    updateCart();
    setupPaymentButton();
});

// 📌 Функция загрузки товаров из `products.json`
function loadProducts() {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById("products");

            if (!productsContainer) return;

            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product");
                productElement.innerHTML = `
                    <img src="assets/images/${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.price} ₽</p>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Добавить в корзину</button>
                `;
                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => console.error("Ошибка загрузки товаров:", error));
}

// 📌 Функция добавления товара в корзину
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// 📌 Функция обновления корзины
function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartContainer || !cartTotal) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = ""; // Очищаем контейнер

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Корзина пуста 🛒</p>";
        cartTotal.textContent = "0 ₽";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${item.name} - ${item.quantity} шт. - ${item.price * item.quantity} ₽</p>
            <button class="remove-item" data-index="${index}">Удалить</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `${total} ₽`;

    // Добавляем обработчики кнопок удаления
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
        });
    });
}

// 📌 Функция обработки нажатия кнопки оплаты
function setupPaymentButton() {
    const payButton = document.getElementById("pay-button");
    if (payButton) {
        payButton.addEventListener("click", function () {
            alert("Оплата ещё не реализована.");
        });
    }
}


