
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
const apiUrl = "/api/pizza";

export const addPizza = (id, pizza) => {
    console.log(id)

    return fetch(`${apiUrl}/${id}/addpizza`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pizza),
    })
        .then((response) => {
            console.log(response)
            console.log('Response status:', response.status); // Log the status code

            if (!response.ok) {
                console.log('Response text:', response.text()); // Log the response text
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch((error) => {
            console.log('Error:', error); // Log the error
            throw error;
        });
}


// export const addPizza = (id, pizza) => {
//     return fetch(`${apiUrl}/${id}/addpizza`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(pizza),
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .catch((error) => {
//             throw error;
//         });
// }

// export const updatePizza = (id, updatedPizza) => {
//     return fetch(`${apiUrl}/${id}/update`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedPizza),
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .catch((error) => {
//             throw error;
//         });
// }

