import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'core-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent implements OnInit {
  @Input() sidebarId: string = "sidebar";
  constructor() { }

  ngOnInit(): void {
  }

}
