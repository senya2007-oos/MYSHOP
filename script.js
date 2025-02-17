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
                    <button onclick="addToCart(${product.id})">Купить</button>
                `;
                productsContainer.appendChild(productElement);
            });
        });
});

function addToCart(productId) {
    alert("Товар " + productId + " добавлен в корзину!");
}// Функция для добавления товара в корзину
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Загружаем корзину
    cart.push({ name, price }); // Добавляем товар
    localStorage.setItem("cart", JSON.stringify(cart)); // Сохраняем обратно
    alert("Товар добавлен в корзину!");
}

// Функция для отображения товаров в корзине
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    cartItems.innerHTML = ""; // Очищаем корзину перед рендерингом
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `<li>${item.name} - $${item.price} 
            <button onclick="removeFromCart(${index})">❌</button></li>`;
    });

    totalPrice.innerText = `Итого: $${total}`;
}

// Функция для удаления товара
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Удаляем товар
    localStorage.setItem("cart", JSON.stringify(cart)); // Сохраняем
    displayCart(); // Обновляем корзину
}
