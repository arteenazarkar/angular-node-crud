import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../model/category';

const baseUrl = `${environment.apiUrl}/category`;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }

  getCategory(categoryId: number): Observable<Category> {
    return this.http.get<Category>(baseUrl + '/get-category/' + categoryId);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(baseUrl + '/add-category', category);
  }

  updateCategory(categoryId: number, category: Category): Observable<Category> {
    return this.http.put<Category>(
      baseUrl + '/update-category/' + categoryId,
      category
    );
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(baseUrl + '/delete-category/' + categoryId);
  }
}
