using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ShepherdsPies.Models;

public class PizzaCheese
{
    public int Id { get; set; }
    public string Title { get; set; }

}