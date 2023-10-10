using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ShepherdsPies.Models;

public class Pizza
{
    public int Id { get; set; }
    public int PizzaSizeId { get; set; }
    public PizzaSize PizzaSize {get; set; }
    public int PizzaCheeseId { get; set; }
    public PizzaCheese PizzaCheese { get; set; }
    public int PizzaSauceId { get; set; }
    public PizzaSauce PizzaSauce {get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; }
    public List<PizzaTopping> PizzaToppings { get; set; }
}