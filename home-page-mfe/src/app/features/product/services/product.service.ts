import { Injectable } from '@angular/core';
import { AddProductRequest } from '../models/add-product-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(model: AddProductRequest): Observable<void> {
    return this.http.post<void>('https://localhost:7000/api/product', model)
  }

  getAllProducts(): Observable<{ result: Product[], isSuccess: boolean, message: string }> {
    return this.http.get<{ result: Product[], isSuccess: boolean, message: string }>('https://localhost:7000/api/product');
  }
}
