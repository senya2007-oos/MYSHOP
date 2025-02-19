document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    function updateCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
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

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });
        });
    }

    updateCart();
});
