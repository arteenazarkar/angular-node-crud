import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category-service/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  dataSource: MatTableDataSource<Category>;
  categoryList: any[];
  contentLoaded: boolean;
  displayedColumns: String[] = ['categoryId', 'categoryName', 'action'];

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.contentLoaded = false;
    this.categoryService.getAllCategory().subscribe((result) => {
      this.categoryList = result;
      this.dataSource = new MatTableDataSource(this.categoryList);
      this.contentLoaded = true;
    });
  }

  OnAddCategory() {
    this.router.navigate(['categories/add']);
  }

  OnBack() {
    this.router.navigate(['products']);
  }

  onEditCategory(category: Category) {
    this.router.navigate(['/categories/edit'], {
      queryParams: { id: category.categoryId },
    });
  }

  onDeleteCategory(category: Category) {
    const categoryId = category.categoryId;
    this.categoryService.deleteCategory(categoryId).subscribe((result) => {
      this.categoryList = this.categoryList.filter((e) => e !== category);
      this.dataSource = new MatTableDataSource(this.categoryList);
    });
  }
}
