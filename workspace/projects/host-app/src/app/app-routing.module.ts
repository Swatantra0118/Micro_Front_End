import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const MFE_APP_URL = "http://localhost:4300/remoteEntry.js";
const MFE_APP_URL_T = "http://localhost:7000/remoteProductEntry.js";

const MFE_APP_URL_Talha = "http://localhost:8008/remoteCartEntry.js";

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'navbar',component: NavbarComponent},
  {
    path: 'product',
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: MFE_APP_URL,
        remoteName: "mfeApp",
        exposedModule: "./AddProductModule"
      }).then(m => m.AddProductModule).catch(err => console.log(err));
    }
  },
  {
    path: 'productmfe',
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: MFE_APP_URL_T,
        remoteName: "productsApp",
        exposedModule: "./ProductsModule"
      }).then(m => m.ProductsModule).catch(err => console.log(err));
    }
  },
  {
    path: 'cartmfe',
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: MFE_APP_URL_Talha,
        remoteName: "cart",
        exposedModule: "./MyCartModule"
      }).then(m => m.MyCartModule).catch(err => console.log(err));
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routeCompArr = [HomeComponent, NavbarComponent]
