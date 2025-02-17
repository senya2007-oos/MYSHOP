document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            let productsContainer = document.getElementById("products");
            products.forEach(product => {
                let productElement = document.createElement("div");
                productElement.classList.add("product");
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price} руб.</p>
                    <button onclick="addToCart('${product.name}', ${product.price})">Купить</button>
                `;
                productsContainer.appendChild(productElement);
            });
        });
});

// Функция для добавления товара в корзину
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину!");
    displayCart(); // Обновляем корзину сразу после добавления
}

// Функция для отображения товаров в корзине
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    if (!cartItems || !totalPrice) return; // Проверяем, что элементы существуют

    cartItems.innerHTML = ""; // Очищаем корзину перед рендерингом
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `<li>${item.name} - ${item.price} руб.
            <button onclick="removeFromCart(${index})">❌</button></li>`;
    });

    totalPrice.innerText = `Итого: ${total} руб.`;
}

// Функция для удаления товара
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// При загрузке страницы сразу обновляем корзину
document.addEventListener("DOMContentLoaded", displayCart);
// Функция для добавления товара в корзину и перехода на checkout.html
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину!");

    // Перенаправляем пользователя на checkout.html
    window.location.href = "checkout.html";
}

