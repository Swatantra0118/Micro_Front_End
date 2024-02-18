import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyCartModule } from './my-cart/my-cart.module';
import { SharedModule } from 'projects/shared/src/lib/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyCartModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  //schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
