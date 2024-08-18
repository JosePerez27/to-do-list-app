import { FormControl, FormGroup } from "@angular/forms";

export class HomeViewModel {
  public form: FormGroup;
  public categoriesFormControl: FormControl;

  constructor() {
    this.categoriesFormControl = new FormControl([]);

    this.form = new FormGroup({
      categories: this.categoriesFormControl,
    });

    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  public get categories() {
    return this.categoriesFormControl.value;
  }
}
