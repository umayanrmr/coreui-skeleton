import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { AlertService } from './@services/alert.service';
import { AppLoaderService } from './@services/app-loader.service';
import { AlertDTO } from './@dto/alert.dto';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
  // template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'MMDA Identity';

  constructor(
    private router: Router,
    private titleService: Title,
    public alert_service: AlertService,
    public app_loadert_service: AppLoaderService,
    private iconSetService: IconSetService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    // });
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.app_loadert_service.loading_start();
        return;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof  NavigationError) {
        this.app_loadert_service.loading_end();
        return;
      }
    });
  }

  remove_alert(item: AlertDTO) {
    this.alert_service.remove_alert(item);
  }
}
