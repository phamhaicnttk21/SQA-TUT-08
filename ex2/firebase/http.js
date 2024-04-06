import axios from 'axios';

const BACKEND_URL =
    'https://pizzaordering-ec61e-default-rtdb.asia-southeast1.firebasedatabase.app/';

export async function storeOrder(data) {
    await axios.post(BACKEND_URL + '/order.json', data);
}

export async function fetchPizzaSizes() {
    const response = await axios.get(BACKEND_URL + '/pizza/sizes.json');

    const sizes = [];

    for (const key in response.data) {
        const size = {
            id: key,
            name: response.data[key].name,
            price: response.data[key].price
        };
        sizes.push(size);
    }

    return sizes;
}

export async function fetchPizzaToppings() {
    const response = await axios.get(BACKEND_URL + '/pizza/toppings.json');

    const toppings = [];

    for (const key in response.data) {
        const topping = {
            id: key,
            name: response.data[key].name,
            price: response.data[key].price
        };
        toppings.push(topping);
    }

    return toppings;
}

