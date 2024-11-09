import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MockApiService } from '../services/mock-api.service';
import { ThresholdApiService } from '../services/threshold-api.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})


export class AlertsComponent implements OnInit {


constructor(private mockApiService: ThresholdApiService, private http: HttpClient,private alertService:AlertService,   private cdr: ChangeDetectorRef ) {}

  alerts: any[] = [];
  alertMessage: string | null = null;
  alertClass: string = 'alert-info';
  isTemperatureAbnormal: boolean = false; // Set this based on your logic
  consecutiveAlerts: number = 0;
  showThresholdConfig = false; // Variable to control visibility
  private refreshSubscription?: Subscription;
  tempeture?:number;

  ngOnInit(): void {

    this.updateAlertStatus();

    this.refreshSubscription = this.alertService.refreshAlert$.subscribe(() => {
      this.refreshAlert();
      this.cdr.detectChanges();
    });
  }

  refreshAlert() {
    this.updateAlertStatus();
    console.log('Alert component refreshed!');
  }
  checkTemperatureAlerts(): void {
    // Replace with your API endpoint to get the current temperature and alerts
    this.http.get<{ consecutiveAlarms: number }>('https://localhost:7010/api/thresholds/GetConsecutiveAlarms')
      .subscribe(
        (response) => {
          this.consecutiveAlerts = response.consecutiveAlarms;
          this.isTemperatureAbnormal = this.consecutiveAlerts > 0; // Assume abnormal if alerts exist
          this.cdr.detectChanges(); // Ensure the view is updated

        },
        (error: any) => { // Explicitly type the error
          console.error('Error fetching temperature alerts:', error);
        }
      );
  }

  updateAlertStatus(): void {
    this.mockApiService.getThresholdData().subscribe(thresholds => {
      // Fetch the latest temperature from the mock API
      this.mockApiService.getLatestTemperature().subscribe(currentTemperature => {
        // Access the properties of thresholds after subscribing
        this.tempeture = currentTemperature;
        switch (true) {
          case (currentTemperature > thresholds.tempCriticalRange2Min && currentTemperature < thresholds.tempCriticalRange2Max):
            this.alertMessage = 'Critical temperature range! Caution advised.';
            this.alertClass = 'alert-warning';
             this.isTemperatureAbnormal = true;
            break;
  
          case (currentTemperature > thresholds.tempCriticalRange1Min && currentTemperature < thresholds.tempCriticalRange1Max):
            this.alertMessage = 'Critical temperature range! Caution advised.';
            this.alertClass = 'alert-warning';
            this.isTemperatureAbnormal = true;
            break;
  
          case (currentTemperature >= thresholds.tempNormalMin && currentTemperature <= thresholds.tempNormalMax):
            this.alertMessage = 'Temperature is within the normal range.';
            this.alertClass = 'alert-info';
            break;
  
          default:
            this.alertMessage = 'Severe temperature! Immediate action required.';
            this.alertClass = 'alert-danger';
            this.isTemperatureAbnormal = true;
            break;
        }
      });
    });
  }

 

  toggleThresholdConfig() {
    // Add logic for when you want to show the component
    // For example, set showThresholdConfig to true and then reset after a transition
    this.showThresholdConfig = !this.showThresholdConfig;

    // Delay showing the component to allow for the transition
    if (this.showThresholdConfig) {
      setTimeout(() => {
        this.showThresholdConfig = true;
      }, 50000); // Delay can be adjusted to match your CSS transition duration
    } else {
      this.showThresholdConfig = false; // Hide immediately
    }
  }

}
