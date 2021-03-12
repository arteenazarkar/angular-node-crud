import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  productId: number;
  query: any;
  editMode: boolean;
  categoryOpt: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private matSnackBar: MatSnackBar
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      categoryId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((result) => {
      this.categoryOpt = result;
    });

    this.route.queryParamMap.subscribe((params) => {
      this.query = { ...params.keys, ...params };

      if (this.query.params.id) {
        this.editMode = true;
        this.productId = +this.query.params.id;
        this.productService.getProduct(this.productId).subscribe((result) => {
          this.productForm.patchValue(result);
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.productService
        .updateProduct(this.productId, this.productForm.getRawValue())
        .subscribe((result) => {
          this.openSnackBar('Updated Sucessfully!!');
        });
    } else {
      this.productService
        .createProduct(this.productForm.getRawValue())
        .subscribe((result) => {
          this.openSnackBar('Added Sucessfully!!');
        });
    }
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  openSnackBar(message: string) {
    this.matSnackBar.open(message);
    this.router.navigate(['/products']);
  }
}
