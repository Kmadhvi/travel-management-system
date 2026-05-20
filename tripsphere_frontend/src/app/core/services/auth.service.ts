import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';

  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        const token = response.token || response.accessToken || response.jwt;
        const userData = response.user || response;

        if (token) {
          localStorage.setItem('token', token);
        }
        localStorage.setItem('y', 'true');
        // Store FULL user object — make sure role is uppercase string
        const user = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role?.toUpperCase().trim(),
          department: userData.department,
          employeeId: userData.employeeId
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'ADMIN';
  }

  isManager(): boolean {
    return this.getCurrentUser()?.role === 'MANAGER';
  }

  isFinance(): boolean {
    return this.getCurrentUser()?.role === 'FINANCE';
  }

  isEmployee(): boolean {
    return this.getCurrentUser()?.role === 'EMPLOYEE';
  }
}
