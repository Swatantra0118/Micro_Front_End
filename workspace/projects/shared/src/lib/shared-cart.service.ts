import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class SharedCartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  globalvariable: any;
  constructor() { }

  addToCart(product: Product) {
    //debugger;
    this.globalvariable=product;
    const currentCartItems = this.cartItemsSubject.value;
    const updatedCartItems = [...currentCartItems, product];
    this.cartItemsSubject.next(updatedCartItems);
  }
  updateCart(items: Product[]): void {
    // Update the cart items
    this.cartItemsSubject.next(items);
  }
}