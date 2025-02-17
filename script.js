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
}