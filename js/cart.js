let cart = JSON.parse(localStorage.getItem("cart")) || [];
// localStorage.clear();
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
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

    saveCart();
}

export function getCartCount() {
    // return cart.reduce(function (sum, item) {
    //     return sum + item.quantity;
    // }, 0);

    let count = 0;

    cart.forEach(function(item) {
        count += item.quantity;
    });
    console.log(count);
    return count;
}

export function getCart() {
    return cart;
}

export function increaseQuantity(id) {

    const item = cart.find(
        item => item.id === id
    );

    if (item) {
        item.quantity++;
    }

    saveCart();
}


export function decreaseQuantity(id) {

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


    saveCart();
}


export function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();
}


export function clearCart() {

    cart = []

    saveCart();
}