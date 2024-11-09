import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { FilterWeatherDataPipe } from '../pipes/filter-weather-data.pipe'; // Adjust the import path
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    FilterWeatherDataPipe
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule 
  ]
})
export class DashboardModule {

}
