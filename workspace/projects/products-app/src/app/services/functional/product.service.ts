import { Injectable } from '@angular/core';
import { NetworkrequestService } from '../core/networkrequest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private networkRequestService: NetworkrequestService) { }

  getProducts() {
    return this.networkRequestService.get('products')
  }
}
