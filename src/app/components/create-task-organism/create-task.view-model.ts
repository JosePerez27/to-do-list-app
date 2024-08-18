import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateTaskConfig } from "./create-task.config";

export class CreateTaskViewModel {
  public form: FormGroup;
  public taskFormControl: FormControl;
  private config = CreateTaskConfig;

  constructor() {
    this.taskFormControl = new FormControl('', [Validators.required, Validators.maxLength(this.config.maxLength)]);

    this.form = new FormGroup({
      task: this.taskFormControl,
    });

    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  public get task() {
    return this.taskFormControl.value?.trim();
  }
}
