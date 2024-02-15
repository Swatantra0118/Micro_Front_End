using E_Commerce.Services.ShoppingCartAPI.Models.DTO;
using E_Commerce.Services.ShoppingCartAPI.Services.IServices;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace E_Commerce.Services.ShoppingCartAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ProductService(IHttpClientFactory httpClientFactory)
        {
            this._httpClientFactory = httpClientFactory;
        }
        public async Task<IEnumerable<ProductDto>> GetProducts()
        {
            var client  = _httpClientFactory.CreateClient("Product");
            var response = await client.GetAsync($"/api/product");
            var apiContent = await response.Content.ReadAsStringAsync();
            var resp =  JsonConvert.DeserializeObject<ResponseDto>(apiContent);
            if(resp.IsSuccess)
            {
                return JsonConvert.DeserializeObject<IEnumerable<ProductDto>>(Convert.ToString(resp.Result));
            }
            return new List<ProductDto>();
        }
    }
}
