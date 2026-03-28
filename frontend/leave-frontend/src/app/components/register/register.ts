import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'student';
  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.name || !this.email || !this.password) {
      this.errorMsg = 'All fields are required';
      return;
    }

    this.authService.register({ 
      name: this.name, 
      email: this.email, 
      password: this.password, 
      role: this.role 
    }).subscribe({
      next: () => {
        alert('Registration Successful! Please Login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMsg = err.error.message || 'Registration Failed';
      }
    });
  }
}