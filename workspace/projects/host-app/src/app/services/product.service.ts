import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<{ result: Product[], isSuccess: boolean, message: string }> {
    return this.http.get<{ result: Product[], isSuccess: boolean, message: string }>('https://localhost:7001/api/product');
  }
}
