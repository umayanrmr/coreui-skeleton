import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'core-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss']
})
export class DefaultFooterComponent implements OnInit {

  appName = '';
  yearNow = 2022;
  constructor() { 

  }

  ngOnInit(): void {
    this.appName = environment.app.name;
    this.yearNow = new Date().getFullYear();
  }

}
