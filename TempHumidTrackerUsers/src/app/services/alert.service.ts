import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private refreshAlertSource = new Subject<void>();
  refreshAlert$ = this.refreshAlertSource.asObservable();

  triggerAlertRefresh() {
    this.refreshAlertSource.next();
  }

}
