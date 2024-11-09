import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showHeader: boolean = true;

  isAuthenticated: boolean = false;

  constructor(private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to router events to check header visibility
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateHeaderVisibility();
      });

       // Subscribe to authentication state
       this.isAuthenticated = this.authService.isAuthenticated();
       this.authService.token$.subscribe(token => {
         this.isAuthenticated = !!token;
       });
 


    // Initial check on load
    this.updateHeaderVisibility();
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private updateHeaderVisibility(): void {
    // Determine if the header should be shown
    this.showHeader = this.router.url !== '/login' && this.router.url !== '';
  }
}
