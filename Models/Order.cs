using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ShepherdsPies.Models;

public class Order
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public int? DriverId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal? Tip { get; set; }
    public int? TableNumber { get; set; }    
    public List<Pizza> Pizzas { get; set; }
    [ForeignKey("DriverId")]
    public UserProfile Driver { get; set; }
    
    [ForeignKey("EmployeeId")]
    public UserProfile Employee { get; set; }

}