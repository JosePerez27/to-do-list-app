import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateTaskViewModel } from './create-task.view-model';
import { Task } from '../../interfaces';

@Component({
  selector: 'app-create-task',
  templateUrl: 'create-task.organism.html',
  styleUrls: ['create-task.organism.scss'],
})
export class CreateTaskComponent {
  public tasks: Task[] = [];
  public viewModel = new CreateTaskViewModel();

  constructor(private modalController: ModalController) {}

  public createTask() {
    this.modalController.dismiss({
      status: false,
      name: this.viewModel.task,
      category: 'Work'
    });

    this.viewModel.form.reset();
  }
}
