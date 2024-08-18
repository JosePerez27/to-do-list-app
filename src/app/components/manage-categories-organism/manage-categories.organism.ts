import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { StorageKeys } from '@app/enums';
import { StorageService, ToastService } from '@app/services';

import { ManageCategoriesConfig } from './manage-categories.config';

@Component({
  selector: 'app-manage-categories',
  templateUrl: 'manage-categories.organism.html',
  styleUrls: ['manage-categories.organism.scss'],
})
export class ManageCategoriesComponent implements OnInit {
  public categories: string[] = [];
  public config = ManageCategoriesConfig;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastService: ToastService,
    private storageService: StorageService
  ) {}

  public async ngOnInit() {
    await this.getCategories();
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
            if (!data[alertMessages.input.name] || data[alertMessages.input.name].trim() === '') {
              this.toastService.showError(this.config.toast.createCategory.errorMessage);

              return;
            }

            this.categories.push(data[alertMessages.input.name]);
            await this.saveCategories();
            this.toastService.showSuccess(this.config.toast.createCategory.message);
          },
        },
      ],
    });

    await alert.present();
  }

  public async editCategory(index: number) {
    const value = this.categories[index];
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
            if (!data[alertMessages.input.name] || data[alertMessages.input.name].trim() === '') {
              this.toastService.showError(this.config.toast.editCategory.errorMessage);

              return;
            }

            this.categories[index] = data[alertMessages.input.name];
            await this.saveCategories();
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
            this.categories.splice(index, 1);
            await this.saveCategories();
            this.toastService.showError(this.config.toast.deleteCategory.message);
          },
        },
      ],
    });

    await alert.present();
  }

  private async getCategories() {
    const data = await this.storageService.get(StorageKeys.CATEGORIES);

    if (data) {
      this.categories = JSON.parse(data);
    }
  }

  private async saveCategories() {
    await this.storageService.set(StorageKeys.CATEGORIES, JSON.stringify(this.categories));
  }
}
