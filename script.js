// Функция добавления товара в корзину
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Загружаем корзину
    cart.push({ name, price }); // Добавляем товар
    localStorage.setItem("cart", JSON.stringify(cart)); // Сохраняем обратно

    alert("Товар добавлен в корзину!");
}

// Функция отображения товаров в корзине
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    if (!cartItems || !totalPrice) return; // Если элементов нет, ничего не делать

    cartItems.innerHTML = ""; // Очищаем корзину перед рендерингом
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `<li>${item.name} - $${item.price} 
            <button onclick="removeFromCart(${index})">❌</button></li>`;
    });

    totalPrice.innerText = `Итого: $${total}`;
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Удаляем товар
    localStorage.setItem("cart", JSON.stringify(cart)); // Сохраняем
    displayCart(); // Обновляем корзину
}

// Функция для очистки корзины
function clearCart() {
    localStorage.removeItem("cart"); // Удаляем корзину
    displayCart(); // Обновляем корзину
}

// Функция для перехода на страницу оплаты
function checkout() {
    window.location.href = "checkout.html"; // Переход на checkout.html
}

// Запускаем функцию отображения корзины при загрузке страницы
document.addEventListener("DOMContentLoaded", displayCart);


