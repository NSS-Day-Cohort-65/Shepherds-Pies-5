const _apiUrl = "/api/PizzaTopping";

export const getMatchingPizzaToppings = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};