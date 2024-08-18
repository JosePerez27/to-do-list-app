import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './pages/home/home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CreateTaskComponentModule } from '../../components/create-task-organism/create-task.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    CreateTaskComponentModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
