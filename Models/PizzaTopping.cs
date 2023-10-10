using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ShepherdsPies.Models;

public class PizzaTopping
{
    public int Id { get; set; }
    public int ToppingId { get; set; }
    public Topping Topping { get; set; }
    public int PizzaId { get; set; }
    public Pizza Pizza { get; set; }
}

