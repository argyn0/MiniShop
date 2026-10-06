const API_URL = "https://dummyjson.com/products";

export async function getProducts() {
    try {
        const responce = await fetch(`${API_URL}?limit=100`);

        if (!responce.ok) {
            throw new Error("Ошибка выгрузки данных");
        }

        const data = await responce.json()

        return data.products;
    } catch (error){
        console.log(error);
        return [];
    }
}