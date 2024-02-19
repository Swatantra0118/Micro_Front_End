import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ProductsRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent
      }
    ])
  ]
})
export class ProductsModule { }
