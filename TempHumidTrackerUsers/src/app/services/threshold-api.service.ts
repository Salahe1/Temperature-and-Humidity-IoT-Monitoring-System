import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThresholdApiService {

 
  private baseUrl = 'https://localhost:7010/api/Thresholds'; 

  constructor(private http: HttpClient) {}

  // Fetch the latest temperature from the API
  getLatestTemperature(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetLastTemperature`);
  }

  // Fetch the temperature thresholds from the API
  getThresholdData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetTemperatureThresholds`);
  }
}
