document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Футболка", price: 20 },
        { id: 2, name: "Кроссовки", price: 50 },
        { id: 3, name: "Кепка", price: 15 }
    ];

    if (document.getElementById("products")) {
        const productsContainer = document.getElementById("products");
        products.forEach(product => {
            const div = document.createElement("div");
            div.innerHTML = `${product.name} - ${product.price} ₽ <button onclick="addToCart(${product.id})">Добавить</button>`;
            productsContainer.appendChild(div);
        });
    }

    if (document.getElementById("cart-items")) updateCart();
    if (document.getElementById("checkout-form")) setupCheckout();
});

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = { id, name: "Товар " + id, price: id * 10, quantity: 1 };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    cart.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `${item.name} - ${item.quantity} шт - ${item.price} ₽`;
        cartContainer.appendChild(div);
    });
}

function setupCheckout() {
    document.getElementById("checkout-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const response = await fetch("/create-checkout-session", { method: "POST" });
        const session = await response.json();
        window.location.href = session.url;
    });
}
