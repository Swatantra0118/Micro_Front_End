import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkrequestService {
  baseUrl = 'https://fakestoreapi.com/'

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint);
  }
}
