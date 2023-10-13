const apiUrl = "/api/topping";

export const getToppings = () => {
    return fetch(apiUrl).then((res) => res.json())
};

