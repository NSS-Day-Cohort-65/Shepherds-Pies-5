import { useEffect, useState } from "react";
import { addPizza } from "../../managers/pizzaManager.js"
import { getToppings } from "../../managers/toppingManager.js";
import { useParams } from "react-router-dom";

export default function AddPizzaForm() {
    const [pizza, setPizza] = useState({
        pizzaSizeId: 1,
        pizzaCheeseId: 1,
        pizzaSauceId: 1,
        pizzaTopping: [],
        // toppings: [],
    });
    const { id } = useParams();
    const [toppings, setToppings] = useState([]);
    useEffect(() => {
        getToppings().then(setToppings);
    }, []);

    const handlePizzaSizeChange = (event) => {
        const sizeId = parseInt(event.target.value);
        setPizza({ ...pizza, pizzaSizeId: sizeId });
    };

    const handlePizzaCheeseChange = (event) => {
        const cheeseId = parseInt(event.target.value);
        setPizza({ ...pizza, pizzaCheeseId: cheeseId });
    };

    const handlePizzaSauceChange = (event) => {
        const sauceId = parseInt(event.target.value);
        setPizza({ ...pizza, pizzaSauceId: sauceId });
    };

    const handleToppingChange = (event) => {
        const toppingId = parseInt(event.target.value);
        const isChecked = event.target.checked;

        if (isChecked) {
            setPizza({ ...pizza, pizzaTopping: [...pizza.pizzaTopping, toppingId] });
        } else {
            setPizza({
                ...pizza,
                pizzaToppings: pizza.pizzaTopping.filter((id) => id !== toppingId),
            });
        }
    };

    const handleSubmit = () => {

        addPizza(id, pizza)
        // .then(() => {

        // });
    };

    return (
        <div>
            <h2>Add Pizza</h2>
            <div>
                <label htmlFor="pizzaSize">Pizza Size:</label>
                <select id="pizzaSize" onChange={handlePizzaSizeChange}>
                    <option value="1">Small</option>
                    <option value="2">Medium</option>
                    <option value="3">Large</option>
                </select>
            </div>

            <div>
                <label htmlFor="pizzaCheese">Pizza Cheese:</label>
                <select id="pizzaCheese" onChange={handlePizzaCheeseChange}>
                    <option value="1">Buffalo Mozzarella</option>
                    <option value="2">Four Cheese</option>
                    <option value="3">Vegan</option>
                    <option value="4">None</option>
                </select>
            </div>

            <div>
                <label htmlFor="pizzaSauce">Pizza Sauce:</label>
                <select id="pizzaSauce" onChange={handlePizzaSauceChange}>
                    <option value="1">Marinara</option>
                    <option value="2">Arrabbiata</option>
                    <option value="3">Garlic White</option>
                    <option value="4">None</option>
                </select>
            </div>

            <div>
                <label>Toppings:</label>
                {toppings.map((topping) => (
                    <div key={topping.id}>
                        <input
                            type="checkbox"
                            id={`topping-${topping.id}`}
                            value={topping.id}
                            onChange={handleToppingChange}
                        />
                        <label htmlFor={`topping-${topping.id}`}>{topping.title}</label>
                    </div>
                ))}
            </div>

            <button onClick={handleSubmit}>Add Pizza</button>
        </div>
    );
}
