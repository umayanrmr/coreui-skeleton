import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';



// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';


import { IconSetService } from '@coreui/icons-angular';
import { CoreModule } from './@core/core.module';






@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
