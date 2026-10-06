import { getCurrentUser } from "./auth.js";

function getFavorites() {
    const user = getCurrentUser();

    if (!user) {
        return [];
    }

    const key = "favorites_" + user.id;

    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveFavorites(favorites) {
    const user = getCurrentUser();

    if (!user) {
        return;
    }

    const key = "favorites_" + user.id;

    localStorage.setItem(key, JSON.stringify(favorites));
}


export function addToFavorites(product) {
    if (!getCurrentUser()) {
        alert("Сначала войдите в аккаунт!");
        return;
    }

    const favorites = getFavorites();
    console.log(favorites)
    let favorite = favorites.find(function(item) {
        return item.id === product.id;
    });


    if (favorite) {
        alert("Товар уже находится в избранном!");
        return;
    }


    favorites.push(product);

    saveFavorites(favorites);
    alert("Товар добавлен в избранное!");

    console.log(favorites);
}


export function removeFromFavorites(id) {
    const favorites = getFavorites();

    let updatedFavorites = favorites.filter(function(item) {
        return item.id !== id;
    });

    saveFavorites(updatedFavorites);
}

export function renderFavorites() {
    const favorites = getFavorites();

    const favoritesBlock = document.querySelector("#favorites");

    favoritesBlock.innerHTML = "";


    if (favorites.length === 0) {

        favoritesBlock.innerHTML =
            "<h2>Избранных товаров пока нет</h2>";

        return;
    }


    favorites.forEach(function(product) {

        let card = document.createElement("div");

        card.classList.add("product");


        card.innerHTML = `
            <img
                src="${product.thumbnail}"
                alt="${product.title}"
            >

            <h3>
                ${product.title}
            </h3>

            <p>
                ${product.category}
            </p>

            <p class="product-price">
                $${product.price}
            </p>

            <button
                class="remove-favorite"
                data-id="${product.id}">
                Удалить
            </button>

            <button
                class="add-cart"
                data-id="${product.id}">
                Добавить в корзину
            </button>
        `;


        favoritesBlock.append(card);
    });
}