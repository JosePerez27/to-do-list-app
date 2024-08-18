import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTaskComponent } from './create-task.organism';
import { ManageCategoriesComponentModule } from '../manage-categories-organism/manage-categories.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageCategoriesComponentModule,
    IonicModule
  ],
  declarations: [CreateTaskComponent],
  exports: [CreateTaskComponent]
})
export class CreateTaskComponentModule {}
