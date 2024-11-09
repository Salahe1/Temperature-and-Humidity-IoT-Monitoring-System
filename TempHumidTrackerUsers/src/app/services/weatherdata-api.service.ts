import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherdataApiService {

  private apiUrl =  'https://localhost:7010/api/WeatherData/Get'; 
  constructor(private http: HttpClient) { }

  // Method to get weather data
  getWeatherData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
}
}
