import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { DefaultFooterComponent } from './components/default-footer/default-footer.component';
import { DefaultHeaderComponent } from './components/default-header/default-header.component';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { UtilsModule } from '../@utils/utils.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const COREUI_MODULES = [
  AvatarModule,
  BreadcrumbModule,
  FooterModule,
  DropdownModule,
  GridModule,
  HeaderModule,
  SidebarModule,
  IconModule,
  NavModule,
  ButtonModule,
  // FormModule,
  // UtilitiesModule,
  // ButtonGroupModule,
  // ReactiveFormsModule,
  // SharedModule,
  // TabsModule,
  // ListGroupModule,
  // ProgressModule,
  BadgeModule,
  // ListGroupModule,
  // CardModule
]

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    ...COREUI_MODULES,
    PerfectScrollbarModule,
    UtilsModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  exports: [
    DefaultLayoutComponent
  ]
})
export class CoreModule { }
