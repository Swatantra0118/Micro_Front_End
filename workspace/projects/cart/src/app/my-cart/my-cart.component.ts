import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'projects/shared/src/lib/product.model';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  cartItems: Product[] = [];
  successMessage!: string;
  errorMessage!: string;
 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.http.get<Product[]>('https://localhost:7214/api/Cart')
      .subscribe(
        (cartItems: Product[]) => {
          this.cartItems = cartItems;
        },
        error => {
          console.error('Error fetching cart items:', error);
        }
      );
  }
  removeFromCart(cartItemId: string): void {
    // Make an HTTP DELETE request to remove the item from the cart
    this.http.delete(`https://localhost:7214/api/Cart/${cartItemId}`)
      .subscribe(
        () => {
          console.log('Product removed from cart successfully!');
          window.location.reload();
        },
        error => {
          console.error('Error removing product from cart:', error);
        }
      );
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

    //return 0;
}

  checkout(): void {
    alert('Checkout initiated');
  }
}
