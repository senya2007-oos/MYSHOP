document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products");
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutForm = document.getElementById("checkout-form");
    const clearCartButton = document.getElementById("clear-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Функция загрузки товаров
    async function loadProducts() {
        try {
            const response = await fetch("products.json");
            if (!response.ok) throw new Error("Ошибка загрузки товаров");
            const products = await response.json();

            productsContainer.innerHTML = "";
            products.forEach(product => {
                const productEl = document.createElement("div");
                productEl.classList.add("product");
                productEl.innerHTML = `
                    <p><strong>${product.name}</strong></p>
                    <p>${product.price} ₽</p>
                    <button data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                        ➕ Добавить в корзину
                    </button>
                `;
                productsContainer.appendChild(productEl);
            });

            document.querySelectorAll(".product button").forEach(button => {
                button.addEventListener("click", function () {
                    addToCart(this.dataset.id, this.dataset.name, this.dataset.price);
                });
            });

        } catch (error) {
            console.error("❌ Ошибка загрузки товаров:", error);
        }
    }

    // Функция добавления в корзину
    function addToCart(id, name, price) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity++;
        } else {
            cart.push({ id, name, price: parseFloat(price), quantity: 1 });
        }
        saveCart();
        updateCart();
    }

    // Функция обновления корзины
    function updateCart() {
        cartContainer.innerHTML = "";
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Корзина пуста 🛒</p>";
            cartTotal.textContent = "0 ₽";
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
                <p>${item.name} - ${item.quantity} шт. - ${item.price * item.quantity} ₽</p>
                <button class="remove-item" data-index="${index}">❌ Удалить</button>
            `;
            cartContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `${total} ₽`;

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart();
                updateCart();
            });
        });
    }

    // Функция сохранения корзины
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Очистка корзины
    clearCartButton.addEventListener("click", function () {
        cart = [];
        saveCart();
        updateCart();
    });

    // Форма оформления заказа
    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Корзина пуста!");
            return;
        }

        const formData = new FormData(checkoutForm);
        const orderDetails = {
            name: formData.get("name"),
            address: formData.get("address"),
            payment: formData.get("payment"),
            cart
        };

        console.log("🛒 Заказ оформлен:", orderDetails);
        alert(`✅ Заказ оформлен!\nМетод оплаты: ${orderDetails.payment}`);
        localStorage.removeItem("cart");
        cart = [];
        updateCart();
    });

    loadProducts();
    updateCart();
});
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

