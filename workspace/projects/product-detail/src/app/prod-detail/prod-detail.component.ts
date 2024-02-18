import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'projects/shared/src/lib/product.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-prod-detail',
  templateUrl: './prod-detail.component.html',
  styleUrls: ['./prod-detail.component.scss']
})
export class ProdDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the product ID from the route parameters
    this.route.params.pipe(
      map(params => params['id'])
    ).subscribe(
      (productId: string) => {
        // Fetch the product details from product.json
        this.http.get<Product[]>('assets/product.json').subscribe(
          (products: Product[]) => {
            // Find the product with the matching ID
            this.product = products.find(product => product.id === productId);
            if (!this.product) {
              console.error('Product not found!');
            }
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      }
    );
  }
}
