document.addEventListener("DOMContentLoaded", async function () {
    const productsContainer = document.getElementById("products");
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Загружаем товары из products.json
    async function loadProducts() {
        try {
            const response = await fetch("products.json");
            if (!response.ok) throw new Error("Ошибка загрузки товаров!");
            
            const products = await response.json();
            console.log("📦 Товары загружены: ", products);

            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product");
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price} ₽</p>
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Добавить в корзину</button>
                `;
                productsContainer.appendChild(productElement);
            });

            // Добавляем обработчики кнопкам "Добавить в корзину"
            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", function () {
                    const id = this.getAttribute("data-id");
                    const name = this.getAttribute("data-name");
                    const price = parseFloat(this.getAttribute("data-price"));
                    addToCart(id, name, price);
                });
            });

        } catch (error) {
            console.error("❌ Ошибка загрузки товаров:", error);
        }
    }

    // Добавление в корзину
    function addToCart(id, name, price) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }

    // Обновление корзины
    function updateCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
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
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} - ${item.quantity} шт. - ${item.price * item.quantity} ₽</p>
                <button class="remove-item" data-index="${index}">Удалить</button>
            `;
            cartContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `${total} ₽`;

        // Удаление товара из корзины
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });
        });
    }

    // Оплата (пока заглушка)
    const payButton = document.getElementById("pay-button");
    if (payButton) {
        payButton.addEventListener("click", function () {
            alert("Оплата ещё не реализована.");
        });
    }

    // Загружаем товары и обновляем корзину
    await loadProducts();
    updateCart();
});


