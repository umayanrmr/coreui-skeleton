import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadBarComponent } from './components/load-bar/load-bar.component';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
  declarations: [
    LoadBarComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadBarComponent,
    AlertComponent
  ]
})
export class UtilsModule { }
