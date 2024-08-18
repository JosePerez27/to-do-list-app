import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CategoriesModel } from '@app/models';
import { ManageCategoriesComponent } from '../manage-categories-organism/manage-categories.organism';

import { CreateTaskViewModel } from './create-task.view-model';
import { CreateTaskConfig } from './create-task.config';

@Component({
  selector: 'app-create-task',
  templateUrl: 'create-task.organism.html',
  styleUrls: ['create-task.organism.scss'],
})
export class CreateTaskComponent {
  public config = CreateTaskConfig;
  public viewModel = new CreateTaskViewModel();

  constructor(
    private modalController: ModalController,
    private categoriesModel: CategoriesModel
  ) {}

  public get categories() {
    return this.categoriesModel.categories;
  }

  public createTask() {
    this.modalController.dismiss({
      status: false,
      name: this.viewModel.task,
      category: this.viewModel.category
    });

    this.viewModel.form.reset();
  }

  public async manageCategories() {
    const modal = await this.modalController.create({
      component: ManageCategoriesComponent,
    });

    modal.present();

    await modal.onDidDismiss();
  }
}
