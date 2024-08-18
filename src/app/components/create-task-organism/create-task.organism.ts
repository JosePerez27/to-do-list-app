import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { StorageKeys } from '@app/interfaces';
import { StorageService } from '@app/services';
import { ManageCategoriesComponent } from '../manage-categories-organism/manage-categories.organism';

import { CreateTaskViewModel } from './create-task.view-model';
import { CreateTaskConfig } from './create-task.config';

@Component({
  selector: 'app-create-task',
  templateUrl: 'create-task.organism.html',
  styleUrls: ['create-task.organism.scss'],
})
export class CreateTaskComponent implements OnInit {
  public viewModel = new CreateTaskViewModel();
  public config = CreateTaskConfig;
  public categories: string[] = [];

  constructor(
    private modalController: ModalController,
    private storageService: StorageService
  ) {}

  public async ngOnInit() {
    this.getCategories();
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
    await this.getCategories();
  }

  private async getCategories() {
    const data = await this.storageService.get(StorageKeys.CATEGORIES);

    if (data) {
      this.categories = JSON.parse(data);
    }
  }
}
