export function renderProducts(products) {
    const container = document.querySelector("#products");

    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "Товары не найдены...";
        return;
    }

    products.forEach(function (product) {
        const card = document.createElement("div");
        card.classList.add("product");

        card.innerHTML = `
            <img
                src="${product.thumbnail}"
                alt="${product.title}"
            >

            <h3>${product.title}</h3>

            <p>
                Категория: ${product.category}
            </p>

            <p>
                ⭐ ${product.rating}
            </p>

            <p class="product-price">
                $${product.price}
            </p>

            <button
                class="add-cart"
                data-id="${product.id}"
            >
                В корзину
            </button>

            <button
                class="favorite-btn"
                data-id="${product.id}">
                ❤️
            </button>
            <button
                class="details-btn"
                data-id="${product.id}">
            Быстрый просмотр
            </button>
        `;
        container.append(card);
    });
}


export function showProductDetails(product) {
    const productModal = document.querySelector("#productModal");
    const productDetails = document.querySelector("#productDetails");

    productModal.classList.add("active");
    document.body.classList.add("modal-open");
    console.log(product);
    productDetails.innerHTML = `
            <img
                src="${product.thumbnail}"
                alt="${product.title}"
            >

            <h3>${product.title}</h3>

            <p>
                Категория: ${product.category}
            </p>

            <p>
                ⭐ ${product.rating}
            </p>

            <p class="product-price">
                $${product.price}
            </p>

            <p>${product.description}</p>

            

            <button
                class="add-cart"
                data-id="${product.id}"
            >
                В корзину
            </button>

            <button
                class="favorite-btn"
                data-id="${product.id}">
                ❤️
            </button>
    `;
    let reviews = product.reviews || [];
    reviews.forEach(function(review) {
        let reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `
            <p>Пользователь: ${review.reviewerName}</p>
            <p>Почта: ${review.reviewerEmail}</p>
            <p>${review.comment}</p>
            <p>Оценка: ${review.rating}</p>
        `;
        productDetails.append(reviewElement);
    });
}