using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ShepherdsPies.Models;
using Microsoft.AspNetCore.Identity;

namespace ShepherdsPies.Data;
public class ShepherdsPiesDbContext : IdentityDbContext<IdentityUser> //# ShepherdsPiesDbContext inherits from the IdentityDbContext<IdentityUser> class, rather than from DbContext
//# IdentityDbContext comes with a number of extra models and tables that will be added to the database. They include:
//# IdentityUser - this will hold login credentials for users
//# IdentityRole - this will hold the various roles that a use can have
//# IdentityUserRole - a many-to-many table between roles and users. These define which users have which roles.

{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Pizza> Pizzas { get; set; }
    public DbSet<PizzaCheese> PizzaCheeses { get; set; }
    public DbSet<PizzaSauce> PizzaSauces { get; set; }
    public DbSet<PizzaTopping> PizzaToppings { get; set; }
    public DbSet<PizzaSize> PizzaSizes { get; set; }
    public DbSet<Topping> Toppings { get; set; }
    public DbSet<Order> Orders { get; set; }

    public ShepherdsPiesDbContext(DbContextOptions<ShepherdsPiesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); //# this is a method

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole //# seeding the database with the identityrole information
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser //# seeding the database with the identityuser information
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        });

        modelBuilder.Entity<Topping>().HasData(new Topping[]
        {
            new Topping {Id = 1, Title = "Sausage", Price = 0.50M},
            new Topping {Id = 2, Title = "Pepperoni", Price = 0.50M},
            new Topping {Id = 3, Title = "Mushroom", Price = 0.50M},
            new Topping {Id = 4, Title = "Onion", Price = 0.50M},
            new Topping {Id = 5, Title = "Green Pepper", Price = 0.50M},
            new Topping {Id = 6, Title = "Black Olive", Price = 0.50M},
            new Topping {Id = 7, Title = "Basil", Price = 0.50M},
            new Topping {Id = 8, Title = "Extra Cheese", Price = 0.50M}
        });
        
        modelBuilder.Entity<Pizza>().HasData(new Pizza[]
        {
            new Pizza {Id = 1, PizzaSizeId = 1, PizzaCheeseId = 1, PizzaSauceId = 1, OrderId = 1},
            new Pizza {Id = 2, PizzaSizeId = 2, PizzaCheeseId = 3, PizzaSauceId = 4, OrderId = 2},
            new Pizza {Id = 3, PizzaSizeId = 3, PizzaCheeseId = 2, PizzaSauceId = 3, OrderId = 1},
            new Pizza {Id = 4, PizzaSizeId = 2, PizzaCheeseId = 4, PizzaSauceId = 2, OrderId = 2},
            new Pizza {Id = 5, PizzaSizeId = 1, PizzaCheeseId = 2, PizzaSauceId = 1, OrderId = 1}

        });

          modelBuilder.Entity<PizzaTopping>().HasData(new PizzaTopping[]
        {
            new PizzaTopping {Id = 1, PizzaId = 1, ToppingId = 1},
            new PizzaTopping {Id = 2, PizzaId = 1, ToppingId = 2},
            new PizzaTopping {Id = 3, PizzaId = 2, ToppingId = 3},
            new PizzaTopping {Id = 4, PizzaId = 2, ToppingId = 4},
            new PizzaTopping {Id = 5, PizzaId = 3, ToppingId = 5},
            new PizzaTopping {Id = 6, PizzaId = 3, ToppingId = 6},
            new PizzaTopping {Id = 7, PizzaId = 4, ToppingId = 7},
            new PizzaTopping {Id = 8, PizzaId = 4, ToppingId = 8},
            new PizzaTopping {Id = 9, PizzaId = 5, ToppingId = 8},
            new PizzaTopping {Id = 10, PizzaId = 5, ToppingId = 2}

        });
        
         modelBuilder.Entity<PizzaSize>().HasData(new PizzaSize[]
        {
            new PizzaSize {Id = 1, Title = "Small", Price = 10.00M},
            new PizzaSize {Id = 2, Title = "Medium", Price = 12.00M},
            new PizzaSize {Id = 3, Title = "Large", Price = 15.00M},
        });
        
        modelBuilder.Entity<PizzaCheese>().HasData(new PizzaCheese[]
        {
            new PizzaCheese {Id = 1, Title = "Buffalo Mozzarella"},
            new PizzaCheese {Id = 2, Title = "Four Cheese"},
            new PizzaCheese {Id = 3, Title = "Vegan"},
            new PizzaCheese {Id = 4, Title = "None"},
        });
        
        modelBuilder.Entity<PizzaSauce>().HasData(new PizzaSauce[]
        {
            new PizzaSauce {Id = 1, Title = "Marinara"},
            new PizzaSauce {Id = 2, Title = "Arrabbiata"},
            new PizzaSauce {Id = 3, Title = "Garlic White"},
            new PizzaSauce {Id = 4, Title = "None"}
        });
         modelBuilder.Entity<Order>().HasData(new Order[]
        {
            new Order {Id = 1, EmployeeId = 1, DriverId = 1, OrderDate =  DateTime.Now, TableNumber = null, Tip = null},
            new Order {Id = 2, EmployeeId = 1, DriverId = null, OrderDate =  DateTime.Now, TableNumber = 1, Tip = null},
        });

    }
}


