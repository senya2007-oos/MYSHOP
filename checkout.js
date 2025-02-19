
document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutForm = document.getElementById("checkout-form");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        cartContainer.innerHTML = "";
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Корзина пуста 🛒</p>";
            cartTotal.textContent = "0 ₽";
            return;
        }

        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
                <p>${item.name} - ${item.quantity} шт. - ${item.price * item.quantity} ₽</p>
            `;
            cartContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `${total} ₽`;
    }

    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Корзина пуста!");
            return;
        }

        const formData = new FormData(checkoutForm);
        const orderDetails = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            payment: formData.get("payment"),
            cart
        };

        console.log("🛒 Заказ оформлен:", orderDetails);
        alert(`✅ Заказ оформлен! \nМетод оплаты: ${orderDetails.payment}`);

        localStorage.removeItem("cart"); // Очищаем корзину
        cart = [];
        updateCart();
    });

    updateCart();
});
