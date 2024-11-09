import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts.component';
import { AlertthresholdsConfigModule } from '../alertthresholds-config/alertthresholds-config.module';

@NgModule({
  declarations: [
    AlertsComponent
   
  ],
  imports: [
    CommonModule,
    AlertthresholdsConfigModule // Use the module instead of the component
  ]
})
export class AlertsModule { }
