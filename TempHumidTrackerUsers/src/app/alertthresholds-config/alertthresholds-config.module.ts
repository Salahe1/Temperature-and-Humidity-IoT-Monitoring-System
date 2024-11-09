import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertthresholdsConfigComponent } from './alertthresholds-config.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AlertthresholdsConfigComponent
  ],
  imports: [
    CommonModule ,
    ReactiveFormsModule  
  ],
  exports:[
    AlertthresholdsConfigComponent
  ]

})
export class AlertthresholdsConfigModule { }
