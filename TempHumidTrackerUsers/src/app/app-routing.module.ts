import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertsComponent } from './alerts/alerts.component';
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AlertthresholdsConfigComponent } from './alertthresholds-config/alertthresholds-config.component';
import { canAccess } from './guards/auth.guard';


const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'table', component: TableComponent },
  { path: 'login',component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'user-form', component: UserFormComponent, canActivate: [canAccess] },
  { path: 'alertthresholds-config',component:AlertthresholdsConfigComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
