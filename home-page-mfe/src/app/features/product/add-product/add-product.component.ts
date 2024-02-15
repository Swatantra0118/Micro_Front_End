import { Component, OnDestroy } from '@angular/core';
import { AddProductRequest } from '../models/add-product-request.model';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnDestroy {

  model: AddProductRequest;
  private addProductSubscription?: Subscription; 

  constructor(private productService: ProductService){
    this.model = {
      name: '',
      imageUrl: '',
      description:'',
      quantity: 0,
      price:0,
      categoryName:'',
    };
  }
  
  onFormSubmit(){
    console.log(this.model);
    this.addProductSubscription = this.productService.addProduct(this.model)
    .subscribe({
      next: (response) => {
        console.log('This was successful!')
      },
      error: (error) => {
        //Do something with the error encountered
        console.log('An error was encountered')
      }
    });
  }

  ngOnDestroy(): void {
    this.addProductSubscription?.unsubscribe();
  }

}
