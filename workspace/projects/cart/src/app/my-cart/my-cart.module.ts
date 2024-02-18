import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartComponent } from './my-cart.component';
import { SharedModule } from 'projects/shared/src/lib/shared.module';
import { MyCartRoutingModule } from './my-cart-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MyCartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MyCartRoutingModule,
    
    RouterModule.forChild([
      {
        path: '',
        component: MyCartComponent
      }
    ])
  ]
  
})
export class MyCartModule { }
