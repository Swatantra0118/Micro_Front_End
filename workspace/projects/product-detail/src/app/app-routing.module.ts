import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdDetailComponent } from './prod-detail/prod-detail.component';

const routes: Routes = [
  
  {path:'',component:ProdDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
