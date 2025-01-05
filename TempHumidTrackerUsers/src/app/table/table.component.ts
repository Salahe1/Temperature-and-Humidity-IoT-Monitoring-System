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


  
  downloadWeatherData(): void {
    const csvContent = this.convertToCSV(this.weatherData);
  
    // Create a Blob object
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    // Create a link element to download the file
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'weather_data.csv');
    link.style.visibility = 'hidden';
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  convertToCSV(data: WeatherData[]): string {
    // Define the CSV headers
    const headers = 'Timestamp,Temperature (°C),Humidity (%)\n';
  
    // Map data to CSV rows
    const rows = data.map(item =>
      `${new Date(item.timestamp).toLocaleString()},${item.temperature},${item.humidity}`
    );
  
    // Combine headers and rows
    return headers + rows.join('\n');
  }
  
  

}
