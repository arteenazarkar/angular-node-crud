import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category-service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number;
  query: any;
  editMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private matSnackBar: MatSnackBar
  ) {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query = { ...params.keys, ...params };

      if (this.query.params.id) {
        this.editMode = true;
        this.categoryId = +this.query.params.id;
        this.categoryService
          .getCategory(this.categoryId)
          .subscribe((result) => {
            this.categoryForm.patchValue(result);
          });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.editMode) {
        this.categoryService
          .updateCategory(this.categoryId, this.categoryForm.getRawValue())
          .subscribe((result) => {
            this.openSnackBar('Updated Sucessfully!!');
          });
      } else {
        this.categoryService
          .createCategory(this.categoryForm.getRawValue())
          .subscribe((result) => {
            this.openSnackBar('Added Sucessfully');
          });
      }
    } else {
      this.categoryForm.markAsUntouched();
      return false;
    }
  }

  onCancel() {
    window.history.back();
  }

  openSnackBar(message: string) {
    this.matSnackBar.open(message);
    window.history.back();
  }
}
