import { Injectable } from '@angular/core';
import { Task } from '@app/interfaces';

@Injectable({ providedIn: 'root' })
export class TasksModel {
  public tasks: Task[] = [];

  public reset() {
    this.tasks = [];
  }

  public setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }
}
