import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/functional/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Array<any> = [];
  constructor(private productService: ProductService) { }
  
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

}
