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
    [Authorize]
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

    [HttpPost]
    // [Authorize]
    public IActionResult CreateOrder(Order order)
    {
        order.OrderDate = DateTime.Now;
        order.Driver = _dbContext.UserProfiles.FirstOrDefault(u => u.Id == order.DriverId);
        order.Employee = _dbContext.UserProfiles.FirstOrDefault(u => u.Id == order.EmployeeId);
        _dbContext.Orders.Add(order);
        _dbContext.SaveChanges();
        return Created($"/api/order/{order.Id}", order);
    }
}
