import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, ModalController } from '@ionic/angular';

import { TasksModel } from '@app/models';
import { RemoteConfigType, Segment, StorageKeys } from '@app/enums';
import { StorageService, FirebaseService, ToastService } from '@app/services';
import { CreateTaskComponent } from '@components/create-task-organism/create-task.organism';

import { HomeConfig } from './home.config';
import { HomeViewModel } from './home.view-model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('content') content: IonContent | undefined;

  public title = '';
  public config = HomeConfig;
  public categories: string[] = [];
  public segment: Segment = Segment.PENDING;
  public enableDeleteTask: boolean = true;
  public viewModel = new HomeViewModel();

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastService: ToastService,
    private storageService: StorageService,
    private firebaseService: FirebaseService,
    private tasksModel: TasksModel
  ) {}

  public get tasksFilter() {
    let tasks = this.tasksModel.tasks.filter((task) => task.status === (this.segment === Segment.COMPLETED));

    if (this.viewModel.categories?.length > 0) {
      tasks = tasks.filter((task) => this.viewModel.categories.includes(task.category));
    }

    return tasks;
  }

  public get segmentEnum() {
    return Segment;
  }

  public async ngOnInit() {
    await this.setRemoteConfigVariables();
    await this.getTasks();
    await this.getCategories();
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
    await this.getCategories();

    if (data) {
      this.tasksModel.tasks.unshift(data);
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
            this.tasksModel.tasks.splice(index, 1);
            await this.saveTasks();
            this.toastService.showError(this.config.toast.deletedTask.message);
          },
        },
      ],
    });

    await alert.present();
  }

  private async getCategories() {
    this.categories = [];
    const data = await this.storageService.get(StorageKeys.CATEGORIES);

    if (data) {
      this.categories = JSON.parse(data);
    }
  }

  private async getTasks() {
    this.tasksModel.reset();
    const data = await this.storageService.get(StorageKeys.TASKS);

    if (data) {
      this.tasksModel.setTasks(JSON.parse(data));
    }
  }

  private async saveTasks() {
    await this.storageService.set(StorageKeys.TASKS, JSON.stringify(this.tasksModel.tasks));
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
