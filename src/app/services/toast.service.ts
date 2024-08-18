import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  public async showSuccess(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top',
      color: 'success'
    });

    await toast.present();
  }

  public async showError(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top',
      color: 'danger'
    });

    await toast.present();
  }
}
