import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = 'https://leave-backend-bp79.onrender.com/api/users';
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  // Register User
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login User
  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem(this.tokenKey, res.token);
          localStorage.setItem('userRole', res.role);
          localStorage.setItem('userName', res.name); // Name save karo
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }
  
  getUserName(): string {
    return localStorage.getItem('userName') || 'User';
  }
}