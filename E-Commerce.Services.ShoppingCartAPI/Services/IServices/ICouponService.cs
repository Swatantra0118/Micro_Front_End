using E_Commerce.Services.ShoppingCartAPI.Models.DTO;

namespace E_Commerce.Services.ShoppingCartAPI.Services.IServices
{
    public interface ICouponService
    {
        Task<CouponDto> GetCoupon(string couponCode);
    }
}
