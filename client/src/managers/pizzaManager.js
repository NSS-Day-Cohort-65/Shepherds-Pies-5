const apiUrl = "/api/pizza";

export const addPizza = (id, pizza) => {
    return fetch(`${apiUrl}/${id}/addpizza`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pizza),
    })
        .then((response) => {
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

