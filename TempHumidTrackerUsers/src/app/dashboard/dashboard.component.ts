import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { WeatherdataApiService } from '../services/weatherdata-api.service';

export interface WeatherData {
  temperature: number;
  humidity: number;
  timestamp: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  chartData: any[] = [];
  chartLabels: string[] = [];
  chartOptions: any;
  allWeatherData: WeatherData[] = []; // Stores all data received
  currentFilter: string = 'day'; // Default filter
  selectedMonth: Date = new Date(); // Default to the current month
  isBrowser: boolean = false;

  private pollingSubscription?: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private weatherdataApi: WeatherdataApiService
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.loadAllWeatherData();

      // Polling every 20 minutes
      this.pollingSubscription = timer(0, 1200000).subscribe(() => {
        this.loadAllWeatherData();
      });
    }
  }

  // Load all weather data from API
  loadAllWeatherData(): void {
    this.weatherdataApi.getWeatherData().subscribe(data => {
      this.allWeatherData = data; // Store all data
      this.filterWeatherData();  // Apply the current filter
    });
  }

 filterWeatherData(): void {
  const now = new Date();

  const filteredData = this.allWeatherData.filter(item => {
    const itemDate = new Date(item.timestamp);

    switch (this.currentFilter) {
      case 'day':
        // Filter for today
        return itemDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
      case 'week':
        // Filter for the last 7 days
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return itemDate >= weekAgo;
      case 'month':
        // Filter for the selected month
        return (
          itemDate.getFullYear() === this.selectedMonth.getFullYear() &&
          itemDate.getMonth() === this.selectedMonth.getMonth()
        );
      default:
        return true; // No filter (show all data)
    }
  });

  this.updateChart(filteredData);
}

updateChart(data: WeatherData[]): void {
  const now = new Date();

  // Initialize chartLabels and data arrays
  this.chartLabels = [];
  let filteredTemperatures: number[] = [];
  let filteredHumidities: number[] = [];

  switch (this.currentFilter) {
    case 'day':
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      for (let i = 0; i < 24; i++) {
        const hour = new Date(dayStart.getTime() + i * 60 * 60 * 1000);
        const label = hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.chartLabels.push(label);

        const matchingData = data.find(item => {
          const itemDate = new Date(item.timestamp);
          return (
            itemDate.getFullYear() === hour.getFullYear() &&
            itemDate.getMonth() === hour.getMonth() &&
            itemDate.getDate() === hour.getDate() &&
            itemDate.getHours() === hour.getHours()
          );
        });

        filteredTemperatures.push(matchingData ? matchingData.temperature : NaN);
        filteredHumidities.push(matchingData ? matchingData.humidity : NaN);
      }
      break;

      case 'week':
      const weekData: { [key: string]: WeatherData[] } = {};

      // Group data by each day of the week
      for (let i = 6; i >= 0; i--) {
        const weekDay = new Date();
        weekDay.setDate(now.getDate() - i); // Calculate each day in the week
        const label = weekDay.toLocaleDateString([], { weekday: 'long' }); // e.g., Monday
        this.chartLabels.push(label);

        // Group data points for this day
        weekData[label] = data.filter(item => {
          const itemDate = new Date(item.timestamp);
          return (
            itemDate.getFullYear() === weekDay.getFullYear() &&
            itemDate.getMonth() === weekDay.getMonth() &&
            itemDate.getDate() === weekDay.getDate()
          );
        });

        // Calculate the average temperature and humidity for the day
        const dailyTemps = weekData[label].map(item => item.temperature);
        const dailyHums = weekData[label].map(item => item.humidity);

        const avgTemp = dailyTemps.length > 0 ? dailyTemps.reduce((a, b) => a + b, 0) / dailyTemps.length : NaN;
        const avgHum = dailyHums.length > 0 ? dailyHums.reduce((a, b) => a + b, 0) / dailyHums.length : NaN;

        filteredTemperatures.push(avgTemp);
        filteredHumidities.push(avgHum);
      }
      break;

    case 'month':
      const monthData: { [key: string]: WeatherData[] } = {};

      // Group data by each day in the last 30 days
      for (let i = 29; i >= 0; i--) {
        const monthDay = new Date();
        monthDay.setDate(now.getDate() - i); // Safely calculate each day in the last 30 days
        const label = monthDay.toLocaleDateString([], { day: '2-digit', month: 'short' }); // e.g., 01 Jan
        this.chartLabels.push(label);

        // Group data points for this day
        monthData[label] = data.filter(item => {
          const itemDate = new Date(item.timestamp);
          return (
            itemDate.getFullYear() === monthDay.getFullYear() &&
            itemDate.getMonth() === monthDay.getMonth() &&
            itemDate.getDate() === monthDay.getDate()
          );
        });

        // Calculate the average temperature and humidity for the day
        const dailyTemps = monthData[label].map(item => item.temperature);
        const dailyHums = monthData[label].map(item => item.humidity);

        const avgTemp = dailyTemps.length > 0 ? dailyTemps.reduce((a, b) => a + b, 0) / dailyTemps.length : NaN;
        const avgHum = dailyHums.length > 0 ? dailyHums.reduce((a, b) => a + b, 0) / dailyHums.length : NaN;

        filteredTemperatures.push(avgTemp);
        filteredHumidities.push(avgHum);
      }
      break;

    default:
      this.chartLabels = data.map(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate.toLocaleDateString();
      });
      filteredTemperatures = data.map(item => item.temperature);
      filteredHumidities = data.map(item => item.humidity);
      break;
  }

  this.chartData = [
    {
      data: filteredTemperatures,
      label: 'Temperature',
      borderColor: 'red',
      fill: false
    },
    {
      data: filteredHumidities,
      label: 'Humidity',
      borderColor: 'blue',
      fill: false
    }
  ];
}


setFilter(filter: string): void {
  this.currentFilter = filter;
  this.filterWeatherData(); // Apply the filter for all cases
}

setMonthFilter(date: Date): void {
  if (date) {
    this.selectedMonth = date;
    this.filterWeatherData();
  }
}

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
