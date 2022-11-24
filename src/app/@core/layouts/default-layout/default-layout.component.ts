import { Component, OnInit } from '@angular/core';
import { AppLoaderService } from 'src/app/@services/app-loader.service';
import { navItems } from 'src/_nav';

@Component({
  selector: 'core-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  constructor(public app_loadert_service: AppLoaderService,) { }

  ngOnInit(): void {
  }

}
