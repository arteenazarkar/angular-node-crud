import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { AddProductComponent } from './components/product/add-component/add-product.component';
import { ProductsListComponent } from './components/product/list-product/products-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsListComponent,
  },

  {
    path: 'products/add',
    component: AddProductComponent,
  },
  {
    path: 'products/edit',
    component: AddProductComponent,
  },

  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
  {
    path: 'categories',
    component: ListCategoryComponent,
  },

  {
    path: 'categories/add',
    component: AddCategoryComponent,
  },
  {
    path: 'categories/edit',
    component: AddCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
