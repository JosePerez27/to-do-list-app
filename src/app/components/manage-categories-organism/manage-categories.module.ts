import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageCategoriesComponent } from './manage-categories.organism';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [ManageCategoriesComponent],
  exports: [ManageCategoriesComponent]
})
export class ManageCategoriesComponentModule {}
