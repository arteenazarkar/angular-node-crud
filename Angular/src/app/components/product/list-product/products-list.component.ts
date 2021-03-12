import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  dataSource: MatTableDataSource<Product>;
  productList: any[];
  contentLoaded: boolean;
  displayedColumns: String[] = [
    'productId',
    'productName',
    'categoryName',
    'categoryId',
    'action',
  ];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.contentLoaded = false;
    this.productService.getAllProducts().subscribe((result) => {
      this.productList = result;
      this.dataSource = new MatTableDataSource(this.productList);
      this.contentLoaded = true;
    });
  }

  OnAdd() {
    this.router.navigate(['/products/add']);
  }

  ViewCategory() {
    this.router.navigate(['/categories']);
  }

  onEditProduct(product: Product) {
    this.router.navigate(['/products/edit'], {
      queryParams: { id: product.productId },
    });
  }

  onDeleteProduct(product: any) {
    const productId = product.productId;
    this.productService.deleteProduct(productId).subscribe((result) => {
      this.productList = this.productList.filter((e) => e !== product);
      this.dataSource = new MatTableDataSource(this.productList);
    });
  }

  OnCategory() {
    this.router.navigate(['/categories/add']);
  }
}
