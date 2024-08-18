import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, ModalController } from '@ionic/angular';

import { Task } from '@app/interfaces';
import { RemoteConfigType, Segment, StorageKeys } from '@app/enums';
import { StorageService, FirebaseService, ToastService } from '@app/services';
import { CreateTaskComponent } from '@components/create-task-organism/create-task.organism';

import { HomeConfig } from './home.config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('content') content: IonContent | undefined;

  public title = '';
  public tasks: Task[] = [];
  public config = HomeConfig;
  public segment: Segment = Segment.PENDING;
  public enableDeleteTask: boolean = true;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastService: ToastService,
    private storageService: StorageService,
    private firebaseService: FirebaseService
  ) {}

  public get tasksFilter() {
    return this.tasks.filter((task) => task.status === (this.segment === Segment.COMPLETED));
  }

  public get segmentEnum() {
    return Segment;
  }

  public async ngOnInit() {
    await this.setRemoteConfigVariables();
    await this.getTasks();
  }

  public segmentChange(event: any) {
    this.segment = event.target.value;
  }

  public async updateCheckStatus(event: any, index: number) {
    this.tasksFilter[index].status = event.target.checked;

    if (event.target.checked) {
      this.toastService.showSuccess(this.config.toast.completedTask.message);
    }

    await this.saveTasks();
  }

  public async openModal() {
    const modal = await this.modalController.create({
      component: CreateTaskComponent,
      initialBreakpoint: this.config.modal.createTask.initialBreakpoint,
      breakpoints: this.config.modal.createTask.breakpoints,
      backdropBreakpoint: this.config.modal.createTask.backdropBreakpoint,
      handleBehavior: 'cycle',
      cssClass: this.config.modal.createTask.cssClass,
    });

    modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.tasks.unshift(data);
      await this.saveTasks();

      this.segment = Segment.PENDING;
      this.content?.scrollToTop(250);
      this.toastService.showSuccess(this.config.toast.createdTask.message);
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
          handler: async () => {
            this.tasks.splice(index, 1);
            await this.saveTasks();
            this.toastService.showError(this.config.toast.deletedTask.message);
          },
        },
      ],
    });

    await alert.present();
  }

  private async getTasks() {
    const data = await this.storageService.get(StorageKeys.TASKS);

    if (data) {
      this.tasks = JSON.parse(data);
    }
  }

  private async saveTasks() {
    await this.storageService.set(StorageKeys.TASKS, JSON.stringify(this.tasks));
  }

  private async setRemoteConfigVariables() {
    this.title = await this.firebaseService.getRemoteConfigValue(
      this.config.remoteConfigKeys.homeTitle,
      RemoteConfigType.STRING
    );

    this.enableDeleteTask = await this.firebaseService.getRemoteConfigValue(
      this.config.remoteConfigKeys.enableDeleteTask,
      RemoteConfigType.BOOLEAN
    );
  }
}
