const apiUrl = "/api/userProfile";

export const getUsers = () =>
{
    return fetch(apiUrl).then((res) => res.json())
};

export const getUserById = (id) => 
{
    return fetch(`${apiUrl}/${id}`).then((res) => res.json());
}

export const createUser =  (user) => {
    const res = fetch(apiUrl, {
      method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
    });
    return res.json();
};