import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/functional/product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { SharedCartService } from 'projects/shared/src/lib/shared-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  cartItems: Product[] = [];
  
  productObj: Product = {
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  };
  constructor(private productService: ProductService,private http: HttpClient,private sharedCartService: SharedCartService) { }
  
  ngOnInit(): void {
    
    this.getProducts();
  
  }
  getProducts(): void {
  
    console.log("###################");
    this.productService.getProducts().subscribe((res: any) => {
      console.log(res);
      this.products = res;
     });
  }
  addToCart(product: any) {
    const productObj: Product = {
      id: String(product.id),
      title: product.title,
      price: String(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: String(product.rating.rate),
        count: String(product.rating.count)
      }
    };
    this.http.post('https://localhost:7214/api/Cart', productObj)
    .subscribe(
      () => {
        console.log('Product added to cart successfully!');
      },
      error => {
        console.error('Error adding product to cart:', error);
      }
    );
}
  }


