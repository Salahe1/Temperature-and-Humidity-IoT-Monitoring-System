import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MockApiService } from '../services/mock-api.service';
import { Subscription, timer } from 'rxjs';
import { WeatherdataApiService } from '../services/weatherdata-api.service';
import { FormatDatePipe } from '../pipes/format-date.pipe';

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
  selectedHours: string = 'all';
  isBrowser: boolean = false;
  private pollingSubscription?: Subscription;

  constructor(
    private mockApiService: MockApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private weatherdataApi:WeatherdataApiService 
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.loadWeatherData();

      // Set up polling every 10 seconds (10000 milliseconds)
      this.pollingSubscription = timer(0, 60000).subscribe(() => {
        this.loadWeatherData();
      });
    }
  }

  loadWeatherData(): void {
    this.weatherdataApi.getWeatherData().subscribe(data => {
      this.chartData = [
        {
          data: data.map((item: WeatherData) => item.temperature),
          label: 'Temperature',
          borderColor: 'red'
        },
        {
          data: data.map((item: WeatherData) => item.humidity),
          label: 'Humidity',
          borderColor: 'blue',
          fill: false,
          pointRadius: 3,
          tension: 0.1
        }
      ];
      this.chartLabels = data.map((item: WeatherData) =>
        //item.timestamp.toISOString().slice(0, 19).replace('T', ' ')
         FormatDatePipe.format(item.timestamp)
      );

      // Chart options
      this.chartOptions = {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Values'
            },
            
          ticks: {
            autoSkip: true, // Skip labels if too many
            maxTicksLimit: 10 // Limit number of ticks
          
        },
            beginAtZero: true
          }
        },
        elements: {
          line: {
            tension: 0.1
          },
          point: {
            radius: 3
          }
        }
      };
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription to prevent memory leaks
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}