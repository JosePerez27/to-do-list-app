import { FormControl, FormGroup, Validators } from "@angular/forms";

export class CreateTaskViewModel {
  public form: FormGroup;
  public taskFormControl: FormControl;

  constructor() {
    this.taskFormControl = new FormControl('', [Validators.required, Validators.maxLength(200)]);

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
