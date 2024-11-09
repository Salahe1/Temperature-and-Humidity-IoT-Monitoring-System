import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private baseUrl = 'http://localhost:50000/api';

  constructor(private http: HttpClient) { }

  getTemperatureData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/temperature`); 
  }

  getAlerts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/alerts`);
  }

  updateSettings(settings: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/settings`, settings);
  }
}
