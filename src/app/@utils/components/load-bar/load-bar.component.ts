import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'util-load-bar',
  templateUrl: './load-bar.component.html',
  styleUrls: ['./load-bar.component.css']
})
export class LoadBarComponent implements OnInit {

  private _show_progress = false;  
  @Input() set show_progress(v: boolean) {
    this._show_progress = v;
  }
  get show_progress() {
    return this._show_progress;
  }

  private _loaded = 0;
  @Input() set loaded(v: number) {
    this._loaded = v;
  }

  get loaded() {
    return this._loaded;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
