using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
namespace ShepherdsPies.Controllers;
using ShepherdsPies.Models;
using ShepherdsPies.Data;

[ApiController]
[Route("api/[controller]")]
public class ToppingController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public ToppingController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }
    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        return Ok(_dbContext.Toppings.ToList());
    }

}
