document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("products")) {
        loadProducts();
    }
    if (document.getElementById("cart-items")) {
        displayCart();
    }
});

function loadProducts() {
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
                    <p>${product.price} $</p>
                    <button onclick="addToCart('${product.name}', ${product.price})">Купить</button>
                `;
                productsContainer.appendChild(productElement);
            });
        });
}

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину!");
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `<li>${item.name} - $${item.price} 
            <button onclick="removeFromCart(${index})">❌</button></li>`;
    });

    totalPrice.innerText = `Итого: $${total}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

function checkout() {
    window.location.href = "checkout.html";
} document.addEventListener("DOMContentLoaded", function () {
    const stripe = Stripe("pk_test_Ваш_ключ"); // Вставь свой Publishable Key

    document.getElementById("pay-button").addEventListener("click", async function () {
        const response = await fetch("http://localhost:3000/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        const session = await response.json();
        stripe.redirectToCheckout({ sessionId: session.id });
    });
});



