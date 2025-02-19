document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products");

    const products = [
        { id: 1, name: "Футболка", price: 20 },
        { id: 2, name: "Кроссовки", price: 50 },
        { id: 3, name: "Кепка", price: 15 }
    ];

    function renderProducts() {
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.innerHTML = `
                <p>${product.name} - ${product.price} ₽</p>
                <button onclick="addToCart(${product.id})">Добавить в корзину</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    window.addToCart = function (productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const product = products.find(p => p.id === productId);
        
        const existingProduct = cart.find(p => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("✅ Товар добавлен в корзину!");
    };

    renderProducts();
});

