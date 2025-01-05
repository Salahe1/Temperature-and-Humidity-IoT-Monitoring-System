import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { FilterWeatherDataPipe } from '../pipes/filter-weather-data.pipe'; // Adjust the import path
import { FormsModule } from '@angular/forms';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    DashboardComponent,
    FilterWeatherDataPipe
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],

  providers: [MatDatepickerModule, MatNativeDateModule]
})
export class DashboardModule {

}
