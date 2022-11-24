import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadBarComponent } from './components/load-bar/load-bar.component';
import { AlertComponent } from './components/alert/alert.component';
import { PageTitleComponent } from './components/page-title/page-title.component';



@NgModule({
  declarations: [
    LoadBarComponent,
    AlertComponent,
    PageTitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadBarComponent,
    AlertComponent,
    PageTitleComponent
  ]
})
export class UtilsModule { }
