import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertDTO } from '../@dto/alert.dto';
import { BSColor } from '../@dto/bscolor.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _alerts = new BehaviorSubject<AlertDTO[]>([]);
  public get Alerts() {
    return this._alerts.getValue();
  }
  public alerts$ = this._alerts.asObservable();

  constructor() { }

  http_error(err: any) {
    if(err instanceof HttpErrorResponse) {
      let msg = this.extract_error_message(err);
      this.add_alert(msg, BSColor.Danger);
    }
  }

  private extract_error_message(err: HttpErrorResponse) {
    if(+err.status == 422) {
      let messages = "";
      Object.keys(err.error.errors).forEach(function(prop) {
        messages += err.error.errors[prop].map((x: any) => `<li>${x}</li>`);
      });
      return `<span class="mb-0">There's a problem processing your data, please see the message below.</span><ul class="mb-0">${messages}</ul>`;
    }

    if(+err.status == 504) {
      return `Request timeout, please try again later.`;
    }

    const def = 'System Error, Please contact your system administrator';
    return (err.error.error) ? err.error.error :  (err.error.message) ? err.error.message :  def;
  }


  add_alert(message: string, color: BSColor = BSColor.Success) {
    const alert = new AlertDTO({
      message: message,
      color: color
    });
    const current_alerts = this.Alerts;
    current_alerts.push(alert);
    this._alerts.next(current_alerts);
    this.auto_remove(alert);
  }

  remove_alert(alert: AlertDTO) {
    const current_alerts = this.Alerts;
    this._alerts.next(current_alerts.filter(x => x.id != alert.id));
  }

  private auto_remove(alert: AlertDTO) {
    setTimeout(() => {
      this.remove_alert(alert);
    }, 5000);
  }
}
