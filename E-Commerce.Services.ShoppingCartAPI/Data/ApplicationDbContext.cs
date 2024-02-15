using E_Commerce.Services.ShoppingCartAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Services.ShoppingCartAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<CartHeader> CartHeader { get; set; }
        public DbSet<CartDetails> CartDetails { get; set; } 
     
    }
}
