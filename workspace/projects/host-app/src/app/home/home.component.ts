import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  worker!: Worker;
  products?: Product[];
  constructor(private productService: ProductService){

  }

  ngOnInit(): void {

    this.worker = new Worker(new URL('./sorting.worker', import.meta.url), { type: 'module' });


    // this.products$ = this.productService.getAllProducts();
    this.productService.getAllProducts()
    .subscribe({
      next: (response) => {
        console.log(response.result);
        this.worker.postMessage(response.result);
        // Listen for sorted products from the web worker
        this.worker.onmessage = ({ data }) => {
          console.log(data);
          this.products = data;
         };
        // this.products = response.result;
      }
    });
    console.log(this.products);
  }
}
