import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkRequestService {
  baseUrl = 'https://fakestoreapi.com/'

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint);
  }
}
