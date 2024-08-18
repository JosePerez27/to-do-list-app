import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoriesModel {
  public categories: string[] = [];

  public reset() {
    this.categories = [];
  }

  public setCategories(categories: string[]) {
    this.categories = categories;
  }
}
