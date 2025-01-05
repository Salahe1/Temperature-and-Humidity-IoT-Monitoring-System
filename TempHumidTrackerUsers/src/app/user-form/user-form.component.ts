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
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      role: ["",Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      whatsAppNumber: [''],
      telegramId: ['']
    });
  }

  get fullNameControl() {
    return this.userForm.get('fullName');
  }

  get rolecontrol() {
    return this.userForm.get('role');
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

  editUser(user: any, index: number): void {
    this.userForm.patchValue(user); // Populate the form with user data
    this.isAddFormVisible = true; // Switch back to the form view
    this.editingIndex = index; // Track the index of the user being edited
  }

  deleteUser(userId: number, index: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:7010/api/users/${userId}`).subscribe({
        next: () => {
          this.users.splice(index, 1); // Remove the user from the local list
          alert('User deleted successfully.');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete the user.');
        }
      });
    }
  }
  
  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
  
      // If editing an existing user
      if (this.editingIndex !== null) { // Ensure editingIndex is not null
        const userId = this.users[this.editingIndex].id;
  
        this.http.put(`https://localhost:7010/api/Users/${userId}`, userData).subscribe({  
          next: () => {
            // Update the user in the local list
            this.users[this.editingIndex!] = { ...userData, id: userId };
            alert('User updated successfully.');
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating user:', error);
            alert('Failed to update the user. Please try again.');
          }
        });
      } else {
        // Add a new user
        this.http.post('https://localhost:7010/api/users', userData).subscribe({
          next: (newUser) => {
            this.users.push(newUser); // Add the new user to the list
            alert('User added successfully.');
            this.resetForm();
          },
          error: (error) => {
            console.error('Error adding user:', error);
            alert('Failed to add the user.');
          }
        });
      }
    }
  }
  
  
  resetForm(): void {
    this.userForm.reset(); // Clear the form
    this.isAddFormVisible = false; // Switch to the list view
    this.editingIndex = null; // Reset the editing index
  }
  

  
}
