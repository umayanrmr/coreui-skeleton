import { Injectable } from '@angular/core';
import { combineLatest, firstValueFrom, forkJoin, of } from 'rxjs';
import { system_deviceid_key } from 'src/localstorage.keys';
import { v4 as uuid } from 'uuid';


@Injectable()
export class StartupService {
  is_pending = false;
  is_success = false;
  constructor() { 

  }

  load(): Promise<any> {
    this.is_success = false;
    this.is_pending = true;

    // return new Promise(resolve => setTimeout(resolve, 5000));
    return firstValueFrom(
      forkJoin([
        of(this.set_device_id()),
      ])
    )
    .then((data: any) => {
      this.is_success = true;
      this.is_pending = false;
    })
    .catch((err: any) => Promise.resolve());
  }


  private set_device_id() {
    if(!localStorage.getItem(system_deviceid_key)) {
      const myId = uuid();
      localStorage.setItem(system_deviceid_key, myId.toLowerCase());
    }
  }
}
