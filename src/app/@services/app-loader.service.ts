import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLoaderService {
  loaded = 0;
  maxCounter = 100;
  progressInterval?: any;
  loadingInterval?: any;
  show_progress = false;
  loading_indicator = '';

  protected _is_loading = new BehaviorSubject<boolean>(false);

  set is_loading(v) {
    this._is_loading.next(v);
  }
  get is_loading() {
    return this._is_loading.getValue();
  }
  
  public loading_start() {
    this.is_loading = true;
    this.show_progress = true;
    this.loaded = 3;
    this.reset_loader();
    this.progressInterval = setInterval(() => {
      if(this.loaded < 95 ) {
        this.maxCounter = 100 - this.loaded;
        const increment = Math.random() * ((this.maxCounter / (this.loaded / 2)) - 1) + 1;
        this.loaded += Math.ceil(increment);
      }else if(this.loaded < 99) {
        this.loaded += 0.10;
      }
    }, 500);

    this.loadingInterval = setInterval(() => {
      if(this.loading_indicator.length <= 2) {
        this.loading_indicator += '.';
        return;
      }
      this.loading_indicator = '';
    }, 100);
  }

  public loading_end() {
      this.loaded = 100;  
      this.is_loading = false;
      setTimeout(() => {
        this.show_progress = false;
      }, 1500);
      this.reset_loader();
  }

  public reset_loader() {
    if(this.progressInterval) {
        clearInterval(this.progressInterval);
        
    }

    if(this.loadingInterval) {
      clearInterval(this.loadingInterval);
    }
  }
}
