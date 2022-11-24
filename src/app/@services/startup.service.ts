import { Injectable } from '@angular/core';
import { combineLatest, firstValueFrom, forkJoin, of } from 'rxjs';

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
        of(true)
      ])
    )
    .then((data: any) => {
      this.is_success = true;
      this.is_pending = false;
    })
    .catch((err: any) => Promise.resolve());
  }
}
