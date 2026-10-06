import { getProducts } from "./api.js";
import { renderProducts, showProductDetails } from "./products.js";
import { addToCart, getCartCount } from "./cart.js";
import { addToFavorites, removeFromFavorites, renderFavorites } from "./favorites.js";


let products = []

const searchInput =
    document.querySelector("#searchInput");

const categorySelect =
    document.querySelector("#categorySelect");

const productsContainer =
    document.querySelector("#products");

const message =
    document.querySelector("#message");

const cartCount =
    document.querySelector("#cartCount");

const favoritesBtn = document.querySelector("#favoritesBtn");

const favoritesModal = document.querySelector("#favoritesModal");

const closeFavorites = document.querySelector("#closeFavorites");

let contactModal = document.getElementById("contactModal");

let nameInput =
    document.getElementById("nameInput");

let emailInput =
    document.getElementById("emailInput");

let messageInput =
    document.getElementById("messageInput");

let sendBtn =
    document.getElementById("sendBtn");

let contactBtn = document.getElementById("contactBtn");

let closeContact = document.getElementById("closeContact");

const productModal = document.querySelector("#productModal");

const closeProduct = document.querySelector("#closeProduct");


async function start() {

    message.textContent = "Загрузка товаров...";
    
    products = await getProducts()

    message.textContent = "";

    renderProducts(products);
    renderCategories();
    updateCartCount();
}

function renderCategories() {
    let categories = [];

    products.forEach(function(product) {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    categories.forEach(function(category) {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.append(option);
    });
}

function filterProducts() {
    const search = searchInput.value.toLowerCase();

    const category = categorySelect.value;

    const filtered = products.filter(function(product) {
        const matchSearch = product.title.toLowerCase().includes(search);
        const matchCategory = category === "all" || product.category === category;

        return (matchSearch && matchCategory);
    });

    renderProducts(filtered);
}

function updateCartCount() {
    cartCount.textContent = getCartCount();
}


searchInput.addEventListener("input", filterProducts);

categorySelect.addEventListener("change", filterProducts);

productsContainer.addEventListener("click", function (event) {
    const id = Number(event.target.dataset.id);
    if (event.target.classList.contains("add-cart")) {
        
        const product = products.find(function(prod) {
            return prod.id === id;
        })

        if (product) {
            addToCart(product);
            updateCartCount();
        }
    }

    if (event.target.classList.contains("favorite-btn")) {

        let product = products.find(function(product) {
            return product.id === id;
        });

        if (product) {
            addToFavorites(product);
        }
    }
    if (event.target.classList.contains("details-btn")) {

        let product = products.find(function(product) {
            return product.id === id;
        });

        if (product) {
            showProductDetails(product);
        }
    }
});


contactBtn.addEventListener("click", function() {
    contactModal.classList.add("active");
    document.body.classList.add("modal-open");
})

closeContact.addEventListener("click", function() {
    contactModal.classList.remove("active");
})

contactModal.addEventListener("click", function(event) {
    if (event.target === contactModal) {
        contactModal.classList.remove("active");
        document.body.classList.remove("modal-open");
    }
})

sendBtn.addEventListener("click", function() {

    if (
        nameInput.value === "" ||
        emailInput.value === "" ||
        messageInput.value === ""
    ) {

        alert("Заполните все поля!");

        return;
    }


    alert("Сообщение отправлено!");


    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";


    contactModal.classList.remove("active");

});


favoritesBtn.addEventListener("click", function() {
    favoritesModal.classList.add("active");
    document.body.classList.add("modal-open");
    renderFavorites();
});

closeFavorites.addEventListener("click", function() {
    favoritesModal.classList.remove("active");
    document.body.classList.remove("modal-open");
});

favoritesModal.addEventListener("click", function(event) {
    if (event.target === favoritesModal) {
        favoritesModal.classList.remove("active");
        document.body.classList.remove("modal-open");
    }
    if (event.target.classList.contains("remove-favorite")) {
        const id = Number(event.target.dataset.id);
        removeFromFavorites(id);
        renderFavorites();
    }
    if (event.target.classList.contains("add-cart")) {
        const id = Number(event.target.dataset.id);
        const product = products.find(function(prod) {
            return prod.id === id;
        })

        if (product) {
            addToCart(product);
            updateCartCount();
        }
    }
});


closeProduct.addEventListener("click", function() {
    productModal.classList.remove("active");
    document.body.classList.remove("modal-open");
});

productModal.addEventListener("click", function(event) {
    if (event.target === productModal) {
        productModal.classList.remove("active");
        document.body.classList.remove("modal-open");
    }
    if (event.target.classList.contains("add-cart")){
        const id = Number(event.target.dataset.id)
        
        const product = products.find(function(prod) {
            return prod.id === id;
        })
        
        if (product) {
            addToCart(product);
            updateCartCount();
        }
    }
    if (event.target.classList.contains("favorite-btn")) {
        const id = Number(event.target.dataset.id)
        
        let product = products.find(function(product) {
            return product.id === id;
        });

        if (product) {
            addToFavorites(product);
        }
    }
});


window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        contactModal.classList.remove("active");
        favoritesModal.classList.remove("active");
        productModal.classList.remove("active");
        document.body.classList.remove("modal-open");
    }
});


start();