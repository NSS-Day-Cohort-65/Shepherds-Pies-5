const apiUrl = "/api/order";

export const getOrders = () =>
{
    return fetch(apiUrl).then((res) => res.json())
};

export const getOrderById = (id) => 
{
    return fetch(`${apiUrl}/${id}`).then((res) => res.json());
}

export const createOrder =  (order) => {
    return fetch(apiUrl, {
      method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
    }).then((res) => res.json());
};