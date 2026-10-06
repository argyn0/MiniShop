import { getCart, increaseQuantity, decreaseQuantity, clearCart, removeFromCart } from "./cart.js";
import { getCurrentUser } from "./auth.js";

const cartItems =
    document.querySelector("#cartItems");

const totalPrice =
    document.querySelector("#totalPrice");

const clearCartButton =
    document.querySelector("#clearCart");


function renderCart() {
    if (!getCurrentUser()) {
        cartItems.innerHTML = `
            <h2>Войдите, чтобы пользоваться корзиной</h2>
            <a href="./auth.html" class="link">
                Войти / Регистрация
            </a>
        `;

        totalPrice.textContent = "0";
        clearCartButton.classList.add("hidden");

        return;
    }

    clearCartButton.classList.remove("hidden");

    const cart = getCart();

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<h2>Корзина пустая</h2>";

        totalPrice.textContent = "0";

        return;
    }

    let total = 0;

    cart.forEach(function(item) {
        const element = document.createElement("div");

        element.classList.add("cart-item");

        element.innerHTML = `
            <img
                src="${item.thumbnail}"
                alt="${item.title}"
            >

            <div class="cart-info">

                <h3>
                    ${item.title}
                </h3>

                <p>
                    Цена: $${item.price}
                </p>

            </div>


            <div class="cart-actions">

                <button
                    class="minus"
                    data-id="${item.id}"
                >
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    class="plus"
                    data-id="${item.id}"
                >
                    +
                </button>

                <button
                    class="delete"
                    data-id="${item.id}"
                >
                    Удалить
                </button>

            </div>
        `;


        cartItems.append(element);


        total +=
            item.price * item.quantity;
    });

    totalPrice.textContent = total.toFixed(2);
}

cartItems.addEventListener(
    "click",
    function(event) {

        const id =
            Number(event.target.dataset.id);
        if (
            event.target.classList.contains("plus")
        ) {

            increaseQuantity(id);

            renderCart();
        }


        if (
            event.target.classList.contains("minus")
        ) {

            decreaseQuantity(id);

            renderCart();
        }


        if (
            event.target.classList.contains("delete")
        ) {

            removeFromCart(id);

            renderCart();
        }
    }
);


clearCartButton.addEventListener(
    "click",
    () => {

        clearCart();

        renderCart();

    }
);

renderCart();