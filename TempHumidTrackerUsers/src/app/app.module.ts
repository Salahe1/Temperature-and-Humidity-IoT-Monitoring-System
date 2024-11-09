import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AlertsModule } from './alerts/alerts.module';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertthresholdsConfigModule } from './alertthresholds-config/alertthresholds-config.module';
import { FormatDatePipe } from './pipes/format-date.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    LoginComponent,
    UserFormComponent,
    FormatDatePipe   
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DashboardModule,
    AlertsModule,
    AlertthresholdsConfigModule,
    ServicesModule,
    ReactiveFormsModule
  ],

  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()), 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
