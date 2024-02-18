import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCartComponent } from './my-cart/my-cart.component';

const routes: Routes = [
  {path: '', redirectTo: '/cartmfe', pathMatch: 'full'},
  {path: 'cartmfe', component: MyCartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
