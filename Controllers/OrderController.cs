using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
namespace ShepherdsPies.Controllers;
using ShepherdsPies.Models;
using ShepherdsPies.Data; 

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public OrderController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }
    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        return Ok(_dbContext.Orders.ToList());
    }
    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetById(int id)
    {
        Order order = _dbContext
            .Orders
            .Include(o => o.Employee)
            .Include(o => o.Driver)
            .Include(o => o.Pizzas)
            .ThenInclude(p => p.PizzaSize)
            .Include(o => o.Pizzas)
            .ThenInclude(p => p.PizzaSauce)
            .Include(o => o.Pizzas)
            .ThenInclude(p => p.PizzaCheese)
            .Include(o => o.Pizzas)
            .ThenInclude(p => p.PizzaToppings)
            .ThenInclude(pt => pt.Topping)
            .SingleOrDefault(o => o.Id == id);

        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);
    }
    //^ ENDPOINT = this endpoint is used to delete an order from the list of orders 
    [HttpDelete("{id}")]
    // [Authorize]
    public IActionResult DeleteOrder(int id)
    {
        // Find the work order by its ID
        Order orderToDelete = _dbContext.Orders.SingleOrDefault(o => o.Id == id);

        if (orderToDelete == null)
        {
            // If the work order with the specified ID does not exist, return a "Not Found" response
            return NotFound();
        }

        // Remove the work order from the database
        _dbContext.Orders.Remove(orderToDelete);
        _dbContext.SaveChanges();

        // Return a "No Content" response to indicate successful deletion
        return NoContent();
    }
}
