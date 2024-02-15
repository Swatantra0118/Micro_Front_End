import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../product/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // products$?: Observable<Product[]>;
  products?: Product[];
  constructor(private productService: ProductService){

  }
  ngOnInit(): void {
    // this.products$ = this.productService.getAllProducts();
    this.productService.getAllProducts()
    .subscribe({
      next: (response) => {
        this.products = response.result;
      }
    });
    console.log(this.products);
  }

}
