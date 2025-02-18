document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products");
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutForm = document.getElementById("checkout-form");
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Функция для загрузки товаров
    async function loadProducts() {
        try {
            const response = await fetch("products.json"); // Проверяем путь
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
                        Добавить в корзину
                    </button>
                `;
                productsContainer.appendChild(productEl);
            });

            // Добавляем обработчики на кнопки "Добавить в корзину"
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
                <button class="remove-item" data-index="${index}">Удалить</button>
            `;
            cartContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `${total} ₽`;

        // Удаление из корзины
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart();
                updateCart();
            });
        });
    }

    // Функция сохранения корзины в localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Форма оформления заказа
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(checkoutForm);
            const orderDetails = {
                name: formData.get("name"),
                address: formData.get("address"),
                cart
            };

            console.log("🛒 Заказ оформлен:", orderDetails);
            alert("✅ Заказ оформлен!");
            localStorage.removeItem("cart");
            updateCart();
        });
    }

    loadProducts();
    updateCart();
});


