import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, ModalController, ToastController } from '@ionic/angular';

import { HomeConfig } from './home.config';
import { StorageService } from '../../../../services';
import { Segment, StorageKeys, Task } from '../../../../interfaces';
import { CreateTaskComponent } from '../../../../components/create-task-organism/create-task.organism';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('content') content: IonContent | undefined;

  public tasks: Task[] = [];
  public config = HomeConfig;
  public segment: Segment = Segment.PENDING;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private storageService: StorageService
  ) {}

  public get tasksFilter() {
    return this.tasks.filter((task) => task.status === (this.segment === Segment.COMPLETED));
  }

  public get segmentEnum() {
    return Segment;
  }

  public async ngOnInit() {
    const data = await this.storageService.get(StorageKeys.TASKS);

    if (data) {
      this.tasks = JSON.parse(data);
    }
  }

  public segmentChange(event: any) {
    this.segment = event.target.value;
  }

  public updateCheckStatus(event: any, index: number) {
    this.tasksFilter[index].status = event.target.checked;

    if (event.target.checked) {
      this.presentToast(this.config.toast.completedTask.message, 'success');
    }

    this.saveTasks();
  }

  public async openModal() {
    const modal = await this.modalController.create({
      component: CreateTaskComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      backdropBreakpoint: 0,
      handleBehavior: 'cycle',
      cssClass: 'height-auto'
    });

    modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.tasks.unshift(data);
      this.saveTasks();
      this.presentToast(this.config.toast.createdTask.message, 'success');
      this.content?.scrollToTop(250);
    }
  }

  public async deleteTask(index: number) {
    const alertMessages = this.config.alert.deleteTask;

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
          handler: () => {
            this.tasks.splice(index, 1);
            this.saveTasks();
            this.presentToast(this.config.toast.deletedTask.message, 'danger');
          },
        },
      ],
    });

    await alert.present();
  }

  private async saveTasks() {
    const saved = await this.storageService.set(StorageKeys.TASKS, JSON.stringify(this.tasks));
  }

  private async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });

    await toast.present();
  }
}
