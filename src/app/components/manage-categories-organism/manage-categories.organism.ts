import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { StorageKeys } from '@app/enums';
import { CategoriesModel, TasksModel } from '@app/models';
import { StorageService, ToastService } from '@app/services';

import { ManageCategoriesConfig } from './manage-categories.config';

@Component({
  selector: 'app-manage-categories',
  templateUrl: 'manage-categories.organism.html',
  styleUrls: ['manage-categories.organism.scss'],
})
export class ManageCategoriesComponent {
  public config = ManageCategoriesConfig;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastService: ToastService,
    private storageService: StorageService,
    private categoriesModel: CategoriesModel,
    private tasksModel: TasksModel
  ) {}

  public get categories() {
    return this.categoriesModel.categories;
  }

  public close() {
    this.modalController.dismiss();
  }

  public async createCategory() {
    const alertMessages = this.config.alert.createCategory;

    const alert = await this.alertController.create({
      header: alertMessages.header,
      backdropDismiss: false,
      inputs: [
        {
          type: 'text',
          name: alertMessages.input.name,
          placeholder: alertMessages.input.placeholder,
          attributes: alertMessages.input.attributes,
        },
      ],
      buttons: [
        {
          text: alertMessages.buttons.cancel,
          role: 'cancel',
        },
        {
          text: alertMessages.buttons.accept,
          role: 'confirm',
          handler: async (data) => {
            const newCategory = data[alertMessages.input.name];

            if (!newCategory || newCategory.trim() === '') {
              this.toastService.showError(this.config.toast.createCategory.errorMessage);

              return;
            }

            this.categoriesModel.categories.push(newCategory.trim());
            await this.saveCategories();
            this.toastService.showSuccess(this.config.toast.createCategory.message);
          },
        },
      ],
    });

    await alert.present();
  }

  public async editCategory(index: number) {
    const value = this.categoriesModel.categories[index];
    const alertMessages = this.config.alert.editCategory;

    const alert = await this.alertController.create({
      header: alertMessages.header,
      backdropDismiss: false,
      inputs: [
        {
          type: 'text',
          value: value,
          name: alertMessages.input.name,
          placeholder: alertMessages.input.placeholder,
          attributes: alertMessages.input.attributes,
        },
      ],
      buttons: [
        {
          text: alertMessages.buttons.cancel,
          role: 'cancel',
        },
        {
          text: alertMessages.buttons.accept,
          role: 'confirm',
          handler: async (data) => {
            const newCategory = data[alertMessages.input.name];

            if (!newCategory || newCategory.trim() === '') {
              this.toastService.showError(this.config.toast.editCategory.errorMessage);

              return;
            }


            const updatedTasks = this.tasksModel.tasks.map((task) => {
              if (task.category === value) {
                task.category = newCategory.trim();
              }

              return task;
            });

            this.tasksModel.setTasks(updatedTasks);
            this.categoriesModel.categories[index] = newCategory.trim();

            await this.saveCategories();
            await this.saveTasks();
            this.toastService.showSuccess(this.config.toast.editCategory.message);
          },
        },
      ],
    });

    await alert.present();
  }

  public async deleteCategory(index: number) {
    const alertMessages = this.config.alert.deleteCategory;

    const alert = await this.alertController.create({
      header: alertMessages.header,
      message: alertMessages.message,
      cssClass: 'ion-text-center',
      backdropDismiss: false,
      buttons: [
        {
          text: alertMessages.buttons.cancel,
          role: 'cancel',
        },
        {
          text: alertMessages.buttons.accept,
          role: 'confirm',
          handler: async () => {
            this.categoriesModel.categories.splice(index, 1);
            await this.saveCategories();
            this.toastService.showError(this.config.toast.deleteCategory.message);
          },
        },
      ],
    });

    await alert.present();
  }

  private async saveCategories() {
    await this.storageService.set(StorageKeys.CATEGORIES, JSON.stringify(this.categoriesModel.categories));
  }

  private async saveTasks() {
    await this.storageService.set(StorageKeys.TASKS, JSON.stringify(this.tasksModel.tasks));
  }
}
