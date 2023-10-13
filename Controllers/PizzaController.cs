using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
namespace ShepherdsPies.Controllers;
using ShepherdsPies.Models;
using ShepherdsPies.Data;

[ApiController]
[Route("api/[controller]")]
public class PizzaController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public PizzaController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }
    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        return Ok(_dbContext.Pizzas.ToList());
    }
    // [HttpPost("{id}/addpizza")]
    // public IActionResult AddAPizza(int id, Pizza pizza)
    // {
    //     var order = _dbContext.Orders.FirstOrDefault(o => o.Id == id);

    //     if (order == null)
    //     {
    //         return NotFound();
    //     }

    //     // Create a new Pizza entity
    //     var newPizza = new Pizza
    //     {
    //         PizzaSizeId = pizza.PizzaSizeId,
    //         PizzaCheeseId = pizza.PizzaCheeseId,
    //         PizzaSauceId = pizza.PizzaSauceId,
    //         OrderId = id
    //     };

    //     if (pizza.PizzaToppings != null && pizza.PizzaToppings.Any())
    //     {
    //         foreach (var toppingId in pizza.PizzaToppings)
    //         {
    //             var topping = _dbContext.Toppings.Find(toppingId);
    //             if (topping != null)
    //             {
    //                 newPizza.PizzaToppings.Add(new PizzaTopping { Topping = topping });
    //             }
    //         }
    //     }

    //     _dbContext.Pizzas.Add(newPizza);
    //     _dbContext.SaveChanges();

    //     return Ok(newPizza);
    // }




    [HttpPost("{id}/addpizza")]
    // [Authorize]
    public IActionResult AddAPizza(int id, Pizza pizza)
    {
        var order = _dbContext
            .Orders.FirstOrDefault(o => o.Id == id);

        if (order == null)
        {
            return NotFound();
        }
        pizza.OrderId = id;
        _dbContext.Pizzas.Add(pizza);
        _dbContext.SaveChanges();

        return Ok(pizza);
    }

    // [HttpPut("{id}/update")]
    // // [Authorize]
    // public IActionResult UpdateAPizza(int id, [FromBody] Pizza updatedPizza)
    // {
    //     var existingPizza = _dbContext.Pizzas.Include(p => p.PizzaToppings)
    //     .FirstOrDefault(p => p.Id == id);
    //     if (existingPizza == null)
    //     {
    //         return NotFound("Pizza does not exist");
    //     }
    //     existingPizza.PizzaSizeId = updatedPizza.PizzaSizeId;
    //     existingPizza.PizzaCheeseId = updatedPizza.PizzaCheeseId;
    //     existingPizza.PizzaSauceId = updatedPizza.PizzaSauceId;
    //     existingPizza.PizzaToppings = updatedPizza.PizzaToppings;

    //     existingPizza.PizzaToppings.Clear();
    //     if (updatedPizza.PizzaToppings != null)
    //     {
    //         foreach (var toppingId in updatedPizza.PizzaToppings)
    //         {
    //             var topping = _dbContext.Toppings.Find(toppingId);
    //             if (topping != null)
    //             {
    //                 existingPizza.PizzaToppings.Add(new PizzaTopping { Topping = topping });
    //             }
    //         }
    //     }

    //     _dbContext.SaveChanges();

    //     return Ok(existingPizza);
    // }
}
