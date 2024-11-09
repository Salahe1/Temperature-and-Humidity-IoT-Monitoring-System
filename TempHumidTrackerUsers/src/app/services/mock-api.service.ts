import { Injectable } from '@angular/core';
import {Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MockApiService {

  constructor() { }

  //simulate a GET request for temperature data 
  getWeatherData(): Observable<any> {
    const mockData = [
      { temperature: 22, humidity: 70, timestamp: new Date('2024-10-01T00:00:00') },
      { temperature: 21, humidity: 75, timestamp: new Date('2024-10-01T01:00:00') },
      { temperature: 20, humidity: 78, timestamp: new Date('2024-10-01T02:00:00') },
      { temperature: 19, humidity: 80, timestamp: new Date('2024-10-01T03:00:00') },
      { temperature: 18, humidity: 85, timestamp: new Date('2024-10-01T04:00:00') },
      { temperature: 17, humidity: 87, timestamp: new Date('2024-10-01T05:00:00') },
      { temperature: 16, humidity: 90, timestamp: new Date('2024-10-01T06:00:00') },
      { temperature: 17, humidity: 88, timestamp: new Date('2024-10-01T07:00:00') },
      { temperature: 19, humidity: 82, timestamp: new Date('2024-10-01T08:00:00') },
      { temperature: 21, humidity: 75, timestamp: new Date('2024-10-01T09:00:00') },
      { temperature: 24, humidity: 70, timestamp: new Date('2024-10-01T10:00:00') },
      { temperature: 26, humidity: 65, timestamp: new Date('2024-10-01T11:00:00') },
      { temperature: 28, humidity: 60, timestamp: new Date('2024-10-01T12:00:00') },
      { temperature: 30, humidity: 55, timestamp: new Date('2024-10-01T13:00:00') },
      { temperature: 31, humidity: 50, timestamp: new Date('2024-10-01T14:00:00') },
      { temperature: 29, humidity: 52, timestamp: new Date('2024-10-01T15:00:00') },
      { temperature: 27, humidity: 55, timestamp: new Date('2024-10-01T16:00:00') },
      { temperature: 25, humidity: 60, timestamp: new Date('2024-10-01T17:00:00') },
      { temperature: 24, humidity: 65, timestamp: new Date('2024-10-01T18:00:00') },
      { temperature: 23, humidity: 70, timestamp: new Date('2024-10-01T19:00:00') },
      { temperature: 22, humidity: 72, timestamp: new Date('2024-10-01T20:00:00') },
      { temperature: 21, humidity: 75, timestamp: new Date('2024-10-01T21:00:00') },
      { temperature: 20, humidity: 78, timestamp: new Date('2024-10-01T22:00:00') },
      { temperature: 19, humidity: 80, timestamp: new Date('2024-10-01T23:00:00') }
    ];
   return of(mockData);
  }
  
  getWheathereData(): Observable<any> {
    const mockData = [
      { temperature: 22, humidity: 70, timestamp: new Date('2024-10-01T00:00:00') },
      { temperature: 21, humidity: 75, timestamp: new Date('2024-10-01T01:00:00') },
      { temperature: 20, humidity: 78, timestamp: new Date('2024-10-01T02:00:00') },
      { temperature: 19, humidity: 80, timestamp: new Date('2024-10-01T03:00:00') },
      { temperature: 18, humidity: 85, timestamp: new Date('2024-10-01T04:00:00') },
      { temperature: 17, humidity: 87, timestamp: new Date('2024-10-01T05:00:00') },
      { temperature: 16, humidity: 90, timestamp: new Date('2024-10-01T06:00:00') },
      { temperature: 17, humidity: 88, timestamp: new Date('2024-10-01T07:00:00') },
      { temperature: 19, humidity: 82, timestamp: new Date('2024-10-01T08:00:00') },
      { temperature: 21, humidity: 75, timestamp: new Date('2024-10-01T09:00:00') },
      { temperature: 24, humidity: 70, timestamp: new Date('2024-10-01T10:00:00') },
      { temperature: 26, humidity: 65, timestamp: new Date('2024-10-01T11:00:00') },
      { temperature: 28, humidity: 60, timestamp: new Date('2024-10-01T12:00:00') },
      { temperature: 30, humidity: 55, timestamp: new Date('2024-10-01T13:00:00') },
      { temperature: 31, humidity: 50, timestamp: new Date('2024-10-01T14:00:00') },
      { temperature: 29, humidity: 52, timestamp: new Date('2024-10-01T15:00:00') },
      { temperature: 27, humidity: 55, timestamp: new Date('2024-10-01T16:00:00') },
      { temperature: 25, humidity: 60, timestamp: new Date('2024-10-01T17:00:00') },
      { temperature: 24, humidity: 65, timestamp: new Date('2024-10-01T18:00:00') },
      { temperature: 23, humidity: 70, timestamp: new Date('2024-10-01T19:00:00') },
      { temperature: 22, humidity: 72, timestamp: new Date('2024-10-01T20:00:00') },
      { temperature: 21, humidity: 75, timestamp: new Date('2024-10-01T21:00:00') },
      { temperature: 20, humidity: 78, timestamp: new Date('2024-10-01T22:00:00') },
      { temperature: 19, humidity: 80, timestamp: new Date('2024-10-01T23:00:00') }
    ];
   return of(mockData);
  }

  private mockTemperatures = [20, 25, 15, 30, 7];

  getLatestTemperature(): Observable<number> {
    // Simulate an API call and return the last temperature
    const latestTemperature = this.mockTemperatures[this.mockTemperatures.length - 1];
    return of(latestTemperature);
  }

    // Simulate a POST request to send threshold data
  sendThresholdData(thresholdData: any): Observable<any> {
      console.log('Sending threshold data:', thresholdData);      
      // Simulate API response
      const response = { status: 'success', message: 'Threshold data saved successfully!' };
      return of(response);
  }
  private mockThresholdData = {
      tempNormalMin: 2,
      tempNormalMax: 8,
      tempCriticalRange1Min: 0,
      tempCriticalRange1Max: 2,
      tempCriticalRange2Min: 8,
      tempCriticalRange2Max: 10,
  };
     
    // Method to get threshold data
  getThresholdData(): Observable<any> {
      return of(this.mockThresholdData);
  }
  



  

}

