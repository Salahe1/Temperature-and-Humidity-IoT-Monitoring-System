import { Component, OnInit } from '@angular/core';
import { MockApiService } from '../services/mock-api.service';
import { WeatherdataApiService } from '../services/weatherdata-api.service';


interface WeatherData {
  temperature: number;
  humidity: number;
  timestamp: Date;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  weatherData: WeatherData[] = [];

  constructor(private mockApiService: MockApiService,private weatherdataApi:WeatherdataApiService){}
  showTable = true; // Property to toggle between table and JSON view

  toggleView() {
    this.showTable = !this.showTable; // Toggle between true and false
  }
  
  ngOnInit(): void {
    this.fetchWeatherData();
  }


  fetchWeatherData(): void {
    this.weatherdataApi.getWeatherData().subscribe(data => {
      this.weatherData = data;
    })
  }
  

}
