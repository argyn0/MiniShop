import { getCurrentUser } from "./auth.js";

// let cart = JSON.parse(localStorage.getItem("cart")) || [];
// localStorage.clear();
function saveCart(cart) {
    const user = getCurrentUser();

    if (!user) {
        return;
    }

    const key = "cart_" + user.id;

    localStorage.setItem(key, JSON.stringify(cart));
}

export function addToCart(product) {
    if (!getCurrentUser) {
        alert("Сначала войдите в аккаунт!");
        return;
    }

    const cart = getCart();

    const item = cart.find(function (item) {
        return item.id === product.id;
    });
    if (item) {
        item.quantity++;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1
        });
    }

    saveCart(cart);
}

export function getCartCount() {
    // return cart.reduce(function (sum, item) {
    //     return sum + item.quantity;
    // }, 0);

    const cart = getCart();

    let count = 0;

    cart.forEach(function(item) {
        count += item.quantity;
    });
    console.log(count);
    return count;
}

export function getCart() {
    const user = getCurrentUser();

    if (!user) {
        return [];
    }

    const key = "cart_" + user.id;

    return JSON.parse(localStorage.getItem(key)) || [];
}

export function increaseQuantity(id) {
    const cart = getCart();

    const item = cart.find(
        item => item.id === id
    );

    if (item) {
        item.quantity++;
    }

    saveCart(cart);
}


export function decreaseQuantity(id) {
    const cart = getCart();

    const item = cart.find(
        item => item.id === id
    );

    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;
    }


    saveCart(cart);
}


export function removeFromCart(id) {
    const cart = getCart();

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart(cart);
}


export function clearCart() {
    saveCart([]);
}