using E_Commerce.Services.ShoppingCartAPI.Models.DTO;

namespace E_Commerce.Services.ShoppingCartAPI.Services.IServices
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetProducts();
    }
}
