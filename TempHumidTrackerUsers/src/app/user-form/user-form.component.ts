import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Importing 'of' to handle errors gracefully

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  apiUrl = 'https://localhost:7010/api/Users';
  isAddFormVisible: boolean = true;
  users: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      whatsAppNumber: [''],
      telegramId: ['']
    });
  }

  get fullNameControl() {
    return this.userForm.get('fullName');
  }

  get emailcontrol(){
    return this.userForm.get('email');
  }

  get passwordcontrol(){
    return this.userForm.get('password');
  }

  get usernamecontrol(){
    return this.userForm.get('username');
  }


  isFieldInvalid(control: any): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  
  toggleView() {
    this.isAddFormVisible = !this.isAddFormVisible;
    if (!this.isAddFormVisible) {
      this.loadUsers();
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.http.post(this.apiUrl, formData)
        .pipe(
          catchError((error) => {
            console.error('Error adding user:', error);
            return of(null); // Handle the error gracefully
          })
        )
        .subscribe({
          next: () => {
            console.log('User added successfully!');
            this.userForm.reset();
            this.loadUsers();
          },
          error: () => {
            console.error('Error occurred during user addition.');
          }
        });
    } else {
      this.userForm.markAllAsTouched(); // This will trigger validation messages
      console.warn('Form is invalid:', this.userForm.errors);
    }
}


  loadUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error: any) => {
        console.error('Error loading users:', error);
      }
    });
  }
}
