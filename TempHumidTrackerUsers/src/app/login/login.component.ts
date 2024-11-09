import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  // username?: string;
  // password?: string;

  // constructor(private router: Router) {}

  // onSubmit() {
  //   // Add your authentication logic here
  //   if (this.username === 'test' && this.password === 'test') {
  //     // Navigate to dashboard or other route on success
  //     this.router.navigate(['/dashboard']);
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // }

  username: string = '';  // Initialize as an empty string
  password: string = '';  // Initialize as an empty string
  

  constructor(private authService: AuthService,private router: Router) {}

  onSubmit() {
    // Ensure username and password are both strings
    if (this.username && this.password) {
      this.authService.login({ username: this.username, password: this.password })
        .subscribe(
          response => {
            // Handle successful login
            console.log('Login successful:', response);
            const token = response.token; // Access token from response object
            if (token) { // make sure the token exists
                localStorage.setItem('token', token); // Store token in localStorage
                this.authService.saveToken(token); // Store the token in AuthService
            }
            this.router.navigate(['/dashboard']);
          },
          error => {
            // Handle login error
            console.error('Login failed:', error);
          }
        );
    } else {
      console.error('Username and password are required.');
    }
  }

}
