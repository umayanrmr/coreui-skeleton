import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertDTO } from 'src/app/@dto/alert.dto';

@Component({
  selector: 'util-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() alert: AlertDTO = new AlertDTO();
  @Output() onRemove = new EventEmitter<AlertDTO>();

  constructor() { }

  ngOnInit(): void {
  }

  remove() {
    this.onRemove.emit(this.alert);
  }

}
