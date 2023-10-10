using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ShepherdsPies.Models;

public class Topping
{
    public int Id { get; set; }
    public string Title { get; set; }
    public decimal Price { get; set; }

}