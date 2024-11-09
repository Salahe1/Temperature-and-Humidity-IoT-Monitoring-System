import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MockApiService } from '../services/mock-api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Importing 'of' to handle errors gracefully
import { AlertService } from '../services/alert.service'; 
import { ThresholdApiService } from '../services/threshold-api.service';

@Component({
  selector: 'app-alertthresholds-config',
  templateUrl: './alertthresholds-config.component.html',
  styleUrls: ['./alertthresholds-config.component.css']
})



export class AlertthresholdsConfigComponent {

  thresholdsForm: FormGroup;
  //private apiUrl = 'your-api-endpoint'; // Your API endpoint
  alertMessage: string | null = null;
  alertClass: string = 'alert-primary'; // default alert style



  constructor(private fb: FormBuilder, private http: HttpClient ,private mockApiService: MockApiService,private alertService:AlertService,private thresholdApi:ThresholdApiService) {

    this.thresholdsForm = this.fb.group({
      tempNormalMin: [null, [Validators.required, Validators.min(0)]],
      tempNormalMax: [null, [Validators.required, Validators.min(0)]],
      tempCriticalRange1Min: [null, [Validators.required, Validators.min(0)]],
      tempCriticalRange1Max: [null, [Validators.required, Validators.min(0)]],
      tempCriticalRange2Min: [null, [Validators.required, Validators.min(0)]],
      tempCriticalRange2Max: [null, [Validators.required, Validators.min(0)]],
    });

  }


  ngOnInit(): void {
    //this.updateAlertStatus();
    this.loadThresholds();
  }

  loadThresholds(): void {
    this.thresholdApi.getThresholdData().subscribe({
      next: (data) => {
        // Assuming the API returns an object with the threshold values
        this.thresholdsForm.patchValue({
          tempNormalMin: data.tempNormalMin,
          tempNormalMax: data.tempNormalMax,
          tempCriticalRange1Min: data.tempCriticalRange1Min,
          tempCriticalRange1Max: data.tempCriticalRange1Max,
          tempCriticalRange2Min: data.tempCriticalRange2Min,
          tempCriticalRange2Max: data.tempCriticalRange2Max,
        });
      },
      error: (error) => {
        console.error('Failed to load thresholds data:', error);
      },
      complete: () => {
        console.log('Threshold data loading completed');
      }
    });
  }
  

  // updateAlertStatus(): void {
  //   const values = this.thresholdsForm.value;
  //   const currentTemperature = 20; // Placeholder, replace with actual data
  
  //   switch (true) {
  //     case (currentTemperature < values.tempCriticalRange2Min || currentTemperature > values.tempCriticalRange2Max):
  //       this.alertMessage = 'Severe temperature! Immediate action required.';
  //       this.alertClass = 'alert-danger';
  //       break;
  
  //     case (currentTemperature < values.tempCriticalRange1Min || currentTemperature > values.tempCriticalRange1Max):
  //       this.alertMessage = 'Critical temperature range! Caution advised.';
  //       this.alertClass = 'alert-warning';
  //       break;
  
  //     case (currentTemperature < values.tempNormalMin || currentTemperature > values.tempNormalMax):
  //       this.alertMessage = 'Temperature outside normal range.';
  //       this.alertClass = 'alert-info';
  //       break;
  
  //     default:
  //       this.alertMessage = 'Temperature is within the normal range.';
  //       this.alertClass = 'alert-success';
  //       break;
  //   }
  // }

  onSubmit() {
    if (this.thresholdsForm.valid) {
      const formData = this.thresholdsForm.value;
      this.http.post('https://localhost:7010/api/Thresholds', formData)
        .pipe(
          catchError((error) => {
            console.error('Error adding Thresholds:', error);
            alert('Failed to update thresholds. Please try again.');

            return of(null); // Handle the error gracefully
          })
        )
        .subscribe({
          next: () => {
            console.log('Thresholds added successfully!');

            this.thresholdsForm.reset();
            alert('Thresholds updated successfully!');

            this.loadThresholds();

            this.alertService.triggerAlertRefresh();

          },
          error: () => {
            console.error('Error occurred during user addition.');
          }
        });
    } else {
      this.thresholdsForm.markAllAsTouched(); // This will trigger validation messages
      console.warn('Form is invalid:', this.thresholdsForm.errors);
    }
}
  // saveThresholds() {
  //   const thresholds = {
  //     tempNormalMin: 18,
  //     tempNormalMax: 24,
  //     tempCriticalRange1Min: 10,
  //     tempCriticalRange1Max: 30,
  //     // add other fields as needed
  //   };

  // this.mockApiService.sendThresholdData(thresholds).subscribe(response => {
  //   console.log('Response from mock API:', response);
  // });
   //}
}