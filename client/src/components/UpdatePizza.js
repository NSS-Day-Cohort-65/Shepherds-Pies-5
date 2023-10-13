import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getCheeses,
    getSauces,
    getSizes,
    getToppings,
} from "../../managers/optionManager";
import {
    assignTopping,
    getPizza,
    unassignTopping,
    updatePizza,
} from "../../managers/pizzaManager";
import { Button } from "reactstrap";
import { getMatchingPizzaToppings } from "../../managers/pizzaToppingsManager";

export const EditPizza = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cheeseList, setCheeseList] = useState([]);
    const [toppingList, setToppingList] = useState([]);
    const [sauceList, setSauceList] = useState([]);
    const [sizeList, setSizeList] = useState([]);
    const [newPizza, setNewPizza] = useState({});
    const [matchingToppings, setMatchingToppings] = useState([]);

    function getData() {
        getCheeses().then(setCheeseList);
        getToppings().then(setToppingList);
        getSauces().then(setSauceList);
        getSizes().then(setSizeList);
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getPizza(parseInt(id)).then(setNewPizza);
        getMatchingPizzaToppings(id).then(setMatchingToppings);
    }, [id]);

    async function getUpdatedPizzaToppings() {
        getMatchingPizzaToppings(id).then(setMatchingToppings);
    }

    const handleCheeseChange = (event) => {
        const selectedCheeseId = parseInt(event.target.value);
        setNewPizza((prevState) => ({
            ...prevState,
            cheeseId: selectedCheeseId,
            cheese: cheeseList.find((c) => c.id === selectedCheeseId),
        }));
    };
    const handleSauceChange = (event) => {
        const selectedSauceId = parseInt(event.target.value);
        setNewPizza((prevState) => ({
            ...prevState,
            sauceId: selectedSauceId,
            sauce: sauceList.find((s) => s.id === selectedSauceId),
        }));
    };
    const handleSizeChange = (event) => {
        const selectedSizeId = parseInt(event.target.value);
        setNewPizza((prevState) => ({
            ...prevState,
            pizzaSizeId: selectedSizeId,
            pizzaSize: sizeList.find((s) => s.id === selectedSizeId),
        }));
    };

    const handleToppingCheckbox = async (toppingId) => {
        const matchingToppingIndex = matchingToppings.findIndex(
            (mt) => mt.toppingId === toppingId
        );

        if (matchingToppingIndex !== -1) {
            // If the topping exists in matchingToppings, unassign it
            await unassignTopping(parseInt(id), toppingId);
            setMatchingToppings((prevMatchingToppings) =>
                prevMatchingToppings.filter((mt) => mt.toppingId !== toppingId)
            );
        } else {
            // If the topping doesn't exist in matchingToppings, assign it
            await assignTopping(parseInt(id), toppingId);
            setMatchingToppings((prevMatchingToppings) => [
                ...prevMatchingToppings,
                { pizzaId: id, toppingId: toppingId },
            ]);
        }
    };
    //first get the list of all toppings.

    const handleSubmitButton = () => {
        updatePizza(parseInt(id), newPizza).then(() => {
            navigate(`/orders`);
        });
    };

    if (!newPizza) {
        return "";
    }

    return (
        <>
            <h1>Update Pizza</h1>
            <div>
                <h4>Change Selected Cheese</h4>
                <select
                    name="cheeselist"
                    onChange={(e) => {
                        handleCheeseChange(e);
                    }}
                    value={newPizza?.cheese?.id}
                >
                    <option value="">Select Cheese</option>
                    {cheeseList.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h4>Change Selected Size</h4>
                <div>
                    <select
                        name="sizelist"
                        onChange={handleSizeChange}
                        value={newPizza?.pizzaSize?.id}
                    >
                        <option value="">Select Size</option>
                        {sizeList.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <h4>Change Selected Sauce</h4>
                <div>
                    <select
                        name="sauceList"
                        onChange={handleSauceChange}
                        value={newPizza?.sauce?.id}
                    >
                        <option value="">Select Sauce</option>
                        {sauceList.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <h4>Select Toppings</h4>
                <div className="toppingsContainer">
                    {toppingList.map((topping) => (
                        <div key={topping.id}>
                            <input
                                type="checkbox"
                                onChange={() => handleToppingCheckbox(topping.id)}
                                checked={matchingToppings.some((mt) => mt.toppingId === topping.id)}
                            />
                            <label className="toppingLabel">{topping.name}</label>
                        </div>
                    ))}
                </div>
                <Button
                    onClick={() => {
                        handleSubmitButton();
                    }}
                >
                    Submit Pizza!
                </Button>
            </div>
        </>
    );
};

// [HttpPut("{id}")]
//   [Authorize]
  
//   public IActionResult editPizza(int id, Pizza pizza)
//   {
//     Pizza pizzaToUpdate = _dbContext.Pizzas.SingleOrDefault(p => p.Id == id);

//     if(pizzaToUpdate == null)
//     {
//       return NotFound();
//     }
//     //properties that we are changing.
//     pizzaToUpdate.CheeseId = pizza.CheeseId;
//     pizzaToUpdate.SauceId = pizza.SauceId;
//     pizzaToUpdate.PizzaSizeId = pizza.PizzaSizeId;
//     _dbContext.SaveChanges();
//     return NoContent();
//   }
