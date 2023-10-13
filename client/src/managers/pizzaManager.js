
export const assignTopping = (pizzaId, toppingId) => {
    return fetch(`/api/topping/${pizzaId}/assignTopping?toppingId=${toppingId}`, {
        method: "POST",
    });
};

export const unassignTopping = (pizzaId, toppingId) => {
    return fetch(
        `/api/topping/${pizzaId}/unassignTopping?toppingId=${toppingId}`,
        {
            method: "POST",
        }
    );
};
export const getPizza = (id) => {
    return fetch(`/api/pizza/${id}`).then((res) => res.json());
};
//update pizza
export const updatePizza = (id, pizza) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pizza),
    });
};