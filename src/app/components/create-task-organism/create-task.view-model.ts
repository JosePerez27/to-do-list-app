import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateTaskConfig } from "./create-task.config";

export class CreateTaskViewModel {
  public form: FormGroup;
  public taskFormControl: FormControl;
  public categoryFormControl: FormControl;
  private config = CreateTaskConfig;

  constructor() {
    this.categoryFormControl = new FormControl('', [Validators.required]);
    this.taskFormControl = new FormControl('', [Validators.required, Validators.maxLength(this.config.maxLength)]);

    this.form = new FormGroup({
      task: this.taskFormControl,
      category: this.categoryFormControl,
    });

    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  public get task() {
    return this.taskFormControl.value?.trim();
  }

  public get category() {
    return this.categoryFormControl.value?.trim();
  }
}
