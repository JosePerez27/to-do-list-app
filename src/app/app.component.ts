import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  public async ngOnInit() {
    await this.firebaseService.initializeApp();
  }
}
