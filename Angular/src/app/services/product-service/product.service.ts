import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../model/product';

const baseUrl = `${environment.apiUrl}/products`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl);
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(baseUrl + '/get-product/' + productId);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(baseUrl + '/add-product', product);
  }

  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(
      baseUrl + '/update-product/' + productId,
      product
    );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(baseUrl + '/delete-product/' + productId);
  }
}
