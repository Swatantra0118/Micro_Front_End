using AutoMapper;
using E_Commerce.Services.ShoppingCartAPI.Data;
using E_Commerce.Services.ShoppingCartAPI.Models;
using E_Commerce.Services.ShoppingCartAPI.Models.DTO;
using E_Commerce.Services.ShoppingCartAPI.RabbitMQSender;
using E_Commerce.Services.ShoppingCartAPI.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.PortableExecutable;

namespace E_Commerce.Services.ShoppingCartAPI.Controllers
{
    [Route("api/cart")]
    [ApiController]
    public class CartAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IRabbitMQCartMessageSender _rabbitMQSender;
        private IMapper _mapper;
        private ResponseDto _responseDto;
        private IProductService _productService;
        private ICouponService _couponService;
        private IConfiguration _configuration;

        public CartAPIController(ApplicationDbContext applicationDbContext, IMapper mapper, IProductService productService, ICouponService couponService, IRabbitMQCartMessageSender rabbitMQSender, IConfiguration configuration)
        {
            this._applicationDbContext = applicationDbContext;
            _rabbitMQSender = rabbitMQSender;
            this._mapper = mapper;
            this._productService = productService;
            this._couponService = couponService;
            this._responseDto = new ResponseDto();
            _configuration = configuration;
        }

        [HttpGet("GetCart/{userId}")]
        public async Task<ResponseDto> GetCartDetailsById(string userId)
        {
            try
            {
                CartDto cart = new()
                {
                    CartHeader = _mapper.Map<CartHeaderDto>(_applicationDbContext.CartHeader.First(u => u.UserId == userId))
                };
                cart.CartDetails = _mapper.Map<IEnumerable<CartDetailsDto>>(_applicationDbContext.CartDetails.Where(u => u.CartHeaderId == cart.CartHeader.CartHeaderId));

                IEnumerable<ProductDto> productDtos = await _productService.GetProducts();

                foreach(var item in cart.CartDetails)
                {
                    //When we're working with Cart, we need to retrieve product Details, we need to link the shopping Cart API with Product API
                    item.Product = productDtos.FirstOrDefault(u => u.ProductId == item.ProductId);
                    
                    cart.CartHeader.CartTotal += (item.Count * item.Product.Price);
                    
                    //cart.CartHeader.CartTotal += (item.Count * item.Product.Price);
                }
                //Apply coupon if any
                if (!string.IsNullOrEmpty(cart.CartHeader.CouponCode))
                {
                    CouponDto coupon = await _couponService.GetCoupon(cart.CartHeader.CouponCode);
                    if(coupon != null && cart.CartHeader.CartTotal > coupon.MinAmount)
                    {
                        cart.CartHeader.CartTotal -= coupon.DiscountAmount;
                        cart.CartHeader.Discount = coupon.DiscountAmount;
                    }
                }
                _responseDto.Result = cart;
            }
            catch (Exception ex) 
            {
                _responseDto.Message = ex.Message.ToString();
                _responseDto.IsSuccess = false;
            }
            return _responseDto;
        }

        [HttpPost("ApplyCoupon")]
        public async Task<object> ApplyCoupon([FromBody] CartDto cartDto)
        {
            try
            {
                var cartFromDb = await _applicationDbContext.CartHeader.FirstAsync(u => u.UserId == cartDto.CartHeader.UserId);
                cartFromDb.CouponCode = cartDto.CartHeader.CouponCode;
                _applicationDbContext.Update(cartFromDb);
                await _applicationDbContext.SaveChangesAsync();
                _responseDto.Result = true;
            }
            catch (Exception ex)
            {
                _responseDto.Message = ex.Message.ToString();
                _responseDto.IsSuccess = false;
            }
            return _responseDto;
        }


        [HttpPost("EmailCartRequest")]
        public async Task<object> EmailCartRequest([FromBody] CartDto cartDto)
        {
            try
            {
                _rabbitMQSender.SendMessage(cartDto, _configuration.GetValue<string>("QueueNames:EmailShoppingCart"), _configuration.GetValue<string>("ExchangeNames:ShoppingCart"));
                _responseDto.Result = true;
            }
            catch (Exception ex)
            {
                _responseDto.Message = ex.Message.ToString();
                _responseDto.IsSuccess = false;
            }
            return _responseDto;
        }

        [HttpPost("RemoveCoupon")]
        public async Task<object> RemoveCoupon([FromBody] CartDto cartDto)
        {
            try
            {
                var cartFromDb = await _applicationDbContext.CartHeader.FirstAsync(u => u.UserId == cartDto.CartHeader.UserId);
                cartFromDb.CouponCode = "";
                _applicationDbContext.Update(cartFromDb);
                await _applicationDbContext.SaveChangesAsync();
                _responseDto.Result = true;
            }
            catch (Exception ex)
            {
                _responseDto.Message = ex.Message.ToString();
                _responseDto.IsSuccess = false;
            }
            return _responseDto;
        }

        //Whether we add a product in cart or edit an existing cart, this single endpoint will manage everything
        [HttpPost("CartUpsert")]
        public async Task<ResponseDto> CartUpsert(CartDto cartDto)
        {
            try
            {
                //Find if an entry exist in the cart
                var cartHeaderFromDb = await _applicationDbContext.CartHeader.AsNoTracking().FirstOrDefaultAsync(u => u.UserId == cartDto.CartHeader.UserId);
                if(cartHeaderFromDb == null)
                {
                    //Create cart header and cart details --> (New Item)
                    CartHeader cartHeader = _mapper.Map<CartHeader>(cartDto.CartHeader);
                    _applicationDbContext.CartHeader.Add(cartHeader);
                    await _applicationDbContext.SaveChangesAsync();

                    cartDto.CartDetails.First().CartHeaderId = cartHeader.CartHeaderId;
                    _applicationDbContext.CartDetails.Add(_mapper.Map<CartDetails>(cartDto.CartDetails.First()));
                    await _applicationDbContext.SaveChangesAsync();
                }       
                else
                {
                    //If header is not null
                    // Cart is not null, i.e that user has some product in the cart;
                    //Check if details has same product

                    //Reason to use First() is, CartDetail will only have one entry,
                    //because the only way to add product into cart is from the product details page
                    //So, it will not be possible that user added 2 products in the cart at the same time.
                    var cartDetailsFromDb = await _applicationDbContext.CartDetails.AsNoTracking().FirstOrDefaultAsync(
                        u => u.ProductId == cartDto.CartDetails.First().ProductId && 
                        u.CartHeaderId == cartHeaderFromDb.CartHeaderId);

                    if(cartDetailsFromDb == null )
                    {
                        //User added a new product in the cart
                        //create cartDetails
                        cartDto.CartDetails.First().CartHeaderId = cartHeaderFromDb.CartHeaderId;
                        _applicationDbContext.CartDetails.Add(_mapper.Map<CartDetails>(cartDto.CartDetails.First()));
                        await _applicationDbContext.SaveChangesAsync();
                    }
                    else
                    {
                        //Already have the same product in the cart
                        //Update quantity of a product in the existing cart
                        cartDto.CartDetails.First().Count += cartDetailsFromDb.Count;
                        cartDto.CartDetails.First().CartHeaderId = cartDetailsFromDb.CartHeaderId;
                        cartDto.CartDetails.First().CartDetailsId = cartDetailsFromDb.CartDetailsId;
                        _applicationDbContext.CartDetails.Update(_mapper.Map<CartDetails>(cartDto.CartDetails.First()));
                        await _applicationDbContext.SaveChangesAsync();
                    }
                }
                _responseDto.Result = cartDto;
            }
            catch (Exception ex)
            {
                _responseDto.Message = ex.Message.ToString();
                _responseDto.IsSuccess = false;
            }
            return _responseDto;
        }


        [HttpPost("RemoveCart")]
        public async Task<ResponseDto> RemoveCart([FromBody]int cartDetailsId)
        {
            try
            {
               CartDetails cartDetails = _applicationDbContext.CartDetails.First(u => u.CartDetailsId == cartDetailsId);
                int totalCountOfCartItem = _applicationDbContext.CartDetails.Where(u => u.CartHeaderId == cartDetails.CartHeaderId).Count();
                _applicationDbContext.CartDetails.Remove(cartDetails);
                if(totalCountOfCartItem == 1)
                {
                    //It means, It's the last item that user is removing from the cart, afterwards the cart is empty.
                    var cartHeaderToRemove = await _applicationDbContext.CartHeader.FirstOrDefaultAsync(u => u.CartHeaderId == cartDetails.CartHeaderId);
                    _applicationDbContext.CartHeader.Remove(cartHeaderToRemove);
                }

                await _applicationDbContext.SaveChangesAsync();
                _responseDto.Result = true;
            }
            catch (Exception ex)
            {
                _responseDto.Message = ex.Message.ToString();
                _responseDto.IsSuccess = false;
            }
            return _responseDto;
        }

    }
}
